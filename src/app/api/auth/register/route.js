
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

        console.log(reqBody);


        //check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            // Check if user is already verified
            if (user.isVerified) {
                return NextResponse.json({ error: "User already exists" }, { status: 400 })
            } else {
                // User exists but is not verified. Update password and resend verification email.
                const salt = await bcryptjs.genSalt(10)
                const hashedPassword = await bcryptjs.hash(password, salt)

                user.username = username;
                user.password = hashedPassword;
                const savedUser = await user.save();

                await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

                return NextResponse.json({
                    message: "User updated and verification email sent",
                    success: true,
                    savedUser
                })
            }
        }




        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error) {
        console.error("Register Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
