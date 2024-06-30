"use server";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function updateUserRole(id: string, role: UserRole) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { role },
        });
        revalidatePath("/admin/users");
        return updatedUser;
    } catch (error) {
        console.error("Error updating user role:", error);
        return null;
    }
}

export async function makeAdmin(id: string) {
    return await updateUserRole(id, UserRole.ADMIN);
}

export async function makeParticipant(id: string) {
    return await updateUserRole(id, UserRole.PARTICIPANT);
}