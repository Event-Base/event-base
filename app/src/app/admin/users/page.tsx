import getSession from "@/lib/getSession";
import { UserRole } from "@prisma/client";
import { notFound } from "next/navigation";
import AdminNavBar from "@/components/admin/AdminNavBar";
import UsersList from "@/components/admin/UsersList";
import { GetServerSideProps } from "next";
import prisma from "@/lib/db";

const initialPage = 1;

export default async function Admin() {
    const session = await getSession();
    let initialUserData = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
        },
        take: 10,
    });
    if(initialUserData === null){
      initialUserData = [
        {
          id: "1",
          name: "Test name",
          email: "testEmail@gmail.com",
          role: "PARTICIPANT",
          image: "https://i.pravatar.cc/300?img=1",
        },
        
      ]
    
    }

    return (
        <>
            <div className="pt-20 flex min-h-screen w-full flex-col bg-background">
                <AdminNavBar session={session} />
                <UsersList initialUsers={initialUserData} initialPage={initialPage} />
            </div>
        </>
    );
}
