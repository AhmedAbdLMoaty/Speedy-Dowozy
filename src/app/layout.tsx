import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./critical.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
    ],
    adjustFontFallback: true,
    weight: ["400", "500", "600"],
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
        <html lang="pl">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                <link
                    rel="preload"
                    as="image"
                    href="/images/mob-bg-optimized.webp"
                    media="(max-width: 768px)"
                    fetchPriority="high"
                />

                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    /* Base font fallbacks for all devices */
                    html {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    
                    /* Desktop font fix - using direct variable reference */
                    @media (min-width: 769px) {
                        body, button, h1, h2, h3, h4, h5, h6, p, span, div, a, input {
                            font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        }
                    }
                    
                    /* Mobile font optimization */
                    @media (max-width: 768px) {
                        body, h1, h2, h3, h4, h5, h6, p, button, a, span, div {
                            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                        }
                    }
                `,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable}`}
                style={{ background: "rgb(225, 16, 125)" }}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
