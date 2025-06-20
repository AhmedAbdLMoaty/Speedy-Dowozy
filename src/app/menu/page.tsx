"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import AboutSection from "../components/Menu/AboutSection/AboutSection";
import LocationsSection from "../components/Menu/LocationsSection/LocationsSection";
import ManagementSection from "../components/Menu/ManagementSection/ManagementSection";
import TeamSection from "../components/Menu/TeamSection/TeamSection";
import AppSection from "../components/Menu/AppSection/AppSection";
import AdminSection from "../components/Menu/AdminSection/AdminSection";
import StatisticsSection from "../components/Menu/StatisticsSection/StatisticsSection";
import FranchiseSection from "../components/Menu/FranchiseSection/FranchiseSection";

const MenuPage = () => {
    const [activeSection, setActiveSection] = useState("kim-jestesmy");
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

    const sections = [
        { id: "kim-jestesmy", title: "Kim jesteśmy?", component: AboutSection },
        {
            id: "gdzie-dzialamy",
            title: "Gdzie działamy?",
            component: LocationsSection,
        },
        {
            id: "kadra",
            title: "Kadra zarządzająca",
            component: ManagementSection,
        },
        { id: "zespol", title: "Zespół Speedy", component: TeamSection },
        { id: "aplikacja", title: "Aplikacja Speedy", component: AppSection },
        {
            id: "administrator",
            title: "Strona administratora",
            component: AdminSection,
        },
        { id: "statystyki", title: "Statystyki", component: StatisticsSection },
        { id: "franczyza", title: "Franczyza", component: FranchiseSection },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        );

        Object.values(sectionsRef.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = sectionsRef.current[sectionId];
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    return (
        <div className={styles.menuPage}>
            <nav className={styles.stickyNav}>
                <div className={styles.navContainer}>
                    <h1 className={styles.pageTitle}>Menu</h1>
                    <div className={styles.navTabs}>
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                className={`${styles.navTab} ${
                                    activeSection === section.id
                                        ? styles.active
                                        : ""
                                }`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {section.title}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className={styles.mainContent}>
                {sections.map((section) => {
                    const Component = section.component;
                    return (
                        <section
                            key={section.id}
                            id={section.id}
                            ref={(el) => {
                                sectionsRef.current[section.id] = el;
                            }}
                            className={styles.contentSection}
                        >
                            <Component />
                        </section>
                    );
                })}
            </main>
        </div>
    );
};

export default MenuPage;
