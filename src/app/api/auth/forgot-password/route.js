
import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { email } = reqBody

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }

        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Email sent successfully",
            success: true,
        })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
