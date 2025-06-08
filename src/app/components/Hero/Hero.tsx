"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Hero.module.css";

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        setIsLoaded(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!videoRef.current || isMobile) return;

                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => {});
                    } else {
                        videoRef.current.pause();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", checkMobile);
        };
    }, [isMobile]);

    useEffect(() => {
        if (!isLoaded || isMobile) return;

        const animateCounters = () => {
            const counters = document.querySelectorAll(
                `.${styles.stat}[data-count]`
            );

            counters.forEach((counter) => {
                const target = parseInt(
                    counter.getAttribute("data-count") || "0"
                );
                const numberElement = counter.querySelector(
                    `.${styles.statNumber}`
                );
                if (!numberElement) return;

                let current = 0;
                const increment = target / 60;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        numberElement.textContent =
                            Math.floor(current).toString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        numberElement.textContent = target.toString();
                    }
                };

                setTimeout(updateCounter, 1000);
            });
        };

        animateCounters();
    }, [isLoaded, isMobile]);

    const scrollToNextSection = () => {
        const nextSection =
            document.querySelector("section:nth-of-type(2)") ||
            document.querySelector('[data-section="features"]') ||
            document.querySelector('[data-section="video"]') ||
            document.querySelector("main > section:nth-child(2)");

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <section ref={sectionRef} className={styles.heroSection}>
            <div className={styles.heroBackground}>
                {/* Only load video on desktop */}
                {!isMobile && (
                    <video
                        ref={videoRef}
                        className={styles.heroVideo}
                        muted
                        loop
                        playsInline
                        preload="none"
                        poster="/images/logo1.webp"
                    >
                        <source src="/videos/video0.mp4" type="video/mp4" />
                    </video>
                )}

                <div
                    className={styles.mobileBgImage}
                    style={{
                        backgroundImage: isMobile
                            ? "url('/images/mob-bg.webp')"
                            : "none",
                    }}
                ></div>
            </div>

            {/* Simplified overlay for mobile */}
            <div className={styles.heroOverlay}>
                {!isMobile && (
                    <div className={styles.speedLines}>
                        {Array.from({ length: 10 }, (_, i) => (
                            <div
                                key={i}
                                className={styles.speedLine}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="container">
                <div
                    className={`${styles.heroContent} ${
                        isLoaded ? styles.loaded : ""
                    }`}
                >
                    <div className={styles.heroBadge}>
                        <span className={styles.badgeIcon}>⚡</span>
                        <span>Najszybsza dostawa w Polsce</span>
                    </div>

                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleMain}>Speedy</span>
                        <span className={styles.titleAccent}>Dowozy</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        Ekspresowa dostawa jedzenia w{" "}
                        <span className={styles.highlightTime}>15 minut</span>
                    </p>

                    {/* Hide stats on mobile for better performance */}
                    {!isMobile && (
                        <div className={styles.heroStats}>
                            {[
                                { count: 15, label: "minut" },
                                { count: 500, label: "restauracji" },
                                { count: 50, label: "miast" },
                            ].map(({ count, label }) => (
                                <div
                                    key={label}
                                    className={styles.stat}
                                    data-count={count}
                                >
                                    <span className={styles.statNumber}>0</span>
                                    <span className={styles.statLabel}>
                                        {label}
                                    </span>
                                    <div className={styles.statProgress}></div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.heroActions}>
                        <button
                            className={`${styles.btnPrimary} ${styles.btnSpeed}`}
                        >
                            <span>Zamów Teraz</span>
                            {!isMobile && (
                                <div className={styles.btnSpeedEffect}></div>
                            )}
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
                        <button className={styles.btnSecondary}>
                            Dołącz jako Partner
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <button
                    className={styles.scrollSpeed}
                    onClick={scrollToNextSection}
                    aria-label="Scroll to next section"
                >
                    <div className={styles.scrollArrow}></div>
                    <span className={styles.scrollText}>Przeżyj prędkość</span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
