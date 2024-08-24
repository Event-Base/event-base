import { Button } from "../ui/button";
import { User, UserRole } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TeamRegisterForm from "@/components/events/TeamRegisterForm";
import getSession from "@/lib/getSession";
import prisma from "@/lib/db";

interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
}

interface EventProps {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: string;
  eventType: string;
  maxParticipants: number | null;
  registrationDeadline: Date | null;
  minParticipantsPerTeam: number | null;
  maxParticipantsPerTeam: number | null;
  coordinatorEmail: string | null;
  createdAt: Date;
  isTeamEvent: boolean;
  coordinator: User | null;
  registrations: any[];
  teams: any[];
}

interface TeamRegisterProps {
  event: EventProps;
  user: UserProps | null;
}

export default async function TeamRegister({ event, user }: TeamRegisterProps) {
  const initialState = {
    message: "",
    success: true,
  };

  if (!user) return null;

  const isLeader = await prisma.team.findFirst({
    where: {
      eventId: event.id,
      leaderId: user.id,
    },
  });

  const isMember = await prisma.teamMember.findFirst({
    where: {
      userId: user.id,
      team: {
        eventId: event.id,
      },
    },
    include: {
      team: true,
    },
  });

  return (
    <div className="pt-16 flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <div className="w-full">
            {isLeader || isMember ? (
              <div>You are already in a team</div>
            ) : (
              <TeamRegisterForm event={event} user={user} />
            )}
          </div>
        </main>
      </div>
    </div>
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
