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

export async function createEvent(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const email = formData.get("email") as string;
        const dateTime = `${date}T${time}:00`;
        const formattedDate = new Date(dateTime).toISOString().slice(0, 19).replace("T", " ");

        if (!name || !description || !date) {
            throw new Error("Missing required fields");
        }

        const events = await prisma.event.create({
            data: {
                name,
                description,
                date: new Date(formattedDate),
                coordinatorEmail: email,
                location: "tteset",
            },
        });

        await revalidatePath("/admin/events");

        return events;
    } catch (error) {
        console.error("Error creating event:", error);
        return { error: "Failed to create event" };
    }
}
