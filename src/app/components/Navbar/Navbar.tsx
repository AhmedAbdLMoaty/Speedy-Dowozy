"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./Navbar.css";

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
            className={`dropdown-icon ${isOpen ? "rotate-180" : ""}`}
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
        <div className="mega-menu-section">
            <h3 className="mega-menu-title">
                <div className={`menu-icon menu-icon-${iconColor}`}>
                    <svg
                        className="icon"
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
            <div className="mega-menu-links">
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`mega-menu-link text-${item.color}-600`}
                    >
                        {item.text}
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-logo">
                        <Link href="/" className="logo-link">
                            <Image
                                src="/images/naklejka speedey tu dowozi.jpg"
                                alt="Speedy Dowozy Logo"
                                width={40}
                                height={40}
                                className="logo-image"
                                priority
                            />
                            <span className="logo-text">Speedy Dowozy</span>
                        </Link>
                    </div>

                    <div className="navbar-desktop">
                        <div className="navbar-menu">
                            <div
                                className="mega-menu-trigger"
                                onMouseEnter={() =>
                                    handleMegaMenuEnter("services")
                                }
                                onMouseLeave={handleMegaMenuLeave}
                            >
                                <button className="nav-link">
                                    <span>Usługi</span>
                                    <DropdownIcon isOpen={false} />
                                </button>

                                {activeMegaMenu === "services" && (
                                    <div
                                        className="mega-menu"
                                        onMouseEnter={
                                            handleMegaMenuContentEnter
                                        }
                                        onMouseLeave={
                                            handleMegaMenuContentLeave
                                        }
                                    >
                                        <div className="mega-menu-grid">
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

                                        <div className="mega-menu-cta">
                                            <div>
                                                <h4 className="cta-title">
                                                    Potrzebujesz pomocy?
                                                </h4>
                                                <p className="cta-subtitle">
                                                    Skontaktuj się z naszym
                                                    zespołem wsparcia
                                                </p>
                                            </div>
                                            <Link
                                                href="/kontakt"
                                                className="btn-primary"
                                            >
                                                Pomoc 24/7
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div
                                className="mega-menu-trigger"
                                onMouseEnter={() =>
                                    handleMegaMenuEnter("tools")
                                }
                                onMouseLeave={handleMegaMenuLeave}
                            >
                                <button className="nav-link">
                                    <span>Narzędzia</span>
                                    <DropdownIcon isOpen={false} />
                                </button>

                                {activeMegaMenu === "tools" && (
                                    <div
                                        className="mega-menu mega-menu-tools"
                                        onMouseEnter={
                                            handleMegaMenuContentEnter
                                        }
                                        onMouseLeave={
                                            handleMegaMenuContentLeave
                                        }
                                    >
                                        <div className="mega-menu-grid-2">
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

                            <Link href="/restauracje" className="nav-link">
                                Restauracje
                            </Link>
                            <Link href="/o-nas" className="nav-link">
                                O Nas
                            </Link>
                            <Link href="/kontakt" className="nav-link">
                                Kontakt
                            </Link>
                            <Link href="/zamow-teraz" className="btn-primary">
                                Zamów Teraz
                            </Link>
                        </div>
                    </div>

                    <div className="mobile-menu-button">
                        <button
                            onClick={toggleMenu}
                            className="menu-toggle"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className={`menu-icon ${
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

                <div
                    className={`mobile-menu ${
                        isMenuOpen ? "mobile-menu-open" : ""
                    }`}
                >
                    <div className="mobile-menu-content">
                        <div className="mobile-dropdown">
                            <button
                                onClick={() => toggleMobileDropdown("services")}
                                className="mobile-dropdown-trigger"
                            >
                                <span>Usługi Dostawy</span>
                                <DropdownIcon
                                    isOpen={activeMobileDropdown === "services"}
                                />
                            </button>

                            {activeMobileDropdown === "services" && (
                                <div className="mobile-dropdown-content">
                                    <Link
                                        href="/dostawy/ekspresowa"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Dostawa Ekspresowa
                                    </Link>
                                    <Link
                                        href="/dostawy/standardowa"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Dostawa Standardowa
                                    </Link>
                                    <Link
                                        href="/restauracje/dolacz"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Dla Restauracji
                                    </Link>
                                    <Link
                                        href="/kierowcy/dolacz"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Zostań Kierowcą
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="mobile-dropdown">
                            <button
                                onClick={() => toggleMobileDropdown("tools")}
                                className="mobile-dropdown-trigger"
                            >
                                <span>Narzędzia</span>
                                <DropdownIcon
                                    isOpen={activeMobileDropdown === "tools"}
                                />
                            </button>

                            {activeMobileDropdown === "tools" && (
                                <div className="mobile-dropdown-content">
                                    <Link
                                        href="/sledzenie"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Śledź Zamówienie
                                    </Link>
                                    <Link
                                        href="/aplikacja-mobilna"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Pobierz Aplikację
                                    </Link>
                                    <Link
                                        href="/centrum-pomocy"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        Centrum Pomocy
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className="mobile-dropdown-link"
                                        onClick={closeMobileMenu}
                                    >
                                        FAQ
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/restauracje"
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                        >
                            Restauracje
                        </Link>
                        <Link
                            href="/o-nas"
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                        >
                            O Nas
                        </Link>
                        <Link
                            href="/kontakt"
                            className="mobile-nav-link"
                            onClick={closeMobileMenu}
                        >
                            Kontakt
                        </Link>

                        <div className="mobile-cta">
                            <Link
                                href="/zamow-teraz"
                                className="btn-primary"
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
