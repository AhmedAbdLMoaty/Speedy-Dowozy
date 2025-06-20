"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./LocationsSection.module.css";

const LocationsSection = () => {
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
    }, []);    const cities = [
        {
            name: "Ostrowiec Świętokrzyski",
            icon: "�",
            description: "Główny adres - Centrala firmy",
        },
        {
            name: "Kielce",
            icon: "�",
            description: "Oddział regionalny",
        },
        {
            name: "Starachowice",
            icon: "🏘️",
            description: "Lokalny hub gastronomiczny",
        },
        {
            name: "Świdnica",
            icon: "🌆",
            description: "Nowy obszar działalności",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.locationsSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Gdzie działamy?</h2>
                    <p className={styles.subtitle}>
                        Nasza sieć dostaw obejmuje kluczowe miasta województwa
                        świętokrzyskiego
                    </p>
                </div>

                <div className={styles.mapContainer}>
                    <div className={styles.citiesGrid}>
                        {cities.map((city, index) => (
                            <div
                                key={index}
                                className={styles.cityCard}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={styles.cityIcon}>
                                    {city.icon}
                                </div>
                                <h3 className={styles.cityName}>{city.name}</h3>
                                <p className={styles.cityDescription}>
                                    {city.description}
                                </p>
                                <div className={styles.activeIndicator}>
                                    <span className={styles.pulse}></span>
                                    Aktywne
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.expansionInfo}>
                    <div className={styles.expansionCard}>
                        <h3>📈 Plany rozwoju</h3>
                        <p>
                            Systematycznie rozszerzamy naszą działalność o nowe
                            miasta i regiony Polski
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationsSection;
