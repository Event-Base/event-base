"use server";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";

export default async function updateUserRole(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            console.error("User not found");
            return false;
        }

    
        const newRole = user.role === UserRole.ADMIN ? UserRole.PARTICIPANT : UserRole.ADMIN;

        await prisma.user.update({
            where: { id },
            data: { role: newRole },
        });

        return true;
    } catch (error) {
        console.error("Error updating user role:", error);
        return false;
    }
}
