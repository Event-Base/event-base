import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || ""
    const limit = 10;
     
    const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          name:{
            contains: search,
            mode: 'insensitive'

          }
        }
      });

      return NextResponse.json({ users });
}
