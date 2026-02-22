import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Storybook from "@/models/storybookModel";
import { NextResponse } from "next/server";

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
            newStorybook.creditsUsed = STORYBOOK_CREDIT_COST;
            await newStorybook.save();

            // 5. Deduct Credits
            user.credits -= STORYBOOK_CREDIT_COST;
            await user.save();

            return NextResponse.json({
                message: "Storybook created successfully",
                data: newStorybook,
                remainingCredits: user.credits
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
