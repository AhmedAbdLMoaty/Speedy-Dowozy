"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./StatisticsSection.module.css";

const StatisticsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [counters, setCounters] = useState({
        clients: 0,
        orders: 0,
        growth: 0,
    });
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    animateCounters();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const animateCounters = () => {
        const targetValues = { clients: 5000, orders: 150000, growth: 85 };
        const duration = 2000;
        const startTime = Date.now();

        const updateCounters = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounters({
                clients: Math.floor(targetValues.clients * progress),
                orders: Math.floor(targetValues.orders * progress),
                growth: Math.floor(targetValues.growth * progress),
            });

            if (progress < 1) {
                requestAnimationFrame(updateCounters);
            }
        };

        requestAnimationFrame(updateCounters);
    };

    const statsData = [
        {
            icon: "👥",
            value: counters.clients,
            suffix: "+",
            label: "Zadowolonych klientów",
            color: "#10b981",
        },
        {
            icon: "📦",
            value: counters.orders,
            suffix: "+",
            label: "Zrealizowanych zamówień",
            color: "#3b82f6",
        },
        {
            icon: "📈",
            value: counters.growth,
            suffix: "%",
            label: "Wzrost rok do roku",
            color: "#f59e0b",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.statisticsSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <h2 className={styles.title}>Statystyki</h2>
                <div className={styles.heroCard}>
                    <div className={styles.heroIcon}>📊</div>
                    <h3 className={styles.heroTitle}>
                        Nasze osiągnięcia w liczbach
                    </h3>{" "}
                    <p className={styles.heroDescription}>
                        Wraz z ubiegiem lat i zdobywanym doświadczeniem Spółka
                        odnotowuje z roku na rok, znaczący wzrost ilości swoich
                        klientów, a co za tym idzie, wzrost zamówień, co
                        przekłada się na większy zysk.
                    </p>
                </div>
                <div className={styles.statsGrid}>
                    {statsData.map((stat, index) => (
                        <div
                            key={index}
                            className={styles.statCard}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div
                                className={styles.statValue}
                                style={{ color: stat.color }}
                            >
                                {stat.value.toLocaleString()}
                                {stat.suffix}
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>{" "}
                <div className={styles.chartPlaceholder}>
                    <div className={styles.chartIcon}>📊</div>
                    <h4>Wykres wzrostu</h4>
                    <p>
                        Tutaj powinien pojawić się wykres z prezentacji
                        pokazujący trend wzrostu firmy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StatisticsSection;
