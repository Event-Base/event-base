import { Button } from "../ui/button";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function TeamRegister({ event }: { event: any }) {
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <div className="w-full">
            <Card className=" max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Fill the form</CardTitle>
                <p>Only leader have to register to the event</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 p-3">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input type="text" name="team-name" />
                </div>
                <div className="grid gap-3 p-3">
                  <Label htmlFor="name">
                    Team Leader Email (Team Memeber 1)
                  </Label>
                  <Input
                    disabled
                    id="email"
                    type="text"
                    name="email"
                    defaultValue={user?.email ?? ""}
                  />
                </div>
                {Array.from({ length: event.maxParticipantsPerTeam - 1 }).map(
                  (_, i) => (
                    <div key={i} className="grid gap-3 p-3">
                      <Label htmlFor={`member-${i + 1}-email`}>
                        Member {i + 2} Email
                      </Label>
                      <Input
                        id={`member-${i + 1}-email`}
                        type="text"
                        name={`member-${i + 1}-email`}
                      />
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end max-w-3xl mx-auto mt-5">
              <Button variant="outline">Register</Button>
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
