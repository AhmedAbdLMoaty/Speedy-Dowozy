"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Features.module.css";

const Features = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            icon: "⚡",
            title: "Ekspresowa Dostawa",
            description:
                "Gwarantujemy dostawę w 15 minut dzięki zaawansowanemu systemowi logistycznemu i strategicznie rozmieszczonym punktom",
            type: "emoji",
        },
        {
            icon: "📱",
            title: "Aplikacja Mobilna",
            description:
                "Intuicyjna aplikacja dla klientów, restauracji i kierowców z pełnym systemem zarządzania zamówieniami",
            type: "emoji",
        },
        {
            icon: "🤝",
            title: "Pełne Wsparcie",
            description:
                "Kompleksowe wsparcie biznesowe, marketingowe i techniczne dla wszystkich naszych partnerów",
            type: "emoji",
        },
    ];

    return (
        <section ref={sectionRef} className={styles.featuresSection}>
            <div className="container">
                <div
                    className={`${styles.featuresHeader} ${
                        isVisible ? styles.animateIn : ""
                    }`}
                >
                    <h2 className={styles.sectionTitle}>
                        Dlaczego Speedy Dowozy?
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Nowoczesne rozwiązania dla wszystkich uczestników rynku
                        dostaw
                    </p>

                    <div
                        className={`${styles.speedDemo} ${
                            isVisible ? styles.speedDemoAnimated : ""
                        }`}
                    >
                        <div className={styles.speedTrack}>
                            <div
                                className={`${styles.speedIndicator} ${styles.speedIndicatorSlow}`}
                            >
                                <span>Konkurencja</span>
                                <div className={styles.speedBar}>
                                    <div
                                        className={`${styles.speedFill} ${styles.speedFillSlow}`}
                                    ></div>
                                </div>
                                <span className={styles.speedTime}>
                                    30+ min
                                </span>
                            </div>
                            <div
                                className={`${styles.speedIndicator} ${styles.speedIndicatorFast}`}
                            >
                                <span>Speedy Dowozy</span>
                                <div className={styles.speedBar}>
                                    <div
                                        className={`${styles.speedFill} ${styles.speedFillFast}`}
                                    ></div>
                                </div>
                                <span className={styles.speedTime}>15 min</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.featuresGrid} ${
                        isVisible ? styles.featuresGridAnimated : ""
                    }`}
                >
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            {feature.type === "emoji" ? (
                                <span className={styles.featureIcon}>
                                    {feature.icon}
                                </span>
                            ) : (
                                <div className={styles.iconPulse}>
                                    <span
                                        style={{
                                            color: "white",
                                            fontSize: "24px",
                                        }}
                                    >
                                        {feature.icon}
                                    </span>
                                </div>
                            )}
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
