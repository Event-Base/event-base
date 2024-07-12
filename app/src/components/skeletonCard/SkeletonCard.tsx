import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="grid grid-cols-1 gap-4">
            <div className=" p-4 flex flex-col gap-5 justify-center items-center lg:justify-around mt-8 lg:flex-row ">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            </div>
            <div className=" p-4">
                <Skeleton className="h-[400px] w-fullrounded-xl" />
            </div>
        </div>
    );
}
