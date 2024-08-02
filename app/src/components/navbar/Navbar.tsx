"use client";
import React, { useState } from "react";
import ThemeToggle from "../layouts/ThemeToggle/theme-toggle";
import { signIn, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed w-full top-0 p-4 bg-white dark:bg-black z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-black dark:text-white text-2xl font-bold">
            <ThemeToggle />
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hidden sm:block mx-5 font-semibold">
              Home
            </Link>
            <Link href="/events" className="hidden sm:block mx-5 font-semibold">
              Events
            </Link>
            <Link
              href="/coordinators"
              className="hidden sm:block mx-5 font-semibold"
            >
              My events
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="ml-auto flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <img
                        src={session?.user?.image ?? ""}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {session ? session.user.name : "Admin"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={"/profile"}>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href={"/auth/signout"}>
                    <DropdownMenuItem>
                      Sign Out
                    </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button className="font-semibold" asChild>
                <Link href={"/auth/signin?callbackUrl=/profile"}>Sign In</Link>
              </Button>
            )}
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
          <div className="md:hidden px-5 pt-2 pb-4">
            <Link
              href="/"
              className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
            >
              Home
            </Link>
            <Link
              href="/events"
              className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
            >
              Events
            </Link>
            <Link
              href="/"
              className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
            >
              Contact
            </Link>
            {session ? (
              <>
                <Link
                  href={"/auth/signout"}
                  className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
                >
                  Sign Out
                </Link>
                <Link
                  href="/profile"
                  className="block bg-indigo-600 hover:bg-indigo-500 text-white text-lg py-2 px-4 rounded mt-2"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                href="/auth/signin?callbackUrl=/profile"
                className="block text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white text-lg py-2"
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </nav>
      <div className="pt-20">
        {/* This padding ensures content starts below the navbar */}
        {/* Your main content here */}
      </div>
    </>
  );
};

export default NavBar;
