"use server";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";

export default async function updateUserRole(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user) return;

    const role = user.role === UserRole.ADMIN ? UserRole.PARTICIPANT : UserRole.ADMIN;

    await prisma.user.update({
        where: {
            id,
        },
        data: {
            role,
        },
    });
}
