import prisma from "@/lib/db";
import IndiRegister from "@/components/events/IndiRegister";
import TeamRegister from "@/components/events/TeamRegister";
import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";

export default async function Register({ params }: { params: any }) {
  const eventId = params.id;
  const session = await getSession();

  const user = (await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  })) as unknown as {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
    emailVerified: Date | null;
    image: string | null;
    phone: string | null;
  };

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        coordinator: true,
        registrations: true,
        teams: true,
      },
    });

    if (!event) {
      return <div>Event not found</div>;
    }
    if (event.eventType === "TEAM") {
      return <TeamRegister event={event} user={user} />;
    } else {
      return <IndiRegister event={event} />;
    }
  } catch (error) {
    console.error("Error retrieving event details:", error);
    return <div>Error retrieving event details</div>;
  }
}
