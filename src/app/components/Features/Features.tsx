"use client";

import { useEffect, useRef } from "react";
import "./Features.css";

const Features = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const features = [
        {
            icon: "⚡",
            title: "Ekspresowa Dostawa",
            description:
                "Gwarantujemy dostawę w 15 minut dzięki zaawansowanemu systemowi logistycznemu",
            speed: "fast",
        },
        {
            icon: "📱",
            title: "Aplikacja Mobilna",
            description:
                "Intuicyjna aplikacja dla klientów, restauracji i kierowców z pełnym systemem zarządzania",
            speed: "medium",
        },
        {
            icon: "🤝",
            title: "Pełne Wsparcie",
            description:
                "Kompleksowe wsparcie biznesowe, marketingowe i techniczne dla wszystkich partnerów",
            speed: "slow",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement;
                        target.classList.add("animate-in");

                        // Animate feature cards
                        const cards = target.querySelectorAll(".feature-card");
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add("visible");
                            }, index * 200);
                        });

                        // Animate speed demo
                        const speedDemo = target.querySelector(".speed-demo");
                        if (speedDemo) {
                            setTimeout(() => {
                                speedDemo.classList.add("counting");
                            }, 500);
                        }
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="features-section">
            <div className="container">
                <div className="features-header">
                    <h2 className="section-title">Dlaczego Speedy Dowozy?</h2>
                    <p className="section-subtitle">
                        Nowoczesne rozwiązania dla wszystkich uczestników rynku
                        dostaw
                    </p>

                    <div className="speed-demo">
                        <div className="speed-track">
                            <div className="speed-indicator slow">
                                <span>Konkurencja</span>
                                <div className="speed-bar">
                                    <div
                                        className="speed-fill"
                                        data-speed="30"
                                    ></div>
                                </div>
                                <span className="speed-time">30+ min</span>
                            </div>
                            <div className="speed-indicator fast">
                                <span>Speedy Dowozy</span>
                                <div className="speed-bar">
                                    <div
                                        className="speed-fill"
                                        data-speed="15"
                                    ></div>
                                </div>
                                <span className="speed-time">15 min</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className={`feature-card speed-${feature.speed}`}
                            style={
                                {
                                    "--delay": `${index * 0.2}s`,
                                } as React.CSSProperties
                            }
                        >
                            <div className="feature-icon">
                                <span className="icon-emoji">
                                    {feature.icon}
                                </span>
                                <div className="icon-pulse"></div>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">
                                {feature.description}
                            </p>

                            <div className="feature-speed">
                                <div className="speed-dots">
                                    {Array.from({ length: 3 }, (_, i) => (
                                        <div
                                            key={i}
                                            className="speed-dot"
                                            style={
                                                {
                                                    "--dot-delay": `${
                                                        i * 0.1
                                                    }s`,
                                                } as React.CSSProperties
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
