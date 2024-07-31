import prisma from "@/lib/db";
import IndiRegister from "@/components/events/IndiRegister";
import TeamRegister from "@/components/events/TeamRegister";

export default async function Register({ params }: { params: any }) {
  const eventId = params.id;

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return <div>Event not found</div>;
    }
    if (event.eventType === "TEAM") {
      return <TeamRegister event={event} />;
    } else {
      return <IndiRegister event={event} />;
    }
  } catch (error) {
    console.error("Error retrieving event details:", error);
    return <div>Error retrieving event details</div>;
  }
}
