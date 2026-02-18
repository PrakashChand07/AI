import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { uploadFile } from "@/helpers/cloudinary";

connect();

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

        // Upload to Cloudinary
        const result = await uploadFile(buffer, "storybook-child-photos");

        return NextResponse.json({
            message: "File uploaded successfully",
            url: result.url
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
