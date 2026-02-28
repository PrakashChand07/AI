import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

connect();

const googleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID);

export async function POST(request) {
    try {
        const { credential } = await request.json();

        if (!credential) {
            return NextResponse.json({ error: "Google credential is required" }, { status: 400 });
        }

        let ticket;
        try {
            ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
            });
        } catch (error) {
            console.error('Google token verification failed:', error);
            return NextResponse.json({ error: "Invalid Google token" }, { status: 401 });
        }

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        if (!email) {
            return NextResponse.json({ error: "Email not provided by Google" }, { status: 400 });
        }

        let user = await User.findOne({
            $or: [{ email }, { googleId }]
        });

        if (user) {
            // Update googleId if missing
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            // Register new user via Google
            user = await User.create({
                username: name || email.split('@')[0],
                email,
                googleId,
                isVerified: true, // Google accounts are verified
            });
        }

        // Generate custom JWT
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET || process.env.JWT_ACCESS_SECRET, {
            expiresIn: "7d",
        });

        const response = NextResponse.json({
            message: "Google login successful",
            success: true,
            accessToken: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                credits: user.credits,
            }
        });

        // Set cookie as fallback
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            sameSite: "lax",
        });

        return response;

    } catch (error) {
        console.error("[google auth error]:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
