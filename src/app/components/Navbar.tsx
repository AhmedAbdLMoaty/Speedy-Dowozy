"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 mr-4"
                        >
                            <Image
                                src="/images/speedy dowozy różowe logo.jpg"
                                alt="Speedy Delivery Logo"
                                width={40}
                                height={40}
                                className="w-10 h-10 object-contain rounded-lg"
                                priority
                            />
                            <span className="text-xl font-bold text-logo-color">
                                Speedy Dowozy
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="nav-link"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link href="/sledzenie" className="btn-primary">
                                Śledź Przesyłkę
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-secondary hover:text-primary focus:outline-none focus:text-primary p-2 focus-ring"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-200 ${
                                    isMenuOpen ? "rotate-90" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "max-h-64 opacity-100"
                            : "max-h-0 opacity-0"
                    } overflow-hidden`}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block text-secondary hover:text-primary hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/sledzenie"
                            className="btn-primary w-full mt-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Śledź Przesyłkę
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const navItems = [
    { href: "/", label: "Strona Główna" },
    { href: "/uslugi", label: "Usługi" },
    { href: "/o-nas", label: "O Nas" },
    { href: "/kontakt", label: "Kontakt" },
];
