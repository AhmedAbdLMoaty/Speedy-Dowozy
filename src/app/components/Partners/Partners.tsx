"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Partners.module.css";

const Partners = () => {
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

    const partnerTypes = [
        {
            icon: "🍕",
            title: "Restauracje",
            description: "Dołącz do naszej sieci i zwiększ swoje zyski",
            features: [
                "0% prowizji przez 3 miesiące",
                "Darmowy marketing",
                "Wsparcie 24/7",
            ],
            color: "Blue",
            buttonText: "Dołącz Teraz",
        },
        {
            icon: "🚗",
            title: "Kierowcy",
            description:
                "Zarabiaj dostarczając jedzenie w elastycznych godzinach",
            features: ["Elastyczne godziny", "Dobre zarobki", "Ubezpieczenie"],
            color: "Green",
            buttonText: "Zostań Kierowcą",
        },
        {
            icon: "🏢",
            title: "Franczyza",
            description:
                "Rozwijaj własny biznes z sprawdzonym modelem franczyzowym",
            features: ["Sprawdzony model", "Pełne szkolenie", "Marketing i IT"],
            color: "Purple",
            buttonText: "Dowiedz Się Więcej",
        },
    ];

    return (
        <section ref={sectionRef} className={styles.partnersSection}>
            <div className="container">
                <div
                    className={`${styles.partnersHeader} ${
                        isVisible ? styles.animateIn : ""
                    }`}
                >
                    <h2 className={styles.sectionTitle}>
                        Dołącz do Naszej Sieci
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Zostań częścią największej sieci dostaw w Polsce
                    </p>
                </div>

                <div className={styles.partnersGrid}>
                    {partnerTypes.map((partner, index) => (
                        <div
                            key={index}
                            className={`${styles.partnerCard} ${
                                styles[`partner${partner.color}`]
                            } ${isVisible ? styles.animateIn : ""}`}
                        >
                            <div className={styles.partnerIcon}>
                                <span className={styles.iconEmoji}>
                                    {partner.icon}
                                </span>
                            </div>
                            <h3 className={styles.partnerTitle}>
                                {partner.title}
                            </h3>
                            <p className={styles.partnerDescription}>
                                {partner.description}
                            </p>

                            <ul className={styles.partnerFeatures}>
                                {partner.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className={styles.partnerFeature}
                                    >
                                        <span className={styles.featureCheck}>
                                            ✓
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`${styles.partnerBtn} ${
                                    styles[`btn${partner.color}`]
                                }`}
                            >
                                {partner.buttonText}
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
