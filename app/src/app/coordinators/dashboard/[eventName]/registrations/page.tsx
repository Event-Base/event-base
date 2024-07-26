"use client";
import React, { Suspense } from "react";
import UserDetailsTable from "@/components/datatable/table";
import { usePathname } from "next/navigation";

const page = () => {
    const pathName = usePathname();
    const eventID = pathName.split("/")[3];

    return (
        <div>
            <Suspense fallback={<div className="dark:text-white text-black">Loading</div>}>
                <UserDetailsTable eventName={eventID} />
            </Suspense>
        </div>
    );
};

export default page;
