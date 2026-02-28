
import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect()

export async function GET(request) {
    try {
        const userId = getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
        }

        const user = await User.findOne({ _id: userId }).select("-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({
            message: "User found",
            data: user,
            user, // Include user root key mapping for React Query context
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
