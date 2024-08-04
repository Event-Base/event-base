"use client";
import React from "react";

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
