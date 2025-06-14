"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AppSection.module.css";

const AppSection = () => {
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

    const appFeatures = [
        {
            icon: "📍",
            title: "Szczegóły lokalizacji",
            description:
                "Adres klienta, numer telefonu oraz szczegóły dotyczące lokalizacji, np. numer klatki, piętro, czy miejsce pracy lub szkołę",
        },
        {
            icon: "⏰",
            title: "Czas odbioru",
            description:
                "Restauracja z góry określa czas odbioru zamówienia, z możliwością edytowania do momentu przyjazdu kuriera",
        },
        {
            icon: "✏️",
            title: "Edycja zamówienia",
            description:
                "Obsługa ma możliwość edytowania zamówienia lub jego usunięcia w przypadku rezygnacji klienta",
        },
        {
            icon: "🚗",
            title: "Realizacja kuriera",
            description:
                "Zamówienie trafia do gastro kuriera, który realizuje je w ustalonym czasie, zgodnie z wymogami restauracji",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.appSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <h2 className={styles.title}>Aplikacja Speedy</h2>

                <div className={styles.heroCard}>
                    <div className={styles.heroIcon}>📱</div>
                    <h3 className={styles.heroTitle}>
                        Główne narzędzie dla restauracji
                    </h3>
                    <p className={styles.heroDescription}>
                        Naszym głównym narzędziem jest aplikacja mobilna, która
                        umożliwia restauracjom zamawianie Gastro Kuriera. Po
                        otrzymaniu szczegółów zamówienia od klienta, restauracja
                        wprowadza dane do aplikacji.
                    </p>
                </div>

                <div className={styles.featuresGrid}>
                    {appFeatures.map((feature, index) => (
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

                <div className={styles.processCard}>
                    <h3>🔄 Proces zamówienia</h3>
                    <div className={styles.processSteps}>
                        <div className={styles.processStep}>
                            <span className={styles.stepNumber}>1</span>
                            <p>Klient składa zamówienie w restauracji</p>
                        </div>
                        <div className={styles.processStep}>
                            <span className={styles.stepNumber}>2</span>
                            <p>Restauracja wprowadza dane do aplikacji</p>
                        </div>
                        <div className={styles.processStep}>
                            <span className={styles.stepNumber}>3</span>
                            <p>Kurier otrzymuje zlecenie i realizuje dostawę</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppSection;
