import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";
import { notFound } from "next/navigation";
import AdminEventList from "@/components/admin/AdminEventList";
import AdminNavBar from "@/components/admin/AdminNavBar";

export default async function Admin() {
  const session = await getSession();
  if (!session || session.user.role !== UserRole.ADMIN) {
    return notFound();
  }
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <AdminNavBar session={session} />
        <AdminEventList />
      </div>
    </>
  );
}
