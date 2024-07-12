"use client";
import { registerForEvent } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { toast } from "@/components/ui/use-toast";

export function AlertDialogDemo({ event, user }: { event: any; user: any }) {
  const initialState = {
    message: "",
    success: true,
  };
  const [formState, formAction] = useFormState(
    () => registerForEvent(event.id, user.id),
    initialState
  );

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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Register</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure to register as {user.name}
              {event.name}?{" "}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Button type="submit">Confirm</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
