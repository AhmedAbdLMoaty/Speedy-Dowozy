"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        const handlePageLoad = () => setIsMenuOpen(false);
        if (document.readyState === "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);
    const menuSections = [
        {
            id: "kim-jestesmy",
            title: "Kim jesteśmy?",
            path: "/menu/kim-jestesmy",
        },
        {
            id: "gdzie-dzialamy",
            title: "Gdzie działamy?",
            path: "/menu/gdzie-dzialamy",
        },
        { id: "kadra", title: "Kadra zarządzająca", path: "/menu/kadra" },
        { id: "zespol", title: "Zespół Speedy", path: "/menu/zespol" },
        {
            id: "aplikacja",
            title: "Aplikacja Speedy",
            path: "/menu/aplikacja",
        },
        {
            id: "administrator",
            title: "Strona administratora",
            path: "/menu/administrator",
        },
        { id: "statystyki", title: "Statystyki", path: "/menu/statystyki" },
        { id: "franczyza", title: "Franczyza", path: "/menu/franczyza" },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDropdownEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleDropdownLeave = () => {
        setIsDropdownOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarContent}>
                    <div className={styles.navbarLogo}>
                        <Link href="/" className={styles.logoLink}>
                            <Image
                                src="/logos/logo0.png"
                                alt="Speedy Dowozy Logo"
                                width={40}
                                height={40}
                                className={styles.logoImage}
                                priority
                            />
                            <Typography
                                variant="span"
                                weight="bold"
                                color="brand"
                                className={styles.logoText}
                            >
                                Speedy Dowozy
                            </Typography>
                        </Link>
                    </div>
                    <div className={styles.mobileOrderNowWrapper}>
                        <a
                            href="https://speedyjedzonko.pl"
                            className={styles.btnOrderNowMobile}
                        >
                            Zamów teraz
                        </a>
                    </div>
                    <div className={styles.navbarDesktop}>
                        <div className={styles.navbarMenu}>
                            <div
                                className={styles.dropdownContainer}
                                onMouseEnter={handleDropdownEnter}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <Link
                                    href="/menu"
                                    className={styles.btnPrimary}
                                >
                                    Menu
                                    <svg
                                        className={`${styles.dropdownIcon} ${
                                            isDropdownOpen
                                                ? styles.dropdownIconOpen
                                                : ""
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </Link>
                                {isDropdownOpen && (
                                    <div className={styles.dropdown}>
                                        <div className={styles.dropdownContent}>
                                            {menuSections.map((section) => (
                                                <Link
                                                    key={section.id}
                                                    href={section.path}
                                                    className={
                                                        styles.dropdownItem
                                                    }
                                                >
                                                    {section.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Link href="/contact" className={styles.btnContact}>
                                Kontakt
                            </Link>
                            <a
                                href="https://speedyjedzonko.pl"
                                className={styles.btnOrderNow}
                            >
                                Zamów teraz
                            </a>
                        </div>
                    </div>
                    <div className={styles.mobileMenuButton}>
                        <button
                            onClick={toggleMenu}
                            className={styles.menuToggle}
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`${styles.menuIcon} ${
                                    isMenuOpen ? styles.rotate90 : ""
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
                <div
                    className={`${styles.mobileMenu} ${
                        isMenuOpen ? styles.mobileMenuOpen : ""
                    }`}
                >
                    <div className={styles.mobileMenuContent}>
                        <Link
                            href="/menu"
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Całe Menu
                        </Link>
                        {menuSections.map((section) => (
                            <Link
                                key={section.id}
                                href={section.path}
                                className={styles.mobileSubNavLink}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {section.title}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Kontakt
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
