import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (fileBuffer, folder = 'storybook-uploads') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({
                        url: result.secure_url,
                        public_id: result.public_id,
                    });
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};

export const uploadFromUrl = async (url, folder = 'storybook-generated', format = null) => {
    try {
        const options = {
            folder: folder,
            resource_type: "auto"
        };

        if (format) {
            options.format = format;
        }

        const result = await cloudinary.uploader.upload(url, options);
        return {
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        throw new Error(`Cloudinary upload failed: ${error.message}`);
    }
};

export default cloudinary;
