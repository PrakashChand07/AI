import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import { uploadToGCSFromBuffer } from "@/helpers/gcs";

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
        const filename = `storybook-child-photos/${Date.now()}-${file.name || "upload"}`;
        const contentType = file.type || "application/octet-stream";

        // Upload to Google Cloud Storage
        const result = await uploadToGCSFromBuffer(buffer, filename, contentType);

        return NextResponse.json({
            message: "File uploaded successfully",
            url: result.url
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
