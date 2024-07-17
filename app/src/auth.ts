import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role: UserRole;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: UserRole;
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
    },
    cookies: {
        pkceCodeVerifier: {
            name: "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
    },
    providers: [
        Google({
            profile(profile: GoogleProfile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: (profile.role as UserRole) ?? UserRole.PARTICIPANT,
                };
            },
        }),
    ],
    callbacks: {
        // to allow only people with sjec email id

        // async signIn({ user , account, profile , credentials}) {
        //     const email = profile?.email as string | undefined
        //     const allowedEmailDomain = "sjec.ac.in"
        //     if (email && email?.endsWith(`@${allowedEmailDomain}`)) {
        //         return true;
        //       } else {
        //         return false;
        //       }

        // },
        async jwt({ token }) {
            if (!token.sub) return token;
            const user = await prisma.user.findUnique({
                where: { id: token.sub },
            });
            if (!user) return token;
            token.role = user.role;
            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                },
            };
        },
    },
});
