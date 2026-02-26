import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/helpers/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

/**
 * NextAuth route handler for Google OAuth.
 *
 * Flow:
 * 1. User clicks "Continue with Google"
 * 2. NextAuth redirects to Google → Google redirects back here
 * 3. signIn() callback upserts user in MongoDB
 * 4. jwt() callback stores MongoDB _id + minted app token on the NextAuth token
 * 5. GoogleAuthSync component (client-side) calls /api/auth/google-sync
 *    → mints our own httpOnly 'token' cookie so /api/auth/me keeps working
 */
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login",
        error: "/login",
    },

    callbacks: {
        async signIn({ user, account }) {
            // Only handle Google provider
            if (account.provider !== "google") return true;

            try {
                await connect();

                let dbUser = await User.findOne({ email: user.email });

                if (!dbUser) {
                    // First time Google login → create new user
                    dbUser = await User.create({
                        username: user.name,
                        email: user.email,
                        googleId: account.providerAccountId,
                        isVerified: true,
                        credits: 2,
                    });
                    console.log("[NextAuth] New Google user created:", dbUser._id);
                } else if (!dbUser.googleId) {
                    // Existing email/password user → link their Google account
                    dbUser.googleId = account.providerAccountId;
                    dbUser.isVerified = true;
                    await dbUser.save();
                    console.log("[NextAuth] Linked Google to existing user:", dbUser._id);
                }

                // Pass MongoDB data to jwt() via the NextAuth user object
                user.mongoId = dbUser._id.toString();
                user.dbUsername = dbUser.username;
                user.credits = dbUser.credits;

                return true;
            } catch (err) {
                console.error("[NextAuth signIn error]:", err.message);
                return false;
            }
        },

        async jwt({ token, user, account }) {
            // Runs on first sign-in AND every subsequent session access
            if (user?.mongoId) {
                token.mongoId = user.mongoId;
                token.dbUsername = user.dbUsername;
                token.credits = user.credits;
            }

            // Mint our own app JWT on first Google sign-in
            if (account?.provider === "google" && user?.mongoId) {
                const tokenData = {
                    id: user.mongoId,
                    username: user.dbUsername,
                    email: user.email,
                };
                token.appToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
                    expiresIn: "1d",
                });
            }

            return token;
        },

        async session({ session, token }) {
            // Expose safe fields to the client session
            if (token.mongoId) session.user.mongoId = token.mongoId;
            if (token.credits !== undefined) session.user.credits = token.credits;
            if (token.dbUsername) session.user.dbUsername = token.dbUsername;
            return session;
        },

        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return baseUrl;
        },
    },
});

export { handler as GET, handler as POST };
