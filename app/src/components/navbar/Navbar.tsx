"use client";
import React, { useState } from "react";
import ThemeToggle from "../layouts/ThemeToggle/theme-toggle";
import { signIn, signOut } from "@/auth";
import { useSession } from "next-auth/react";

import Link from "next/link";

const NavBar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = useSession();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="p-4 bg-white dark:bg-black">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-black dark:text-white text-2xl font-bold">
                    <ThemeToggle />
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg"
                    >
                        Products
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg"
                    >
                        History
                    </a>
                    <a
                        href="#"
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg"
                    >
                        Contact
                    </a>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    {session ? (
                        <Link
                            href={"/auth/signout"}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-2 px-4 rounded"
                        >
                            Sign Out
                        </Link>
                    ) : (
                        <Link
                            href={"/auth/signin?callbackUrl=/profile"}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-2 px-4 rounded"
                        >
                            Sign In
                        </Link>
                    )}
                    <a
                        href="/profile"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-2 px-4 rounded"
                    >
                        Profile
                    </a>
                </div>
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <a
                        href="#"
                        className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
                    >
                        Products
                    </a>
                    <a
                        href="#"
                        className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
                    >
                        History
                    </a>
                    <a
                        href="#"
                        className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
                    >
                        Contact
                    </a>
                    <a
                        href="#"
                        className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
                    >
                        Sign in
                    </a>
                    <a
                        href="/profile"
                        className="block bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-2 px-4 rounded mt-2"
                    >
                        Profile
                    </a>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
