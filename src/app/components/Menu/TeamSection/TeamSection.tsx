"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./TeamSection.module.css";
import Link from "next/link";

const TeamSection = () => {
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

    const teamFeatures = [
        {
            icon: "⚡",
            title: "Błyskawiczna dostawa",
            description:
                "Kurier działa błyskawicznie, dostarczając świeże jedzenie w ekspresowym tempie",
        },
        {
            icon: "📞",
            title: "Stały kontakt",
            description:
                "Zawsze utrzymują kontakt z klientem, informując o statusie zamówienia",
        },
        {
            icon: "🎯",
            title: "Dostosowanie do potrzeb",
            description: "Zespół kurierów dostosowuje się do potrzeb klientów",
        },
        {
            icon: "❤️",
            title: "Serce firmy",
            description:
                "Gastro-kurierzy to serce naszej firmy - dzięki ich zaangażowaniu każdy posiłek dociera na czas",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.teamSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <h2 className={styles.title}>Zespół Speedy</h2>

                <div className={styles.heroCard}>
                    <div className={styles.heroIcon}>🚗</div>
                    <h3 className={styles.heroTitle}>Gastro – kurierzy</h3>
                    <p className={styles.heroDescription}>
                        To oni są kluczowym elementem usługi dostawy jedzenia,
                        łączący lokalne restauracje z naszymi klientami.
                    </p>
                </div>

                <div className={styles.featuresGrid}>
                    {teamFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={styles.featureCard}
                            style={{ animationDelay: `${index * 0.15}s` }}
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

                <div className={styles.conclusionCard}>
                    <h3>🌟 Profesjonalizm i pasja</h3>
                    <p>
                        Dzięki ich zaangażowaniu, profesjonalizmowi i pasji,
                        każdy posiłek dostarczony jest na czas, a klienci zawsze
                        wracają po więcej!
                    </p>
                    <Link href="/contact" className={styles.contactUsButton}>
                        Skontaktuj się z nami
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
