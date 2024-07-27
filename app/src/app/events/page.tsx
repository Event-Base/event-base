import prisma from "@/lib/db";
import EventCard from "@/components/events/EventCard";

export default async function Component() {
  const events = await prisma.event.findMany({
    orderBy: { date: "asc" },
    where: {
      date: {
        gte: new Date(),
      },
    },
  });

  const pastEvents = await prisma.event.findMany({
    orderBy: { date: "desc" },
    where: {
      date: {
        lt: new Date(),
      },
    },
  });
  return (
    <div className="pt-20 flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="w-full">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Events</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  buttonTitle="Register"
                  href={`/events/register/${event.id}`}
                  event={event}
                  key={event.id}
                />
              ))}
            </div>
            <div className="my-8">
              <h1 className="text-2xl font-bold">Past Events</h1>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => (
                <EventCard
                  buttonTitle="Veiw more"
                  href={`/events/register/${event.id}`}
                  event={event}
                  key={event.id}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
