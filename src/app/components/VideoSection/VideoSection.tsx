"use client";

import { useState, useEffect, useRef } from "react";
import "./VideoSection.css";

const VideoSection = () => {
    const [isInView, setIsInView] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        if (videoRef.current) {
                            videoRef.current.play().catch(() => {
                                console.log(
                                    "VideoSection video failed to play"
                                );
                            });
                        }
                    } else {
                        setIsInView(false);
                        if (videoRef.current) videoRef.current.pause();
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

    return (
        <section ref={sectionRef} className="video-section">
            <div className="container">
                <div className={`video-header ${isInView ? "animate-in" : ""}`}>
                    <h2 className="section-title">
                        Zobacz Speedy Dowozy w Akcji
                    </h2>
                    <p className="section-subtitle">
                        Odkryj jak działamy i dlaczego jesteśmy najszybsi w
                        Polsce
                    </p>
                </div>

                <div
                    className={`video-container ${
                        isInView ? "animate-in" : ""
                    }`}
                >
                    <div className="video-wrapper">
                        <video
                            ref={videoRef}
                            className="main-video"
                            muted
                            loop
                            playsInline
                            poster="/images/Główne logo na stronę internetową.jpg"
                            controls
                        >
                            <source
                                src="/videos/Speedy_Final_final1605247500273.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                <div
                    className={`video-features ${isInView ? "animate-in" : ""}`}
                >
                    <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <h3>15 minut dostawy</h3>
                        <p>Rekordowy czas realizacji zamówienia</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🎯</div>
                        <h3>Precyzyjne śledzenie</h3>
                        <p>Monitoruj zamówienie w czasie rzeczywistym</p>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🚀</div>
                        <h3>Inteligentna logistyka</h3>
                        <p>Zaawansowane algorytmy optymalizacji tras</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
