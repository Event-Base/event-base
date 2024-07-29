import { Button } from "../ui/button";
import { AlertDialogDemo } from "./Register";
import getSession from "@/lib/getSession";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default async function RegisterPage({ event }: { event: any }) {
  const session = await getSession();
  const user = (await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  })) as {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
    emailVerified: Date | null;
    image: string | null;
    phone: string | null;
  };
  return (
    <div className="pt-16 flex min-h-screen w-full flex-col bg-muted/40">
      {/* <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex" /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <div className="w-full">
            <Card className=" max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>
                  These are the information that will be used for the event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">Name: {user?.name}</p>
                <p className="mb-2">Email: {user?.email}</p>
                <p className="mb-2">Phone: {user?.phone ?? "NA"}</p>
                <p className="mb-2">
                  If any correction, please edit your profile
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-end max-w-3xl mx-auto mt-5">
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
