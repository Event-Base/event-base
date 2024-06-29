import NextAuth, { DefaultSession } from "next-auth";
import prisma from "@/lib/db";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import {JWT} from "next-auth/jwt"

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
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
});
