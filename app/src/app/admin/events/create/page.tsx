"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createEvent } from "@/app/actions";
import { useFormState } from "react-dom";
import { toast } from "@/components/ui/use-toast";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function Create() {
  const initialState = {
    message: "",
    success: true,
  };
  const [formState, formAction] = useFormState(createEvent, initialState);

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


  const [selectedEventType, setSelectedEventType] = useState("INDIVIDUAL");
  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedEventType(event.target.value);
  };
  return (
    <div className="pt-20 flex justify-center min-h-screen w-full flex-col bg-muted/20">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="container grid flex-1 items-center gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create Event</CardTitle>
              <CardDescription>Create an Event</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6" action={formAction}>
                <div className="grid gap-3">
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue="Event Name"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    defaultValue="Event Description"
                    className="min-h-32"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Coordinator Email id</Label>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    defaultValue="Coordinator Email id"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" name="date" defaultValue="" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    name="time"
                    defaultValue="12:00"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    defaultValue="HALL 1"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="registrationDeadline">
                    Registration Deadline{" "}
                    <span className="font-normal">
                      (If null then user can register until event starts)
                    </span>
                  </Label>
                  <Input
                    id="registrationDeadline"
                    type="date"
                    name="registrationDeadline"
                    defaultValue=""
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="eventType">Event Type</Label>
                  <RadioGroup name="eventType" onChange={handleEventTypeChange}>
                    <div>
                      <RadioGroupItem value="INDIVIDUAL" id="individual" />
                      <Label htmlFor="individual" className="pl-3">
                        Individual
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="TEAM" id="team" />
                      <Label htmlFor="team" className="pl-3">
                        Team
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                {selectedEventType === "TEAM" && (
                  <>
                    <div className="grid gap-3">
                      <Label htmlFor="maxParticipantsPerTeam">Team Size</Label>
                      <Input
                        id="maxParticipantsPerTeam"
                        type="number"
                        name="maxParticipantsPerTeam"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="minParticipantsPerTeam">
                        Minimum member per team
                      </Label>
                      <Input
                        id="minParticipantsPerTeam"
                        type="number"
                        name="minParticipantsPerTeam"
                      />
                    </div>
                  </>
                )}
                <CardFooter className="justify-end">
                  <Button type="submit">Create</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
