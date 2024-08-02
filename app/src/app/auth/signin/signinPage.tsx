"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { quantum } from "ldrs";

export default function Signin() {
    const router = useRouter();
    const { status } = useSession();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    useEffect(() => {
        if (typeof window !== "undefined") {
            quantum.register();
        }
        if (status === "unauthenticated") {
            setLoading(true);
            signIn("google").catch((error) => {
                console.error("Sign in failed:", error);
                setLoading(false);
            });
        } else if (status === "authenticated") {
            router.push(callbackUrl);
        }
    }, [status, router, callbackUrl]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? (
                <div className="flex flex-col items-center">
                    <l-quantum size={"88"} speed={"1.75"} color={"#007BFF"}></l-quantum>
                </div>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    );
}
