"use client";

import { useState, useRef } from "react";
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            setActiveMobileDropdown(null);
        }
    };

    const handleMegaMenuEnter = (menu: string) => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }
        setActiveMegaMenu(menu);
    };

    const handleMegaMenuLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
            setActiveMegaMenu(null);
        }, 150);
    };

    const handleMegaMenuContentEnter = () => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }
    };

    const handleMegaMenuContentLeave = () => {
        setActiveMegaMenu(null);
    };

    const toggleMobileDropdown = (dropdown: string) => {
        setActiveMobileDropdown(
            activeMobileDropdown === dropdown ? null : dropdown
        );
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-content">
                    <div className="navbar-logo">
                        <Link href="/" className="logo-link">
                            <Image
                                src="/images/speedy dowozy różowe logo.jpg"
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
                                    <svg
                                        className="dropdown-icon"
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
                                            <div className="mega-menu-section">
                                                <h3 className="mega-menu-title">
                                                    <div className="menu-icon menu-icon-pink">
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
                                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    Dostawa Jedzenia
                                                </h3>
                                                <div className="mega-menu-links">
                                                    <Link
                                                        href="/dostawy/ekspresowa"
                                                        className="mega-menu-link text-pink-600"
                                                    >
                                                        Dostawa Ekspresowa (30
                                                        min)
                                                    </Link>
                                                    <Link
                                                        href="/dostawy/standardowa"
                                                        className="mega-menu-link text-pink-600"
                                                    >
                                                        Dostawa Standardowa
                                                        (45-60 min)
                                                    </Link>
                                                    <Link
                                                        href="/dostawy/zaplanowana"
                                                        className="mega-menu-link text-pink-600"
                                                    >
                                                        Dostawa Zaplanowana
                                                    </Link>
                                                    <Link
                                                        href="/dostawy/grupowa"
                                                        className="mega-menu-link text-pink-600"
                                                    >
                                                        Zamówienia Grupowe
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mega-menu-section">
                                                <h3 className="mega-menu-title">
                                                    <div className="menu-icon menu-icon-blue">
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
                                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                            />
                                                        </svg>
                                                    </div>
                                                    Dla Restauracji
                                                </h3>
                                                <div className="mega-menu-links">
                                                    <Link
                                                        href="/restauracje/dolacz"
                                                        className="mega-menu-link text-blue-600"
                                                    >
                                                        Dołącz do Nas
                                                    </Link>
                                                    <Link
                                                        href="/restauracje/aplikacja"
                                                        className="mega-menu-link text-blue-600"
                                                    >
                                                        Aplikacja dla
                                                        Restauracji
                                                    </Link>
                                                    <Link
                                                        href="/restauracje/marketing"
                                                        className="mega-menu-link text-blue-600"
                                                    >
                                                        Wsparcie Marketingowe
                                                    </Link>
                                                    <Link
                                                        href="/restauracje/analytics"
                                                        className="mega-menu-link text-blue-600"
                                                    >
                                                        Analityka Sprzedaży
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mega-menu-section">
                                                <h3 className="mega-menu-title">
                                                    <div className="menu-icon menu-icon-green">
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
                                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    Kariera & Franczyza
                                                </h3>
                                                <div className="mega-menu-links">
                                                    <Link
                                                        href="/kierowcy/dolacz"
                                                        className="mega-menu-link text-green-600"
                                                    >
                                                        Zostań Kierowcą
                                                    </Link>
                                                    <Link
                                                        href="/kierowcy/aplikacja"
                                                        className="mega-menu-link text-green-600"
                                                    >
                                                        Aplikacja dla Kierowców
                                                    </Link>
                                                    <Link
                                                        href="/franczyza"
                                                        className="mega-menu-link text-green-600"
                                                    >
                                                        Możliwości Franczyzy
                                                    </Link>
                                                    <Link
                                                        href="/kariera"
                                                        className="mega-menu-link text-green-600"
                                                    >
                                                        Inne Oferty Pracy
                                                    </Link>
                                                </div>
                                            </div>
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
                                    <svg
                                        className="dropdown-icon"
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
                                            <div className="mega-menu-section">
                                                <h3 className="mega-menu-title">
                                                    <div className="menu-icon menu-icon-purple">
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
                                                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                                            />
                                                        </svg>
                                                    </div>
                                                    Śledzenie Zamówień
                                                </h3>
                                                <div className="mega-menu-links">
                                                    <Link
                                                        href="/sledzenie"
                                                        className="mega-menu-link text-purple-600"
                                                    >
                                                        Śledź Zamówienie na Żywo
                                                    </Link>
                                                    <Link
                                                        href="/historia"
                                                        className="mega-menu-link text-purple-600"
                                                    >
                                                        Historia Zamówień
                                                    </Link>
                                                    <Link
                                                        href="/kalkulator-dostawy"
                                                        className="mega-menu-link text-purple-600"
                                                    >
                                                        Kalkulator Kosztów
                                                        Dostawy
                                                    </Link>
                                                    <Link
                                                        href="/strefy-dostawy"
                                                        className="mega-menu-link text-purple-600"
                                                    >
                                                        Sprawdź Strefy Dostawy
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="mega-menu-section">
                                                <h3 className="mega-menu-title">
                                                    <div className="menu-icon menu-icon-orange">
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
                                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    Aplikacje & Wsparcie
                                                </h3>
                                                <div className="mega-menu-links">
                                                    <Link
                                                        href="/aplikacja-mobilna"
                                                        className="mega-menu-link text-orange-600"
                                                    >
                                                        Pobierz Aplikację
                                                    </Link>
                                                    <Link
                                                        href="/centrum-pomocy"
                                                        className="mega-menu-link text-orange-600"
                                                    >
                                                        Centrum Pomocy
                                                    </Link>
                                                    <Link
                                                        href="/faq"
                                                        className="mega-menu-link text-orange-600"
                                                    >
                                                        FAQ
                                                    </Link>
                                                    <Link
                                                        href="/blog"
                                                        className="mega-menu-link text-orange-600"
                                                    >
                                                        Blog & Aktualności
                                                    </Link>
                                                </div>
                                            </div>
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
                                <svg
                                    className={`dropdown-icon ${
                                        activeMobileDropdown === "services"
                                            ? "rotate-180"
                                            : ""
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
                            </button>

                            {activeMobileDropdown === "services" && (
                                <div className="mobile-dropdown-content">
                                    <Link
                                        href="/dostawy/ekspresowa"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dostawa Ekspresowa
                                    </Link>
                                    <Link
                                        href="/dostawy/standardowa"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dostawa Standardowa
                                    </Link>
                                    <Link
                                        href="/restauracje/dolacz"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dla Restauracji
                                    </Link>
                                    <Link
                                        href="/kierowcy/dolacz"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
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
                                <svg
                                    className={`dropdown-icon ${
                                        activeMobileDropdown === "tools"
                                            ? "rotate-180"
                                            : ""
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
                            </button>

                            {activeMobileDropdown === "tools" && (
                                <div className="mobile-dropdown-content">
                                    <Link
                                        href="/sledzenie"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Śledź Zamówienie
                                    </Link>
                                    <Link
                                        href="/aplikacja-mobilna"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Pobierz Aplikację
                                    </Link>
                                    <Link
                                        href="/centrum-pomocy"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Centrum Pomocy
                                    </Link>
                                    <Link
                                        href="/faq"
                                        className="mobile-dropdown-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        FAQ
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/restauracje"
                            className="mobile-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Restauracje
                        </Link>
                        <Link
                            href="/o-nas"
                            className="mobile-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            O Nas
                        </Link>
                        <Link
                            href="/kontakt"
                            className="mobile-nav-link"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Kontakt
                        </Link>

                        <div className="mobile-cta">
                            <Link
                                href="/zamow-teraz"
                                className="btn-primary"
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
