"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  return (
    <div className="">
      {status === "loading" && (
        <p className="min-h-screen flex items-center justify-center">
          Loading...
        </p>
      )}
      {status === "authenticated" && <UserProfile session={session} />}
      {status !== "loading" && status !== "authenticated" && (
        <p className="text-white text-xl">
          You need to be logged in to view this page.
        </p>
      )}
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
        <div className="flex flex-col items-center md:flex-row md:items-start rounded-lg shadow-md p-4">
          <img
            className="w-24 h-24 rounded-full border-2 border-white mb-4 md:mb-0 md:mr-4"
            src={session?.user?.image || ""}
            alt="Avatar"
          />
          <div className="text-center md:text-left my-auto ml-3">
            <p className="text-white text-2xl font-semibold">
              {session?.user?.name || "No user"}
            </p>
            <p className="text-white text-sm opacity-75">
              {session?.user?.email || "No email"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Participated Events
          </h2>
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-zinc-900 border-solid border-white border-2 border-opacity-45 p-4 rounded-lg shadow-md"
              >
                <p className="text-white text-lg">{event.name}</p>
                <p className="text-white text-sm opacity-75">{event.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
