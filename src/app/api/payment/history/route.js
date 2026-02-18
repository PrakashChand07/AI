
import { connect } from "@/helpers/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Payment from "@/models/paymentModel";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const payments = await Payment.find({ userId: userId })
            .sort({ createdAt: -1 })
            .limit(20);

        return NextResponse.json({
            success: true,
            payments
        });

    } catch (error) {
        console.error("Get Payment History Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
