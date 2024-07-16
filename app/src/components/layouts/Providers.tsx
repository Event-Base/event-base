"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { TailwindIndicator } from "@/components/shared/tailwind";
import ThemeProvider from "./ThemeToggle/theme-provider";

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
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
