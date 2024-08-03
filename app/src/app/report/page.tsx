"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const Signup: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [issueName, setIssueName] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const { data: session } = useSession();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmail(session?.user.email || "");
        setName(session?.user.name || "");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="absolute top-4 right-4"></div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Report a issue
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Name
                        </label>
                        <input
                            type="name"
                            id="name"
                            value={session?.user.name || ""}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                            disabled={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={session?.user.email || ""}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                            disabled={true}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Name for issue
                        </label>
                        <input
                            type="nameforissue"
                            id="nameforissue"
                            value={issueName}
                            onChange={(e) => {
                                setIssueName(e.target.value);
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Describe the issue and how to recreate the issue
                        </label>
                        <textarea
                            id="describe"
                            value={description}
                            onChange={(e) => {
                                setIssueName(e.target.value);
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
