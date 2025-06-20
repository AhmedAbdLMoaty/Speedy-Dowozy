"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AboutSection.module.css";

const AboutSection = () => {
    const [isVisible, setIsVisible] = useState(true);
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

    const features = [
        {
            icon: "📱",
            title: "Aplikacja mobilna",
            description:
                "Doskonałe narzędzie do obsługi restauracji - zamawianie gastrokuriera staje się łatwe, proste i przyjemne.",
        },
        {
            icon: "👥",
            title: "Najwyższa obsługa",
            description:
                "Aplikacja sprawia że obsługa klienta odbywa się na najwyższym poziomie.",
        },
        {
            icon: "🚗",
            title: "Zaufani kierowcy",
            description:
                "Wspaniała kadra doświadczonych kierowców to osoby godne zaufania.",
        },
        {
            icon: "🏆",
            title: "Lider branży",
            description:
                "Jesteśmy liderem w branży dostaw na terenie województwa świętokrzyskiego.",
        },
    ];

    const offerings = [
        "Dostawa jedzenia z lokalnych restauracji prosto pod drzwi Klienta",
        "Różnorodność kuchni: polska, włoska, azjatycka, wegetariańska i wiele innych",
        "Opcje dostawy ekspresowej",
    ];

    const missions = [
        "Otworzyć placówki w innych miastach",
        "Wozić posiłki dla wszystkich restauracji oraz punktów gastronomicznych w całej Polsce",
        "Rozszerzyć działalność o dostawy międzymiastowe, ekspresowe przesyłki kurierskie od firm oraz Klientów indywidualnych",
        "Funkcjonalność aplikacji mobilnej pozwala na zamówienie wszelkiego rodzaju przesyłek",
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.aboutSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                {" "}
                <div className={styles.heroIntro}>
                    {" "}
                    <h2 className={styles.mainTitle}>Kim jesteśmy?</h2>
                    <p className={styles.introText}>
                        Speedy Dowozy to firma, która zajmuje się dowozem
                        wszelkiego rodzaju posiłków serwowanych przez
                        restauracje oraz punkty gastronomiczne.
                    </p>
                </div>
                <div className={styles.videoSection}>
                    <div className={styles.videoContainer}>
                        <video
                            className={styles.speedyVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/videos/video0.mp4" type="video/mp4" />
                            Twoja przeglądarka nie obsługuje odtwarzania wideo.
                        </video>
                        <div className={styles.videoOverlay}>
                            <h3 className={styles.videoTitle}>
                                Szybkość to nasza pasja
                            </h3>
                            <p className={styles.videoSubtitle}>
                                Zobacz jak działamy - zawsze na czas, zawsze
                                profesjonalnie
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={styles.featureCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.featureIcon}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.featureTitle}>
                                {feature.title}
                            </h3>
                            <p className={styles.featureDescription}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={styles.offerSection}>
                    <h3 className={styles.sectionTitle}>Co oferujemy?</h3>
                    <div className={styles.offerList}>
                        {offerings.map((offer, index) => (
                            <div
                                key={index}
                                className={styles.offerItem}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <span className={styles.checkIcon}>✓</span>
                                <span>{offer}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.missionSection}>
                    <h3 className={styles.sectionTitle}>Cel i misja</h3>
                    <div className={styles.missionGrid}>
                        {missions.map((mission, index) => (
                            <div
                                key={index}
                                className={styles.missionCard}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.missionIcon}>🎯</div>
                                <p>{mission}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
