import { CardForProfile } from "@/components/ui/card-for-profile";
import prisma from "@/lib/db";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
export default async function Profile() {
    const session = await getSession();
    // const events = [
    //     { id: 1, name: "Event1", date: "2024-07-01" },
    //     { id: 2, name: "Event2", date: "2024-08-15" },
    // ];

    async function getUserRegisteredEvents() {
        const userId = session?.user.id;
        const registrations = await prisma.registration.findMany({
            where: {
                userId: userId,
            },
            include: {
                event: true,
            },
        });

        return registrations.map((registration) => registration.event);
    }
    const events = await getUserRegisteredEvents();

    if (!session) {
        redirect("auth/signin?callbackUrl=/profile");
    }
    return (
        <div className="min-h-screen flex items-center">
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row md:justify-between rounded-lg p-4 border-2 ">
                    <div className="flex flex-col items-center md:flex-row md:items-start ">
                        <img
                            className="w-24 h-24 rounded-full border-2 mb-4 md:mb-0 md:mr-4"
                            src={session?.user?.image || ""}
                            alt="Avatar"
                        />
                        <div className="text-center md:text-left my-auto ml-3">
                            <p className="text-2xl font-semibold">{session?.user?.name || "No user"}</p>
                            <p className="text-sm opacity-75">{session?.user?.email || "No email"}</p>
                        </div>
                    </div>
                    <div className="my-auto flex justify-center md:mt-3">
                        <div className=" max-w-xs">
                            <p className="font-semibold flex justify-between ">
                                <span className="mr-2">Number of Events Participated:</span>
                                <span>{events.length}</span>
                            </p>
                            <p className="font-semibold flex justify-between ">
                                <span>Number of Events organized:</span>
                                <span>10</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Participated Events</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {events.map((event) => (
                            <CardForProfile
                                key={event.id}
                                eventName={event.name}
                                eventDate={event.date.toISOString().split("T")[0]}
                                eventDesc={event.description}
                            
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function UserProfile({ session }: { session: any }) {
    const events = [
        { id: 1, name: "Event1", date: "2024-07-01" },
        { id: 2, name: "Event2", date: "2024-08-15" },
    ];
    return (
        <div className="min-h-screen flex items-center">
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row md:justify-between rounded-lg p-4 border-2">
                    <div className="flex flex-col items-center md:flex-row md:items-start">
                        <img
                            className="w-24 h-24 rounded-full border-2 mb-4 md:mb-0 md:mr-4"
                            src={session?.user?.image || ""}
                            alt="Avatar"
                        />
                        <div className="text-center md:text-left my-auto ml-3">
                            <p className="text-2xl font-semibold">{session?.user?.name || "No user"}</p>
                            <p className="text-sm opacity-75">{session?.user?.email || "No email"}</p>
                        </div>
                    </div>
                    <div className="my-auto flex justify-center md:mt-3">
                        <div className=" max-w-xs">
                            <p className="font-semibold flex justify-between ">
                                <span className="mr-2">Number of Events Participated:</span>
                                <span>10</span>
                            </p>
                            <p className="font-semibold flex justify-between ">
                                <span>Number of Events organized:</span>
                                <span>10</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Participated Events</h2>
                    <ul className="space-y-4">
                        {events.map((event) => (
                            <li key={event.id} className="border-2 border-opacity-45 p-4 rounded-lg">
                                <p className="text-lg">{event.name}</p>
                                <p className="text-sm opacity-75">{event.date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
