"use client";
import { Button } from "../ui/button";
import { User, UserRole } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { teamRegister } from "@/app/actions";

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

export default function TeamRegisterForm({ event, user }: TeamRegisterProps) {
  const initialState = {
    message: "",
    success: true,
  };

  const [formState, formAction] = useFormState(teamRegister, initialState);

  const { message, success } = formState;

  if (success) {
    toast({
      title: message,
    });
  } else {
    toast({
      title: message,
      variant: "destructive",
    });
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Fill the form</CardTitle>
        <p>Only the leader has to register for the event</p>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="gap-3 p-3 hidden">
            <Label htmlFor="event-id">EventId</Label>
            <Input
              id="event-id"
              type="text"
              name="event-id"
              value={event.id}
              disabled
            />
            <input type="hidden" name="event-id" value={event.id} />
          </div>
          <div className="grid gap-3 p-3">
            <Label htmlFor="team-name">Team Name</Label>
            <Input id="team-name" type="text" name="team-name" />
          </div>
          <div className="grid gap-3 p-3">
            <Label htmlFor="leader-email">
              Team Leader Email (Team Member 1)
            </Label>
            <Input
              disabled
              id="leader-email"
              type="text"
              name="leader-email"
              value={user?.email || ""}
            />
            <input
              type="hidden"
              name="leader-email"
              value={user?.email || ""}
            />
          </div>
          {Array.from({
            length: event.maxParticipantsPerTeam
              ? event.maxParticipantsPerTeam - 1
              : 0,
          }).map((_, i) => (
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
          ))}
          <div className="flex justify-end max-w-3xl mx-auto mt-5">
            <Button variant="outline">Register</Button>
          </div>
        </form>
      </CardContent>
    </Card>
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
