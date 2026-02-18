
import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

connect();

export async function POST(request) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Please login first" }, { status: 401 })
        }

        const reqBody = await request.json();
        const { amount, planName } = reqBody;

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId: userId,
                planName: planName,
            },
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            success: true,
            order
        })

    } catch (error) {
        console.error("Create Order Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
