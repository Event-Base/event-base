"use server";
import prisma from "@/lib/db";
import { getIndividualEventDetailsProp } from "@/types";
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

export async function createEvent(currentState: { message: string; success: boolean }, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const email = formData.get("email") as string;
        const dateTime = `${date}T${time}:00`;
        const formattedDate = new Date(dateTime).toISOString().slice(0, 19).replace("T", " ");
        const location = formData.get("location") as string;

        if (!name || !description || !formattedDate) {
            throw new Error("Missing required fields");
        }

        const events = await prisma.event.create({
            data: {
                name,
                description,
                location,
                date: new Date(formattedDate),
                coordinatorEmail: email,
            },
        });

        await revalidatePath("/admin/events");

        return { message: "Event added successfully", success: true };
    } catch (error) {
        return { message: "Failed to create event", success: false };
    }
}

export async function getEventDetails(email: string) {
    const events = await prisma.event.findMany({
        where: {
            coordinatorEmail: email,
        },
    });

    console.log(events);
}

export async function getIndividualEventDetails(name: string): Promise<getIndividualEventDetailsProp | null> {
    const eventName = name.replace(/-/g, " ");
    const events = await prisma.event.findUnique({
        where: {
            name: eventName,
        },
        select: {
            id: true,
            name: true,
            location: true,
            date: true,
            coordinatorEmail: true,
        },
    });

    return events as getIndividualEventDetailsProp;
}
