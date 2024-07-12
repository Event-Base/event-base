import { Button } from "../ui/button";
import { AlertDialogDemo } from "./Register";
import getSession from "@/lib/getSession";
import prisma from "@/lib/db";

export default async function RegisterPage({ event }: { event: any }) {
  const session = await getSession();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex" /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <div className="w-full">
            <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
              <div className="space-y-2 not-prose my-6">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-2">
                  {event.name}
                </h1>
                <p className="text-muted-foreground">
                  Posted on {event.date.toDateString()}
                </p>
              </div>
              <p>
                Join us for our annual company picnic at the park. Food, games,
                and fun for the whole family!
              </p>
              <p>
                The event will take place on June 15, 2023 at 12:00 PM in
                Central Park. We're expecting around 100 attendees, including
                employees and their families.
              </p>
              <p>
                Some of the activities planned for the day include a BBQ lunch,
                lawn games like cornhole and frisbee, and a raffle with prizes.
                It's a great opportunity for everyone to relax, socialize, and
                enjoy each other's company outside of the office.
              </p>
              <p>
                We're looking forward to a fun and memorable event. If you have
                any questions or need more information, please don't hesitate to
                reach out.
              </p>
            </article>
            <div className="flex justify-end max-w-3xl  mx-auto mt-5">
              {" "}
              {/* Modified line */}
              <AlertDialogDemo event={event} user={user} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
