"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Typography from "../Typography";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<
        string | null
    >(null);
    const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handlePageLoad = () => setActiveMegaMenu(null);
        if (document.readyState === "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
            return () => window.removeEventListener("load", handlePageLoad);
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) setActiveMobileDropdown(null);
    };

    const handleMegaMenuEnter = (menu: string) => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }
        setActiveMegaMenu(menu);
    };

    const handleMegaMenuLeave = () => {
        menuTimeoutRef.current = setTimeout(() => setActiveMegaMenu(null), 100);
    };

    const handleMegaMenuContentEnter = () => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }
    };

    const handleMegaMenuContentLeave = () => setActiveMegaMenu(null);

    const toggleMobileDropdown = (dropdown: string) => {
        setActiveMobileDropdown(
            activeMobileDropdown === dropdown ? null : dropdown
        );
    };

    const closeMobileMenu = () => setIsMenuOpen(false);

    const menuItems = [
        {
            href: "/dostawy/ekspresowa",
            text: "Dostawa Ekspresowa (15 min)",
            color: "pink",
        },
        {
            href: "/dostawy/standardowa",
            text: "Dostawa Standardowa (30-45 min)",
            color: "pink",
        },
        {
            href: "/dostawy/zaplanowana",
            text: "Dostawa Zaplanowana",
            color: "pink",
        },
        { href: "/dostawy/grupowa", text: "Zamówienia Grupowe", color: "pink" },
    ];

    const restaurantItems = [
        { href: "/restauracje/dolacz", text: "Dołącz do Nas", color: "blue" },
        {
            href: "/restauracje/aplikacja",
            text: "Aplikacja dla Restauracji",
            color: "blue",
        },
        {
            href: "/restauracje/marketing",
            text: "Wsparcie Marketingowe",
            color: "blue",
        },
        {
            href: "/restauracje/analytics",
            text: "Analityka Sprzedaży",
            color: "blue",
        },
    ];

    const careerItems = [
        { href: "/kierowcy/dolacz", text: "Zostań Kierowcą", color: "green" },
        {
            href: "/kierowcy/aplikacja",
            text: "Aplikacja dla Kierowców",
            color: "green",
        },
        { href: "/franczyza", text: "Możliwości Franczyzy", color: "green" },
        { href: "/kariera", text: "Inne Oferty Pracy", color: "green" },
    ];

    const trackingItems = [
        {
            href: "/sledzenie",
            text: "Śledź Zamówienie na Żywo",
            color: "purple",
        },
        { href: "/historia", text: "Historia Zamówień", color: "purple" },
        {
            href: "/kalkulator-dostawy",
            text: "Kalkulator Kosztów Dostawy",
            color: "purple",
        },
        {
            href: "/strefy-dostawy",
            text: "Sprawdź Strefy Dostawy",
            color: "purple",
        },
    ];

    const supportItems = [
        {
            href: "/aplikacja-mobilna",
            text: "Pobierz Aplikację",
            color: "orange",
        },
        { href: "/centrum-pomocy", text: "Centrum Pomocy", color: "orange" },
        { href: "/faq", text: "FAQ", color: "orange" },
        { href: "/blog", text: "Blog & Aktualności", color: "orange" },
    ];

    const DropdownIcon = ({ isOpen }: { isOpen: boolean }) => (
        <svg
            className={`${styles.dropdownIcon} ${
                isOpen ? styles.rotate180 : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    const MenuSection = ({
        title,
        iconColor,
        iconPath,
        items,
    }: {
        title: string;
        iconColor: string;
        iconPath: string;
        items: Array<{ href: string; text: string; color: string }>;
    }) => (
        <div className={styles.megaMenuSection}>
            <h3 className={styles.megaMenuTitle}>
                <div
                    className={`${styles.menuIcon} ${
                        styles[
                            `menuIcon${
                                iconColor.charAt(0).toUpperCase() +
                                iconColor.slice(1)
                            }`
                        ]
                    }`}
                >
                    <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={iconPath}
                        />
                    </svg>
                </div>
                {title}
            </h3>
            <div className={styles.megaMenuLinks}>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`${styles.megaMenuLink} ${
                            styles[
                                `text${
                                    item.color.charAt(0).toUpperCase() +
                                    item.color.slice(1)
                                }600`
                            ]
                        }`}
                        prefetch={false}
                    >
                        {item.text}
                    </Link>
                ))}
            </div>
        </div>
    );

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
                            <div
                                className={styles.megaMenuTrigger}
                                onMouseEnter={() =>
                                    handleMegaMenuEnter("services")
                                }
                                onMouseLeave={handleMegaMenuLeave}
                            >
                                <button className={styles.navLink}>
                                    <span>Usługi</span>
                                    <DropdownIcon isOpen={false} />
                                </button>

                                {activeMegaMenu === "services" && (
                                    <div
                                        className={styles.megaMenu}
                                        onMouseEnter={
                                            handleMegaMenuContentEnter
                                        }
                                        onMouseLeave={
                                            handleMegaMenuContentLeave
                                        }
                                    >
                                        <div className={styles.megaMenuGrid}>
                                            <MenuSection
                                                title="Dostawa Jedzenia"
                                                iconColor="pink"
                                                iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                items={menuItems}
                                            />
                                            <MenuSection
                                                title="Dla Restauracji"
                                                iconColor="blue"
                                                iconPath="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                items={restaurantItems}
                                            />
                                            <MenuSection
                                                title="Kariera & Franczyza"
                                                iconColor="green"
                                                iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                items={careerItems}
                                            />
                                        </div>

                                        <div className={styles.megaMenuCta}>
                                            <div>
                                                <h4 className={styles.ctaTitle}>
                                                    Potrzebujesz pomocy?
                                                </h4>
                                                <p
                                                    className={
                                                        styles.ctaSubtitle
                                                    }
                                                >
                                                    Skontaktuj się z naszym
                                                    zespołem wsparcia
                                                </p>
                                            </div>
                                            <Link
                                                href="/kontakt"
                                                className={styles.btnPrimary}
                                            >
                                                Pomoc 24/7
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className={styles.megaMenuTrigger}
                                onMouseEnter={() =>
                                    handleMegaMenuEnter("tools")
                                }
                                onMouseLeave={handleMegaMenuLeave}
                            >
                                <button className={styles.navLink}>
                                    <span>Narzędzia</span>
                                    <DropdownIcon isOpen={false} />
                                </button>

                                {activeMegaMenu === "tools" && (
                                    <div
                                        className={`${styles.megaMenu} ${styles.megaMenuTools}`}
                                        onMouseEnter={
                                            handleMegaMenuContentEnter
                                        }
                                        onMouseLeave={
                                            handleMegaMenuContentLeave
                                        }
                                    >
                                        <div className={styles.megaMenuGrid2}>
                                            <MenuSection
                                                title="Śledzenie Zamówień"
                                                iconColor="purple"
                                                iconPath="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                                items={trackingItems}
                                            />
                                            <MenuSection
                                                title="Aplikacje & Wsparcie"
                                                iconColor="orange"
                                                iconPath="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                items={supportItems}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/restauracje"
                                className={styles.navLink}
                            >
                                Restauracje
                            </Link>
                            <Link href="/o-nas" className={styles.navLink}>
                                O Nas
                            </Link>
                            <Link href="/kontakt" className={styles.navLink}>
                                Kontakt
                            </Link>
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
                        <div className={styles.mobileDropdown}>
                            <button
                                onClick={() => toggleMobileDropdown("services")}
                                className={styles.mobileDropdownTrigger}
                            >
                                <span>Usługi Dostawy</span>
                                <DropdownIcon
                                    isOpen={activeMobileDropdown === "services"}
                                />
                            </button>

                            {activeMobileDropdown === "services" && (
                                <div className={styles.mobileDropdownContent}>
                                    <Link
                                        href="/dostawy/ekspresowa"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Dostawa Ekspresowa
                                    </Link>
                                    <Link
                                        href="/dostawy/standardowa"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Dostawa Standardowa
                                    </Link>
                                    <Link
                                        href="/restauracje/dolacz"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Dla Restauracji
                                    </Link>
                                    <Link
                                        href="/kierowcy/dolacz"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Zostań Kierowcą
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className={styles.mobileDropdown}>
                            <button
                                onClick={() => toggleMobileDropdown("tools")}
                                className={styles.mobileDropdownTrigger}
                            >
                                <span>Narzędzia</span>
                                <DropdownIcon
                                    isOpen={activeMobileDropdown === "tools"}
                                />
                            </button>

                            {activeMobileDropdown === "tools" && (
                                <div className={styles.mobileDropdownContent}>
                                    <Link
                                        href="/sledzenie"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Śledź Zamówienie
                                    </Link>
                                    <Link
                                        href="/aplikacja-mobilna"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Pobierz Aplikację
                                    </Link>
                                    <Link
                                        href="/centrum-pomocy"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        Centrum Pomocy
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className={styles.mobileDropdownLink}
                                        onClick={closeMobileMenu}
                                        prefetch={false}
                                    >
                                        FAQ
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/restauracje"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            Restauracje
                        </Link>
                        <Link
                            href="/o-nas"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            O Nas
                        </Link>
                        <Link
                            href="/kontakt"
                            className={styles.mobileNavLink}
                            onClick={closeMobileMenu}
                        >
                            Kontakt
                        </Link>

                        <div className={styles.mobileCta}>
                            <Link
                                href="/zamow-teraz"
                                className={styles.btnPrimary}
                                onClick={closeMobileMenu}
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
