import mongoose from "mongoose";

const storybookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: {
        type: String,
        default: "My Storybook",
    },
    storyline: {
        type: String,
        required: [true, "Please provide a storyline"],
    },
    characterName: {
        type: String,
        required: [true, "Please provide a character name"],
    },
    age: {
        type: String,
        required: [true, "Please provide age"],
    },
    gender: {
        type: String,
        required: [true, "Please provide gender"],
    },
    pages: {
        type: Number,
        required: true,
        default: 4,
    },
    pdfUrl: {
        type: String, // Cloudinary URL
    },
    coverImageUrl: {
        type: String,
    },
    creditsUsed: {
        type: Number,
        default: 2,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "pending",
    },
    ziftoApiStatus: {
        type: Object, // Store raw response or status from Zifto if needed for debugging
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Storybook = mongoose.models.storybooks || mongoose.model("storybooks", storybookSchema);

export default Storybook;
