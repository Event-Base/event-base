import Dashboard from "@/components/dashboard/Dashboad";
import getSession from "@/lib/getSession";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/skeletonCard/SkeletonCard";
const page = async () => {
    const session = await getSession();

    return (
        <div>
            <Suspense fallback={<SkeletonCard />}>
                <Dashboard session={session} />
                
            </Suspense>
        </div>
    );
};

export default page;
