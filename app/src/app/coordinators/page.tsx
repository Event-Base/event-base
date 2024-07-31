import EventCard from "@/components/events/EventCard";
import prisma from "@/lib/db";
import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";
import { notFound } from "next/navigation";
const page = async () => {
    let eventsOfUser;
    const session = await getSession();
    if (!session) {
        return notFound();
    }
    if (session.user.role === UserRole.ADMIN) {
        eventsOfUser = await prisma.event.findMany({});
    } else {
        eventsOfUser = await prisma.event.findMany({
            where: {
                coordinatorEmail: session?.user?.email,
            },
        });
    }

    if (eventsOfUser.length <= 0) {
        return (
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
                    <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <div className="w-full">
                            <div className="mb-8">
                                <h1 className="text-2xl font-bold">Events</h1>
                                <p className="text-muted-foreground">No events found</p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

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
                            {eventsOfUser.map((event) => (
                                <EventCard
                                    buttonTitle="View more"
                                    href={`coordinators/dashboard/${event.id}`}
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
};

export default page;
