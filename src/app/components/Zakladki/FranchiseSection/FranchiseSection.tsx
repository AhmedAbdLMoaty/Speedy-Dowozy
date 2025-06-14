"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./FranchiseSection.module.css";

interface ProfitItem {
    icon: string;
    title: string;
    description: string;
    highlight: string;
}

const FranchiseSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
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

    const profitData: ProfitItem[] = [
        {
            icon: "💰",
            title: "15 dostaw dziennie",
            description: "15 dostaw x 10 lokali = 450 zł dziennie (3 zł za kurs)",
            highlight: "450 zł/dzień"
        },
        {
            icon: "💎",
            title: "20 kursów dziennie",
            description: "20 kursów x 10 lokali = 600 zł dziennie",
            highlight: "600 zł/dzień"
        },
        {
            icon: "📈",
            title: "Miesięczne zyski",
            description: "Zarabiasz w przedziale od 3-20 tys PLN",
            highlight: "3-20k PLN"
        },
        {
            icon: "🔥",
            title: "Bez limitu",
            description: "Nie ma górnej granicy na zysk",
            highlight: "Bez granic"
        },
        {
            icon: "🌐",
            title: "Portal online",
            description: "2% od każdej transakcji dla franczyzobiorcy",
            highlight: "2% prowizji"
        }
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.franchiseSection} ${isVisible ? styles.visible : ""}`}
        >
            <div className="container">
                <h2 className={styles.title}>Franczyza</h2>

                <div className={styles.heroCard}>
                    <div className={styles.heroIcon}>🏢</div>
                    <h3 className={styles.heroTitle}>
                        Zostań partnerem naszej sieci dostaw jedzenia!
                    </h3>
                    <p className={styles.heroDescription}>
                        Szukasz dochodowego pomysłu na biznes z niskim progiem
                        wejścia i dużym potencjałem zysku? Dołącz do naszej
                        sieci franczyzowej i rozwijaj lokalny rynek dowozów
                        jedzenia przy wsparciu nowoczesnej aplikacji mobilnej!
                    </p>
                </div>

                <div className={styles.mediaSection}>
                    <div className={styles.videoPlaceholder}>
                        <div className={styles.videoIcon}>🎬</div>
                        <h4>Filmik franczyzowy</h4>
                        <p>
                            Tutaj zostanie umieszczony filmik prezentujący
                            możliwości franczyzy
                        </p>
                    </div>

                    <div className={styles.contactForm}>
                        <div className={styles.formIcon}>📋</div>
                        <h4>Formularz kontaktowy</h4>
                        <p>
                            Skontaktuj się z nami, aby otrzymać szczegółową
                            ofertę franczyzową
                        </p>
                        <button className={styles.contactButton}>
                            Skontaktuj się z nami
                        </button>
                    </div>
                </div>

                <div className={styles.profitGrid}>
                    {profitData.map((profit, index) => (
                        <div
                            key={index}
                            className={styles.profitCard}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={styles.profitIcon}>{profit.icon}</div>
                            <h4 className={styles.profitTitle}>{profit.title}</h4>
                            <p className={styles.profitDescription}>
                                {profit.description}
                            </p>
                            <div className={styles.profitHighlight}>
                                {profit.highlight}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.rollupSection}>
                    <div className={styles.rollupIcon}>📊</div>
                    <h3>Rollup: Rozwój i ekspansja</h3>
                    <p>
                        System rollup pozwala na strategiczny rozwój sieci
                        franczyzowej z wykorzystaniem najnowszych technologii i
                        sprawdzonych rozwiązań biznesowych.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FranchiseSection;
