"use client";
import React, { useState } from "react";
import ThemeToggle from "../layouts/ThemeToggle/theme-toggle";
import { signIn, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white py-4 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
