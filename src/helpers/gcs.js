import { Storage } from "@google-cloud/storage";
import path from "path";

// Initialize storage
// For local dev, it looks for GOOGLE_APPLICATION_CREDENTIALS env var
// For production (like Vercel/GCP), environment variables are best.

// We will use a service account key passed via environment variables (cleaner for Next.js)
// You need to set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in .env

const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle newlines correctly
    },
});

const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME;

export const uploadToGCSFromUrl = async (url, destinationFolder = "storybooks") => {
    try {
        const bucket = storage.bucket(bucketName);

        // Fetch the file from the URL first
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch file from URL: ${response.statusText}`);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Generate a unique filename
        const filename = `${destinationFolder}/${Date.now()}-${path.basename(new URL(url).pathname).split('/').pop() || 'file'}`;

        // If the URL ends with a generic name or query params, ensure extension (simplified logic)
        // We'll trust the source URL or add .pdf if missing for storybooks

        const file = bucket.file(filename);

        await file.save(buffer, {
            contentType: response.headers.get("content-type") || "application/octet-stream",
            metadata: {
                cacheControl: "public, max-age=31536000",
            },
        });

        // Make the file public (or use signed URLs if you prefer private)
        // For this use case, let's assume public read access or simple signed URLs.
        // Public access is easiest for direct downloads.
        // await file.makePublic(); 

        // Alternatively return the public URL directly
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

        return {
            url: publicUrl,
            filename: filename
        };

    } catch (error) {
        console.error("Google Cloud Storage Upload Error:", error);
        throw new Error(`GCS Upload Failed: ${error.message}`);
    }
};

export const uploadToGCSFromBuffer = async (buffer, filename, contentType) => {
    try {
        const bucket = storage.bucket(bucketName);
        const file = bucket.file(filename);

        await file.save(buffer, {
            contentType: contentType,
            metadata: {
                cacheControl: "public, max-age=31536000",
            },
        });

        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        return {
            url: publicUrl,
            filename: filename
        };
    } catch (error) {
        console.error("Google Cloud Storage Buffer Upload Error:", error);
        throw new Error(`GCS Buffer Upload Failed: ${error.message}`);
    }
};
