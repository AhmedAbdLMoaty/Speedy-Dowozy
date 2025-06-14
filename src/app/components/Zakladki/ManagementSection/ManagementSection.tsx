"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ManagementSection.module.css";

const ManagementSection = () => {
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

    const managers = [
        { name: "Łukasz Grodzicki", location: "Ostrowiec Świętokrzyski" },
        { name: "Rafał Abramczyk", location: "Starachowice" },
        { name: "Karolina Frąk", location: "Kielce" },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.managementSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <h2 className={styles.title}>Kadra zarządzająca</h2>

                <div className={styles.ceoCard}>
                    <div className={styles.ceoIcon}>👨‍💼</div>
                    <h3 className={styles.ceoName}>
                        Marcin Czuba - Prezes Zarządu
                    </h3>
                    <p className={styles.ceoDescription}>
                        Jest założycielem i prezesem firmy Speedy Dowozy, której
                        powstanie zainicjował w 2019r. Z pasją do gastronomii
                        oraz dostaw, postanowił stworzyć platformę, która ułatwi
                        klientom dostęp do ich ulubionych dań z lokalnych
                        restauracji. Pod jego przewodnictwem, firma odnotowała
                        znaczący wzrost zamówień wśród klientów restauracji.
                    </p>
                </div>

                <div className={styles.managersGrid}>
                    <h3 className={styles.managersTitle}>Menadżerowie</h3>
                    {managers.map((manager, index) => (
                        <div
                            key={index}
                            className={styles.managerCard}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.managerIcon}>🎯</div>
                            <h4 className={styles.managerName}>
                                {manager.name}
                            </h4>
                            <p className={styles.managerLocation}>
                                {manager.location}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagementSection;
