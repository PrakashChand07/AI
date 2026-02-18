import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Payment from "@/models/paymentModel";
import { NextResponse } from "next/server";
import crypto from "crypto";

connect();

export async function POST(request) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const reqBody = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            credits,
            amount,
            planName
        } = reqBody;

        console.log("Verifying payment:", { razorpay_order_id, razorpay_payment_id, credits });

        // Verify Razorpay signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature !== expectedSign) {
            console.error("Signature verification failed");
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        console.log("Signature verified successfully");

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Save payment transaction
        const payment = new Payment({
            userId: userId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            amount: amount || 0,
            credits: credits,
            planName: planName || "Unknown",
            status: "success",
        });

        await payment.save();
        console.log("Payment record saved:", payment._id);

        // Update user credits
        user.credits += credits;
        await user.save();

        console.log("User credits updated. New balance:", user.credits);

        return NextResponse.json({
            success: true,
            message: "Payment verified and credits added successfully",
            credits: user.credits,
            paymentId: payment._id
        });

    } catch (error) {
        console.error("Verify Payment Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
