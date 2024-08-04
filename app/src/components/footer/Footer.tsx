"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white py-4 border-t border-gray-300 dark:border-gray-700">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()}{" "} 
          <Link href="https://github.com/Event-Base" className=" hover:text-blue-700" >
             Event-Base
          </Link>
         {" "} All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
