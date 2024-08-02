import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layouts/Providers";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="custom-scrollbar">
            <body className={inter.className}>
                <Providers>
                    <nav className="">
                        <NavBar />
                    </nav>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
