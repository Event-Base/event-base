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
import { InitialStateType } from "@/types";

type FormState = {
  message: string;
  success: boolean | null;
};
export function TeamRegisterButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Submit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form>
          <AlertDialogHeader>
            <AlertDialogTitle>Register</AlertDialogTitle>
            <AlertDialogDescription>This is the message</AlertDialogDescription>
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
