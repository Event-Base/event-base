"use server";
import prisma from "@/lib/db";
import { EventType } from "@prisma/client";
import { getIndividualEventDetailsProp } from "@/types";
import { Resend } from "resend";
import { UserRole } from "@prisma/client";

import { revalidatePath } from "next/cache";
import { EventAddedEmail } from "@/emails/eventAdded";
import getSession from "@/lib/getSession";
const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function createEvent(
    currentState: { message: string; success: boolean | null },
    formData: FormData
) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const email = formData.get("email") as string;
        const dateTime = `${date}T${time}:00`;
        const formattedEventDate = new Date(dateTime).toISOString().slice(0, 19).replace("T", " ");
        const location = formData.get("location") as string;
        const eventType = formData.get("eventType") as EventType;
        const DeadlineDate = formData.get("registrationDeadline") as string || date;
        const DeadlineDateTime = `${DeadlineDate}T23:59:00`;
        const minParticipantsPerTeam = Number(formData.get("minParticipantsPerTeam"));
        const maxParticipantsPerTeam = Number(formData.get("maxParticipantsPerTeam"));
        const isTeamEvent = eventType == 'TEAM' ? true : false;

        if (!name || !description || !formattedEventDate) {
            throw new Error("Missing required fields");
        }

        const events = await prisma.event.create({
            data: {
                name,
                description,
                location,
                date: new Date(formattedEventDate),
                coordinatorEmail: email,
                eventType,
                registrationDeadline: new Date(DeadlineDateTime),
                minParticipantsPerTeam,
                maxParticipantsPerTeam,
                isTeamEvent
            },
        });
        const coordinatorName = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                name: true
            }
        })

        await revalidatePath("/admin/events");

        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: "someemail@something.com",
            subject: "Your Event Has Been Added to Our Event Base Website",
            react: EventAddedEmail({
                eventName: name,
                username: coordinatorName?.name ?? "",
                inviteLink: "localhost:3000/coordinator",
            }),
        });

        return { message: "Event added successfully", success: true };
    } catch (error) {
        console.error(error)
        return { message: "Failed to create event", success: false };
    }
}

export async function getEventDetails(email: string) {
    const events = await prisma.event.findMany({
        where: {
            coordinatorEmail: email,
        },
    });

    return events;
}

export async function getIndividualEventDetails(id: string): Promise<getIndividualEventDetailsProp | null> {
    // const eventName = name.replace(/-/g, " ");
    const events = await prisma.event.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            location: true,
            date: true,
            coordinatorEmail: true,
            createdAt: true,
            registrations: {
                select: {
                    id: true,
                    createdAt: true
                },
            },
        },
    });
    //get the count of registration

    const count = events?.registrations.length ?? 0;
    const eventWithCount = {
        ...events,
        count,
    };

    return eventWithCount as getIndividualEventDetailsProp;
}

export async function registerForEvent(eventId: string, userId: string) {
    try {
        await prisma.registration.create({
            data: {
                userId,
                eventId,
                attended: false,
            },
        });

        return { message: "Registered successfully", success: true };
    } catch (error: any) {
        return { message: error.message, success: false };
    }
}

export async function getUserDetailsForOneEvent(id: string) {
    // const eventName = decodeURIComponent(name);
    const users = await prisma.event.findMany({
        where: {
            id: id
        },
        include: {
            registrations: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,

                            image: true
                        }
                    }
                }
            }
        }

    })
    const registeredUsers = users.flatMap(event =>
        event.registrations.map(registration => registration.user)
    );
    return registeredUsers;

}

export async function teamRegister(
    currentState: { message: string; success: boolean | null },
    formData: FormData
) {
    try {
        const eventId = formData.get("event-id") as string;
        const teamName = formData.get("team-name") as string;
        const leaderEmail = formData.get("leader-email") as string;
        if (!eventId || !teamName || !leaderEmail) {
            if (teamName) {
                console.log("Team name ");
            }
            if (!eventId) {
                throw new Error("Event ID is required");
            }
            if (!leaderEmail) {
                throw new Error("Leader email is required");
            }



        }
        const event = await prisma.event.findUnique({
            where: {
                id: eventId,
            }
        });

        const leader = await prisma.user.findUnique({
            where: {
                email: leaderEmail,
            }
        })
        if (!leader) {
            throw new Error("Leader not found");
        }


        // const maxParticipantsPerTeam = event?.maxParticipantsPerTeam ?? 0;
        const memberEmails: string[] = Array.from({
            length: event?.maxParticipantsPerTeam
                ? event.maxParticipantsPerTeam - 1
                : 0,
        }).map((_, i) => formData.get(`member-${i + 1}-email`) as string);

        const team = await prisma.team.create({
            data: {
                name: teamName,
                leaderId: leader?.id ?? "",
                eventId,
            },
        });





        for (const email of memberEmails) {
            const member = await prisma.user.findUnique({
                where: { email },
            });

            if (member) {
                await prisma.teamMember.create({
                    data: {
                        teamId: team.id,
                        userId: member.id,
                    },
                });
            }
        }
        const register = await prisma.registration.create({
            data: {
                userId: leader.id,
                eventId,
                attended: false,
            },
        })
        return { message: "Team registered successfully", success: true };
    } catch (error) {
        console.error((error as any).message);
        return { message: "Failed to register for the team", success: false };
    }

}