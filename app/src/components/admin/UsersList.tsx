"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import ChangeRole from "./ChangeRole";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole; // Assuming you have a UserRole type defined
    image: string | null;
}

interface UsersListProps {
    initialUsers: User[];
    initialPage: number;
}



export const dynamic = "force-dynamic";

const UsersList: React.FC<UsersListProps> = ({initialUsers ,initialPage }) => {
    const [userList, setUserList] = useState<User[] >(initialUsers);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loader = useRef<HTMLDivElement | null>(null);

    const loadMoreUsers = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get(`/api/users?page=${currentPage + 1}`);
            if (response.data.users.length > 0) {
                setUserList((prevUsers) => [...prevUsers, ...response.data.users]);
                setCurrentPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading more users:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (loader.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        loadMoreUsers();
                    }
                },
                { threshold: 1.0 }
            );
            observer.observe(loader.current);
            return () => observer.disconnect();
        }
    }, [loader.current, hasMore]);

    return (
        <>
            <div className="flex flex-1 overflow-hidden">
                <main className="container grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-5">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>Manage user roles and permissions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {userList.map((user) => (
                                    <div
                                        key={user.id}
                                        className="grid grid-cols-[1fr_auto] items-center gap-4"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={user.image || "/placeholder-user.jpg"} />
                                                <AvatarFallback>
                                                    {user.name ? user.name[0] : "N/A"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {user.name || "Unknown"}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {user.email || "No email"}
                                                </p>
                                            </div>
                                        </div>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" size="sm">
                                                    {user.role}{" "}
                                                    <ChevronDownIcon className="w-4 h-4 ml-2 text-muted-foreground" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="center">
                                                <ChangeRole userId={user.id} userRole={user.role} />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                ))}
                            </div>
                            {hasMore && (
                                <div ref={loader} className="text-center">
                                    {loading ? "Loading..." : "Load more"}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </main>
            </div>
        </>
    );
};

export default UsersList;

export const getServerSideProps: GetServerSideProps = async () => {
    const page = 1;
    const limit = 10;
    const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    return {
        props: {
            initialUsers: users,
            initialPage: page,
        },
    };
};
