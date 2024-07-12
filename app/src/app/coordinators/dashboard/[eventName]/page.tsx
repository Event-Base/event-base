import Dashboard from "@/components/dashboard/Dashboad";
import getSession from "@/lib/getSession";
const page = async () => {
    const session = await getSession();

    return (
        <div>
            <Dashboard session={session} />
        </div>
    );
};

export default page;
