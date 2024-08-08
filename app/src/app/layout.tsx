import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layouts/Providers";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Event Base",
    description:
        " Event Base is a comprehensive platform designed to streamline event management and coordination. From creating event schedules to managing attendee registrations and communications, Event Base offers an all-in-one solution to ensure your events run smoothly. Developed using cutting-edge technologies and a user-friendly interface, it caters to both organizers and participants, making event planning efficient and enjoyable. Start simplifying your event management with Event Base today!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="custom-scrollbar">
            <Script defer src={process.env.WEBSITE_SRC} data-website-id={process.env.WEBSITE_ID}></Script>
            <body className={inter.className}>
                <Providers>
                    <nav className="">
                        <NavBar />
                    </nav>
                    {children}
                    <footer>
                        <Footer />
                    </footer>
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
