import Dashboard from "@/components/dashboard/Dashboad";
import getSession from "@/lib/getSession";
import { Suspense } from "react";
const page = async () => {
    const session = await getSession();

    return (
        <div>
            <Suspense fallback={<div>Loading</div>}>
                <Dashboard session={session} />
            </Suspense>
        </div>
    );
};

export default page;
