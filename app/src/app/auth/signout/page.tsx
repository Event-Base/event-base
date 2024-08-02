"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { quantum } from "ldrs";
export default function Signin() {
    const router = useRouter();
    const { status } = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            quantum.register();
        }
        if (status === "authenticated") {
            setLoading(true);
            signOut()
                .then(() => {
                    router.push("/");
                })
                .catch((error) => {
                    console.error("Sign out failed:", error);
                    setLoading(false);
                });
        } else {
            router.push("/");
        }
    }, [status, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? (
                <div className="flex flex-col items-center">
                    <l-quantum size={"88"} speed={"1.75"} color={"#007BFF"}></l-quantum>
                    {/* Add a loading spinner or animation here if desired */}
                </div>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    );
}
