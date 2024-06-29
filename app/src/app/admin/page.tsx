import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";
import { notFound } from "next/navigation";
export default async function Admin() {
    const session = await getSession();
    if (!session || session.user.role !== UserRole.ADMIN) {
        return notFound();
    }
    return (
        <>
            <div className="min-h-screen text-2xl flex items-center justify-center">This is admin page</div>
        </>
    );
}
