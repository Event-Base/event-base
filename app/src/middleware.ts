import { UserRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const secret = process.env.AUTH_SECRET ?? "";
    const token = await getToken({ req, secret, salt:process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token"  });
    

    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin") && token?.role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL("/404", req.url));
    }

    return NextResponse.next();
}
