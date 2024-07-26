"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { TailwindIndicator } from "@/components/shared/tailwind";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { toast } from "../ui/use-toast";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const handleOnline = () =>
            toast({
                title: "You are back online",
            });
        const handleOffline = () =>
            toast({
                title: "You are offline. Some functions may not work",
                variant: "destructive",
            });

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        // Cleanup event listeners on unmount
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        {children}
                        <ReactQueryDevtools />
                    </ThemeProvider>
                    <TailwindIndicator />
                </SessionProvider>
            </QueryClientProvider>
        </>
    );
}
