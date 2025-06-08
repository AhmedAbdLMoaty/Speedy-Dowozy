import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
    preload: true,
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
    preload: false,
});

export const metadata: Metadata = {
    title: "Speedy Dowozy - Szybka Dostawa Jedzenia",
    description:
        "Najszybsza dostawa jedzenia w Polsce. Zamów jedzenie online z lokalnych restauracji.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pl"
            className={`${geistSans.variable} ${geistMono.variable}`}
        >
            <body className={geistSans.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
