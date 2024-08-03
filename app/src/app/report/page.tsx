"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { createIsuue } from "../actions";

const Signup: React.FC = () => {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        email: session?.user.email ?? "",
        description: "",
        issueName: "",
    });
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            setLoading(true);
            return await createIsuue(formData);
        },
        onSuccess: () => {
            setLoading(false);
            toast({
                description: "Issue reported successfully",
                title: "Success",
            });
            void queryClient.invalidateQueries({ queryKey: ["issues"] });
        },
        onError: (error) => {
            setLoading(false);
            toast({
                description: error.message,
                title: "Error",
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        mutation.mutate();
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="absolute top-4 right-4"></div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
                    Report a issue
                </h2>
                <form>
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
                            name="issueName"
                            id="nameforissue"
                            value={formData.issueName}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                            Describe the issue and how to recreate the issue
                        </label>
                        <input
                            name="description"
                            id="describe"
                            value={formData.description}
                            onChange={(e) => {
                                handleChange(e);
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            handleSubmit(e);
                        }}
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-200"
                    >
                        {loading ? "Loading..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
