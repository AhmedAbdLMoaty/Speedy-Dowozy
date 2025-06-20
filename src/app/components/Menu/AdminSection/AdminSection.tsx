"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AdminSection.module.css";

const AdminSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const adminFeatures = [
        {
            icon: "🎛️",
            title: "Pełna kontrola",
            description:
                "Działanie strony administratora opiera się na pełnej kontroli i zarządzaniu pracy gastrokurierów oraz restauracji",
        },
        {
            icon: "➕",
            title: "Zarządzanie zasobami",
            description:
                "Strona umożliwia dodawanie oraz usuwanie restauracji i kurierów, a także pozwala na pełną kontrolę nad nimi",
        },
        {
            icon: "📊",
            title: "Raporty i analityka",
            description:
                "Na stronie generowane są raporty dzienne i miesięczne, a także dostępne są liczne inne przydatne funkcje",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.adminSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <h2 className={styles.title}>Strona administratora</h2>
                <div className={styles.heroCard}>
                    <div className={styles.heroIcon}>👨‍💻</div>
                    <h3 className={styles.heroTitle}>Panel zarządzania</h3>
                    <p className={styles.heroDescription}>
                        Zaawansowany system zarządzania całą platformą Speedy
                        Dowozy - od kontroli kurierów po analizę wydajności.
                    </p>
                </div>{" "}
                <div className={styles.featuresGrid}>
                    {adminFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={styles.featureCard}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.featureIcon}>
                                {feature.icon}
                            </div>
                            <h4 className={styles.featureTitle}>
                                {feature.title}
                            </h4>
                            <p className={styles.featureDescription}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminSection;
