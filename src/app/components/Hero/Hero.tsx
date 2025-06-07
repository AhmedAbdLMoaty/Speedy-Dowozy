"use client";

import { useState, useEffect, useRef } from "react";
import "./Hero.css";

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setIsLoaded(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!videoRef.current) return;

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

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        const animateCounters = () => {
            const counters = document.querySelectorAll(".stat[data-count]");

            counters.forEach((counter) => {
                const target = parseInt(
                    counter.getAttribute("data-count") || "0"
                );
                const numberElement = counter.querySelector(".stat-number");
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
    }, [isLoaded]);

    return (
        <section ref={sectionRef} className="hero-section">
            <div className="hero-background">
                <video
                    ref={videoRef}
                    className="hero-video"
                    muted
                    loop
                    playsInline
                    autoPlay
                    poster="/images/Główne logo na stronę internetową.jpg"
                >
                    <source
                        src="/videos/speedy_dowozy_intro1616857318326.mp4"
                        type="video/mp4"
                    />
                </video>

                <div
                    className="mobile-bg-image"
                    style={{
                        backgroundImage: "url('/images/start-1 - Kopia.png')",
                    }}
                ></div>
            </div>

            <div className="hero-overlay">
                <div className="speed-lines">
                    {Array.from({ length: 20 }, (_, i) => (
                        <div
                            key={i}
                            className="speed-line"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        />
                    ))}
                </div>
            </div>

            <div className="container">
                <div className={`hero-content ${isLoaded ? "loaded" : ""}`}>
                    <div className="hero-badge">
                        <span className="badge-icon">⚡</span>
                        <span>Najszybsza dostawa w Polsce</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="title-main">Speedy</span>
                        <span className="title-accent">Dowozy</span>
                    </h1>

                    <p className="hero-subtitle">
                        Ekspresowa dostawa jedzenia w{" "}
                        <span className="highlight-time">15 minut</span>
                    </p>

                    <div className="hero-stats">
                        {[
                            { count: 15, label: "minut" },
                            { count: 500, label: "restauracji" },
                            { count: 50, label: "miast" },
                        ].map(({ count, label }) => (
                            <div
                                key={label}
                                className="stat"
                                data-count={count}
                            >
                                <span className="stat-number">0</span>
                                <span className="stat-label">{label}</span>
                                <div className="stat-progress"></div>
                            </div>
                        ))}
                    </div>

                    <div className="hero-actions">
                        <button className="btn-primary btn-speed">
                            <span>Zamów Teraz</span>
                            <div className="btn-speed-effect"></div>
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
                        <button className="btn-secondary">
                            Dołącz jako Partner
                        </button>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-speed">
                    <div className="scroll-arrow"></div>
                    <span className="scroll-text">Przeżyj prędkość</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
