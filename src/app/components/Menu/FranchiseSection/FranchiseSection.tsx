"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./FranchiseSection.module.css";
import Link from "next/link";

interface ProfitItem {
    icon: string;
    title: string;
    description: string;
    highlight: string;
}

const FranchiseSection: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Update document title and meta description for better SEO
        document.title =
            "Franczyza Speedy Dowozy - Rozpocznij własny biznes w dostawach jedzenia";
        // Update meta description
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "Dołącz do sieci franczyzowej Speedy Dowozy. Niski próg wejścia, wysokie zyski 3-20k PLN miesięcznie. Nowoczesna aplikacja, wsparcie biznesowe i sprawdzone rozwiązania."
            );
        } else {
            const meta = document.createElement("meta");
            meta.name = "description";
            meta.content =
                "Dołącz do sieci franczyzowej Speedy Dowozy. Niski próg wejścia, wysokie zyski 3-20k PLN miesięcznie. Nowoczesna aplikacja, wsparcie biznesowe i sprawdzone rozwiązania.";
            document.head.appendChild(meta);
        }

        // Add structured data for better SEO
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "BusinessOpportunity",
            name: "Franczyza Speedy Dowozy",
            description:
                "Dołącz do sieci franczyzowej Speedy Dowozy w branży dostaw jedzenia. Niski próg wejścia, wysokie zyski, nowoczesna aplikacja mobilna.",
            provider: {
                "@type": "Organization",
                name: "Speedy Dowozy",
                url: "https://speedydobrozy.pl",
            },
            potentialAction: {
                "@type": "ApplyAction",
                name: "Aplikuj na franczyzę",
                url: "https://speedydobrozy.pl/menu/franczyza",
            },
            offers: {
                "@type": "Offer",
                category: "Franczyza",
                businessFunction: "http://purl.org/goodrelations/v1#Sell",
                eligibleRegion: "PL",
            },
        };

        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        const videoObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (videoRef.current) {
                        videoRef.current.play().catch(() => {});
                        setIsPlaying(true);
                    }
                } else {
                    if (videoRef.current) {
                        videoRef.current.pause();
                        setIsPlaying(false);
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (videoRef.current) {
            videoObserver.observe(videoRef.current);
        }

        const currentVideoRef = videoRef.current;

        return () => {
            if (currentVideoRef) {
                videoObserver.unobserve(currentVideoRef);
            }
        };
    }, []);

    const profitData: ProfitItem[] = [
        {
            icon: "💰",
            title: "15 dostaw dziennie",
            description:
                "15 dostaw x 10 lokali = 450 zł dziennie (3 zł za kurs)",
            highlight: "450 zł/dzień",
        },
        {
            icon: "💎",
            title: "20 kursów dziennie",
            description: "20 kursów x 10 lokali = 600 zł dziennie",
            highlight: "600 zł/dzień",
        },
        {
            icon: "📈",
            title: "Miesięczne zyski",
            description: "Zarabiasz w przedziale od 3-20 tys PLN",
            highlight: "3-20k PLN",
        },
        {
            icon: "🔥",
            title: "Bez limitu",
            description: "Nie ma górnej granicy na zysk",
            highlight: "Bez granic",
        },
        {
            icon: "🌐",
            title: "Portal online",
            description: "2% od każdej transakcji dla franczyzobiorcy",
            highlight: "2% prowizji",
        },
    ];

    return (
        <div className={styles.franchiseSection}>
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
                </div>{" "}
                {/* Featured Video Section - Full Width & Centered */}
                <section
                    className={styles.featuredVideoSection}
                    aria-labelledby="franchise-video-heading"
                >
                    <header>
                        <h3
                            id="franchise-video-heading"
                            className={styles.videoSectionTitle}
                        >
                            Filmik prezentacyjny franczyzy
                        </h3>
                        <p className={styles.videoSectionSubtitle}>
                            Odkryj możliwości rozwoju własnego biznesu z naszą
                            franczyzą
                        </p>
                    </header>
                    <div className={styles.videoContainer}>
                        <video
                            ref={videoRef}
                            className={styles.franchiseVideo}
                            muted
                            loop
                            playsInline
                            poster="/images/speedy.webp"
                            preload="metadata"
                            aria-label="Film prezentacyjny franczyzy Speedy Dowozy - dowiedz się jak rozpocząć własny biznes w branży dostaw jedzenia"
                            title="Franczyza Speedy Dowozy - Twój sukces w dostawach jedzenia"
                        >
                            <source src="/videos/video2.mp4" type="video/mp4" />
                            <track
                                kind="captions"
                                srcLang="pl"
                                label="Polski"
                            />
                            Twoja przeglądarka nie obsługuje odtwarzania wideo.
                        </video>
                        <div
                            className={styles.videoControls}
                            role="group"
                            aria-label="Kontrolki wideo"
                        >
                            <button
                                className={styles.playButton}
                                onClick={() => {
                                    if (videoRef.current) {
                                        if (videoRef.current.paused) {
                                            videoRef.current.play();
                                        } else {
                                            videoRef.current.pause();
                                        }
                                    }
                                }}
                                aria-label={
                                    isPlaying
                                        ? "Zatrzymaj wideo"
                                        : "Odtwórz wideo"
                                }
                                title={
                                    isPlaying
                                        ? "Zatrzymaj wideo"
                                        : "Odtwórz wideo"
                                }
                            >
                                <span
                                    className={styles.playIcon}
                                    aria-hidden="true"
                                >
                                    {isPlaying ? "⏸️" : "▶️"}
                                </span>
                            </button>
                        </div>
                        <div className={styles.videoOverlay}>
                            <h4 className={styles.videoTitle}>
                                Franczyza Speedy Dowozy
                            </h4>
                            <p className={styles.videoDescription}>
                                Poznaj szczegóły współpracy, potencjał zysków i
                                wsparcie dla franczyzobiorców
                            </p>
                        </div>
                    </div>
                </section>
                {/* Contact & Information Section */}
                <div className={styles.infoSection}>
                    <div className={styles.contactForm}>
                        <div className={styles.formIcon} aria-hidden="true">
                            📋
                        </div>
                        <h4>Formularz kontaktowy</h4>{" "}
                        <p>
                            Skontaktuj się z nami, aby otrzymać szczegółową
                            ofertę franczyzową i rozpocząć współpracę
                        </p>
                        <Link href="/contact" className={styles.contactButton}>
                            Skontaktuj się z nami
                        </Link>
                    </div>
                </div>{" "}
                {/* Profit Potential Section */}
                <section
                    className={styles.profitSection}
                    aria-labelledby="profit-heading"
                >
                    <header>
                        <h3 id="profit-heading" className={styles.profitTitle}>
                            Potencjał zysków
                        </h3>
                    </header>
                    <div className={styles.profitGrid}>
                        {profitData.map((profit, index) => (
                            <article
                                key={index}
                                className={styles.profitCard}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div
                                    className={styles.profitIcon}
                                    aria-hidden="true"
                                >
                                    {profit.icon}
                                </div>
                                <h4 className={styles.profitCardTitle}>
                                    {profit.title}
                                </h4>
                                <p className={styles.profitDescription}>
                                    {profit.description}
                                </p>
                                <div className={styles.profitHighlight}>
                                    {profit.highlight}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                {/* Business Development Section */}
                <section
                    className={styles.rollupSection}
                    aria-labelledby="rollup-heading"
                >
                    <div className={styles.rollupIcon} aria-hidden="true">
                        📊
                    </div>
                    <h3 id="rollup-heading">Rollup: Rozwój i ekspansja</h3>
                    <p>
                        System rollup pozwala na strategiczny rozwój sieci
                        franczyzowej z wykorzystaniem najnowszych technologii i
                        sprawdzonych rozwiązań biznesowych.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default FranchiseSection;
