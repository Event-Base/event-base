import { auth } from "@/auth";
import Link from "next/link";
import getSession from "@/lib/getSession";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/layouts/ThemeToggle/theme-toggle";

export default async function Home() {
    const session = await getSession();
    const user = session?.user;

    return (
        <>
            <div className="flex items-center justify-center min-h-screen text-center bg-background text-foreground">
                <div className="max-w-4xl p-4">
                    <h1 className="text-5xl md:text-7xl font-bold">
                        Welcome to{" "}
                        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                            Event Base
                        </span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-muted-foreground">
                        Streamlining Event Management and Enhancing Participant Engagement
                    </p>
                    <div className="mt-6">
                        <Button
                            asChild
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-xl"
                        >
                            <Link href={user ? "/#" : "api/auth/signin"}>Get Strated</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
