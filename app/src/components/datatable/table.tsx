"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import { columns } from "./data"; // Adjust the import path as needed
import { getUserDetailsForOneEvent } from "@/app/actions"; // Adjust the import path as needed
import { toast } from "../ui/use-toast";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import { CheckIcon, Download } from "lucide-react";
import * as XLSX from "xlsx";
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
        try {
            fetchUsers();
        } catch (e: unknown) {
            toast({
                title: "Something went wrong",
            });
        }
    }, [fetchUsers]);

    const handleDownload = () => {
        const fileName = `${eventName}.xls`;
        // Sample data
        const data = [["Name", "Email"]].concat(
            registeredUsers.map((user) => [user.name || "", user.email || ""])
        );

        // Create a new workbook and add the data
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Convert the workbook to binary array
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        // Create a Blob object from the binary array
        const blob = new Blob([wbout], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName; // Set the desired filename
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

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
        <>
            <div className="flex w-screen h-16 flex-row justify-between items-center">
                <h1 className="text-center text-sm md:text-2xl font-bold">Registered Users</h1>
                <div onClick={handleDownload}>
                    <AnimatedSubscribeButton
                        buttonColor="#000000"
                        buttonTextColor="#ffffff"
                        subscribeStatus={false}
                        initialText={
                            <span className="group inline-flex items-center">
                                Download{" "}
                                <Download className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        }
                        changeText={
                            <span className="group inline-flex items-center">
                                <CheckIcon className="mr-2 h-4 w-4" />
                                Downloaded{" "}
                            </span>
                        }
                    />
                </div>
            </div>
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
        </>
    );
}
