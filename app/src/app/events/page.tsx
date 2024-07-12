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
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
                <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="w-full">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold">Events</h1>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <EventCard buttonTitle="Register" event={event} key={event.id}/>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
