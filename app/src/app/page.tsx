import { auth } from "@/auth";
import Link from "next/link";


export default async function Home() {
    const session = await auth();
    const user = session?.user;
    
    return (
        <div className="min-h-screen text-2xl flex items-center justify-center">
            {user ? (
                `Welcome ${user.name} your role is ${user.role}`
            ) : (
                <Link
                    href={"/api/auth/signin?callbackUrl=/profile"}
                    className="w-24 h-10 bg-blue-600 rounded-md text-center"
                >
                    Login
                </Link>
            )}
        </div>
    );
}
