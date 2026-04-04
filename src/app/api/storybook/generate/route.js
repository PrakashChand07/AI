import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Storybook from "@/models/storybookModel";
import { NextResponse } from "next/server";

connect();

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
            uploaded_image_urls
        } = reqBody;

        const numPages = Number(pages);
        if (!numPages || numPages < 1) {
            return NextResponse.json({ error: "Invalid number of pages" }, { status: 400 });
        }

        const creditCost = numPages; // 1 credit per page

        // 1. Check User Credits
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (user.credits < creditCost) {
            return NextResponse.json({
                error: "Insufficient credits",
                required: creditCost,
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
            pages: numPages,
            status: "processing",
        });
        await newStorybook.save();

        // 3. Call Zifto API
        // NOTE: This call can take 1-3 minutes. Vercel/Next.js might timeout on serverless functions (limit 10s-60s).
        // If deployment platform has short timeouts, we might need a background job.
        // For now, assuming standard environment or long-running capability.

        try {
            if (!process.env.ZIFTO_API_URL) {
                throw new Error("ZIFTO_API_URL is not defined in environment variables");
            }

            const ziftoResponse = await fetch(process.env.ZIFTO_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uploaded_image_urls,
                    storyline,
                    character_name,
                    age,
                    gender,
                    pages: numPages,
                    branding: {
                        watermark: "CREATED BY ZIFTO"
                    }
                }),
            });

            if (!ziftoResponse.ok) {
                const errorData = await ziftoResponse.text();
                throw new Error(`Zifto API Error: ${ziftoResponse.status} - ${errorData}`);
            }

            const ziftoData = await ziftoResponse.json();

            if (!ziftoData.success || !ziftoData.pdf_url) {
                throw new Error("Zifto API returned failed status or missing PDF URL");
            }

            // 4. Save Zifto URLs directly (no GCS needed)
            newStorybook.pdfUrl = ziftoData.pdf_url;
            newStorybook.coverImageUrl = ziftoData.cover_image_url || "";
            newStorybook.title = ziftoData.story?.title || "My Adventure";
            newStorybook.status = "completed";
            newStorybook.creditsUsed = creditCost;
            await newStorybook.save();

            // 5. Deduct Credits (atomic operation - guaranteed to work)
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $inc: { credits: -creditCost } },
                { new: true }
            );

            return NextResponse.json({
                message: "Storybook created successfully",
                data: newStorybook,
                remainingCredits: updatedUser.credits
            });

        } catch (apiError) {
            console.error("Storybook Generation Error:", apiError);

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
