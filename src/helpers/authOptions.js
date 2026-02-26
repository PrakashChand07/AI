/**
 * Shared NextAuth configuration.
 * Import and pass `authOptions` to getServerSession() in API routes.
 */
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
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
        async jwt({ token, user }) {
            if (user?.mongoId) {
                token.mongoId = user.mongoId;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.mongoId = token.mongoId;
            return session;
        },
    },
};
