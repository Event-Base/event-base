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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function RegisterButton({ event, user }: { event: any; user: any }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async () => {
            setLoading(true);
            return await registerForEvent(event.id, user.id);
        },
        onSuccess: (data) => {
            setLoading(false);
            setSuccess(data.success);
            toast({
                description: data.message,
                title: "Success",
            });
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            setLoading(false);
            setSuccess(false);
            toast({
                description: error.message,
                title: "Error",
                variant: "destructive",
            });
        },
    });

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={success}>
                    Submit
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        mutation.mutate();
                    }}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Register</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure to register as {user.name} for {event.name}?{" "}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>
                            <Button type="submit">{loading ? "Loading..." : "Confirm"}</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
