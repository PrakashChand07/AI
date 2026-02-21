import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Storybook from "@/models/storybookModel";
import { NextResponse } from "next/server";
import { uploadToGCSFromUrl } from "@/helpers/gcs";

connect();

const STORYBOOK_CREDIT_COST = 2;

export async function POST(request) {
    try {
        const userId = getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const reqBody = await request.json();
        const {
            storyline,
            character_name,
            age,
            gender,
            pages,
            uploaded_image_url
        } = reqBody;

        // 1. Check User Credits
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.credits < STORYBOOK_CREDIT_COST) {
            return NextResponse.json({
                error: "Insufficient credits",
                required: STORYBOOK_CREDIT_COST,
                current: user.credits
            }, { status: 402 }); // 402 Payment Required
        }

        // 2. Create Initial Record (Processing)
        const newStorybook = new Storybook({
            userId,
            storyline,
            characterName: character_name,
            age,
            gender,
            pages,
            status: "processing",
        });
        await newStorybook.save();

        // 3. Call Zifto API
        // NOTE: This call can take 1-3 minutes. Vercel/Next.js might timeout on serverless functions (limit 10s-60s).
        // If deployment platform has short timeouts, we might need a background job.
        // For now, assuming standard environment or long-running capability.

        let ziftoData = null;

        try {
            const ziftoResponse = await fetch("https://createstorybook-slonnosm2a-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uploaded_image_url,
                    storyline,
                    character_name,
                    age,
                    gender,
                    pages: Number(pages),
                    branding: {
                        watermark: "CREATED BY ZIFTO" // or Custom branding
                    }
                }),
            });

            if (!ziftoResponse.ok) {
                const errorData = await ziftoResponse.text();
                throw new Error(`Zifto API Error: ${ziftoResponse.status} - ${errorData}`);
            }

            ziftoData = await ziftoResponse.json();

            if (!ziftoData.success || !ziftoData.pdf_url) {
                throw new Error("Zifto API returned failed status or missing PDF URL");
            }

            // 4. Upload Result to GCS (PDF & Cover)
            console.log("Original Zifto PDF URL:", ziftoData.pdf_url);

            // Ideally should be async or background, but doing inline for simplicity as per plan

            // Upload PDF
            const pdfUpload = await uploadToGCSFromUrl(ziftoData.pdf_url, "storybook-pdfs");

            // Upload Cover (if available)
            let coverUpload = { url: "" };
            if (ziftoData.cover_image_url) {
                // Ensure cover is a PNG for better compatibility
                coverUpload = await uploadToGCSFromUrl(ziftoData.cover_image_url, "storybook-covers");
            }

            // 5. Update Record & Deduct Credits
            newStorybook.pdfUrl = pdfUpload.url;
            newStorybook.coverImageUrl = coverUpload.url;
            newStorybook.title = ziftoData.story?.title || "My Adventure";
            newStorybook.status = "completed";
            newStorybook.creditsUsed = STORYBOOK_CREDIT_COST;
            await newStorybook.save();

            user.credits -= STORYBOOK_CREDIT_COST;
            await user.save();

            return NextResponse.json({
                message: "Storybook created successfully",
                data: newStorybook,
                remainingCredits: user.credits
            });

        } catch (apiError) {
            console.error("Storybook Generation Error:", apiError);

            // FALLBACK: If GCS fails but we have Zifto URL, save that instead
            if (ziftoData?.pdf_url) {
                console.log("GCS upload failed, using fallback Zifto URL");

                newStorybook.pdfUrl = ziftoData.pdf_url;
                newStorybook.coverImageUrl = ziftoData.cover_image_url || ""; // Use Zifto cover if available
                newStorybook.title = ziftoData.story?.title || "My Adventure";
                newStorybook.status = "completed";
                newStorybook.creditsUsed = STORYBOOK_CREDIT_COST;
                // Save specific warning
                newStorybook.ziftoApiStatus = { warning: "GCS upload failed, using direct link. " + apiError.message };

                await newStorybook.save();

                user.credits -= STORYBOOK_CREDIT_COST;
                await user.save();

                return NextResponse.json({
                    message: "Storybook created successfully (Storage Limit Reached - Using Direct Link)",
                    data: newStorybook,
                    remainingCredits: user.credits,
                    warning: "Storage limit reached. PDF link may expire sooner."
                });
            }

            newStorybook.status = "failed";
            newStorybook.ziftoApiStatus = { error: apiError.message };
            await newStorybook.save();

            return NextResponse.json({
                error: "Failed to generate storybook.",
                details: apiError.message
            }, { status: 500 });
        }

    } catch (error) {
        console.error("Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
