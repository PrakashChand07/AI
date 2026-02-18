import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    signature: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "INR",
    },
    credits: {
        type: Number,
        required: true,
    },
    planName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "success",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.models.payments || mongoose.model("payments", paymentSchema);

export default Payment;
