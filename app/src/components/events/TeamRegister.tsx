"use client";
import { Button } from "../ui/button";
import { User, UserRole } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

import { useState } from "react";

export default function TeamRegister({ event, user }: TeamRegisterProps) {
  const [teamName, setTeamName] = useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = useState(user?.email ?? "");
  const [teamMemberEmails, setTeamMemberEmails] = useState<string[]>([]);

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleTeamLeaderEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeamLeaderEmail(event.target.value);
  };

  const handleTeamMemberEmailChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedEmails = [...teamMemberEmails];
    updatedEmails[index] = event.target.value;
    setTeamMemberEmails(updatedEmails);
  };

  const handleRegister = () => {
    console.log("Registering team", {
      teamName,
      teamLeaderEmail,
      teamMemberEmails,
    });
  };

  return (
    <div className="pt-16 flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
        <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
          <div className="w-full">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Fill the form</CardTitle>
                <p>Only the leader has to register for the event</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 p-3">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    type="text"
                    name="team-name"
                    value={teamName}
                    onChange={handleTeamNameChange}
                  />
                </div>
                <div className="grid gap-3 p-3">
                  <Label htmlFor="email">
                    Team Leader Email (Team Member 1)
                  </Label>
                  <Input
                    disabled
                    id="email"
                    type="text"
                    name="email"
                    value={teamLeaderEmail}
                    onChange={handleTeamLeaderEmailChange}
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
                      value={teamMemberEmails[i] || ""}
                      onChange={(event) =>
                        handleTeamMemberEmailChange(i, event)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            <div className="flex justify-end max-w-3xl mx-auto mt-5">
              <Button variant="outline" onClick={handleRegister}>
                Register
              </Button>
            </div>
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
