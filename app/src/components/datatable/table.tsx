"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import { columns } from "./data"; // Adjust the import path as needed
import { getUserDetailsForOneEvent } from "@/app/actions"; // Adjust the import path as needed
import { toast } from "../ui/use-toast";

type UserType = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
};

type Props = {
    eventName: string;
};

export default function UserDetailsTable({ eventName }: Props) {
    const [registeredUsers, setRegisteredUsers] = useState<UserType[]>([]);

    const fetchUsers = useCallback(async () => {
        const users = await getUserDetailsForOneEvent(eventName);
        setRegisteredUsers(users);
        
    }, [eventName]);

    useEffect(() => {
        try{

            fetchUsers();
        }
        catch(e:unknown){
            toast({
                title: "Something went wrong",
            })
        }
    }, [fetchUsers]);

    const renderCell = useCallback((user: UserType, columnKey: React.Key) => {
        switch (columnKey) {
            case "name":
                return (
                    <User avatarProps={{ radius: "lg", src: user.image || "" }} name={user.name}>
                        {user.name}
                    </User>
                );
            case "email":
                return user.email;
            case "image":
                return <img src={user.image || ""} alt={user.name || "User"} />;
            default:
                return null;
        }
    }, []);

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align="center">
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={registeredUsers}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
