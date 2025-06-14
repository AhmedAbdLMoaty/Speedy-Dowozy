"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handlePageLoad = () => setIsMenuOpen(false);
        if (document.readyState === "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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

                    <div className={styles.navbarDesktop}>
                        <div className={styles.navbarMenu}>
                            {/* Single navigation tab - content will be provided separately */}
                            <Link href="/zakladki" className={styles.navLink}>
                                Zakładki
                            </Link>

                            {/* Primary action button retained */}
                            <Link
                                href="/zamow-teraz"
                                className={styles.btnPrimary}
                            >
                                Zamów Teraz
                            </Link>
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
                        {/* Single mobile navigation link */}
                        <Link
                            href="/main-tab"
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Main Tab
                        </Link>

                        <Link
                            href="/zakladki"
                            className={styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Zakładki
                        </Link>

                        <div className={styles.mobileCta}>
                            <Link
                                href="/zamow-teraz"
                                className={styles.btnPrimary}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Zamów Teraz
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
