import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

connect();

/**
 * POST /api/auth/google-sync
 *
 * Called by the client immediately after a successful Google sign-in.
 * We look up the user by email and set the 'token' httpOnly cookie
 * that the rest of the app relies on (used by /api/auth/me etc.)
 */
export async function POST(request) {
    try {
        // Must pass authOptions so getServerSession can read the session
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Google sync successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                credits: user.credits,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 86400, // 1 day in seconds
            sameSite: "lax",
        });

        return response;
    } catch (error) {
        console.error("[google-sync error]:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
