import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

connect();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Image = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;

        // Upload to Cloudinary (publicly accessible URL)
        const uploadResult = await cloudinary.uploader.upload(base64Image, {
            folder: "storybook-child-photos",
            public_id: `storybook-${Date.now()}`,
        });

        return NextResponse.json({
            message: "File uploaded successfully",
            url: uploadResult.secure_url
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
