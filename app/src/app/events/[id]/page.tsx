import prisma from "@/lib/db";
import Info from "@/components/events/Info";
import { notFound } from "next/navigation";

export default async function EventInfo({ params }: { params: any }) {
  const eventId = params.id;

  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      notFound();
    }

    return <Info event={event}></Info>;
  } catch {
    return <div>Error retrieving event details</div>;
  }
}
