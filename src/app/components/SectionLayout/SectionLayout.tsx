"use client";

import { ReactNode } from "react";
import Link from "next/link";
import styles from "./layout.module.css";

interface SectionLayoutProps {
    children: ReactNode;
    title: string;
    sectionId: string;
}

export default function SectionLayout({
    children,
    title,
    sectionId,
}: SectionLayoutProps) {
    const sections = [
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

    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
    const nextSection =
        currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

    return (
        <div className={styles.sectionPage}>
            {" "}
            <div className={styles.breadcrumb}>
                <Link href="/menu" className={styles.breadcrumbLink}>
                    Całe Menu
                </Link>
                <span className={styles.breadcrumbSeparator}>›</span>
                <span className={styles.breadcrumbCurrent}>{title}</span>
            </div>
            <div className={styles.container}>{children}</div>
            <div className={styles.navigation}>
                {prevSection && (
                    <Link href={prevSection.path} className={styles.navButton}>
                        <span className={styles.navArrow}>‹</span>
                        <span className={styles.navText}>
                            <span className={styles.navLabel}>Poprzedni</span>
                            <span className={styles.navTitle}>
                                {prevSection.title}
                            </span>
                        </span>
                    </Link>
                )}{" "}
                <Link href="/menu" className={styles.allSectionsButton}>
                    Całe Menu
                </Link>
                {nextSection && (
                    <Link href={nextSection.path} className={styles.navButton}>
                        <span className={styles.navText}>
                            <span className={styles.navLabel}>Następny</span>
                            <span className={styles.navTitle}>
                                {nextSection.title}
                            </span>
                        </span>
                        <span className={styles.navArrow}>›</span>
                    </Link>
                )}
            </div>
        </div>
    );
}
