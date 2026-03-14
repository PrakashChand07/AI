const nextConfig = {
    // Allows dev environment to accept traffic from local IP address
    experimental: {
        allowedDevOrigins: ["192.168.0.160", "localhost", "127.0.0.1", "192.168.0.160:3000"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            }
        ],
    },
};

export default nextConfig;
