
import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        console.log("Register attempt:", { username, email });

        // check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            if (user.isVerified) {
                return NextResponse.json({ error: "User already exists" }, { status: 400 })
            }

            // User exists but not verified — update and resend OTP
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
            user.username = username;
            user.password = hashedPassword;
            user.isVerified = true;
            const savedUser = await user.save();

            // Fire-and-forget — email failure won't crash register
            sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
                .catch(err => console.error("[Email non-fatal]:", err.message));

            return NextResponse.json({
                message: "Account ready! You can now log in.",
                success: true,
            })
        }

        // New user — hash password and save
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isVerified: true,
        })

        const savedUser = await newUser.save()
        console.log("New user created:", savedUser._id);

        // Fire-and-forget — email failure won't crash register
        sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })
            .catch(err => console.error("[Email non-fatal]:", err.message));

        return NextResponse.json({
            message: "Account created! You can now log in.",
            success: true,
        })

    } catch (error) {
        console.error("Register Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
