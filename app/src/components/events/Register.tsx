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
export function AlertDialogDemo({ event, user }: { event: any; user: any }) {
    const initialState: InitialStateType = {
        message: "",
        success: null,
    };
    const [formState, formAction] = useFormState<FormState>(
        () => registerForEvent(event.id, user.id),
        initialState
    );

    const { message, success } = formState;
    if (success !== null) {
        toast({
            title: message,
            variant: success ? "default" : "destructive",
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
                            Are you sure to register as {user.name} for {event.name}?{" "}
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
