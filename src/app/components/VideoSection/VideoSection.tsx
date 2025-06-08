"use client";

import { useState, useEffect, useRef } from "react";
import { memo } from "react";
import styles from "./VideoSection.module.css";

const VideoSection = memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    setShouldLoadVideo(true);
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        if (shouldLoadVideo && videoRef.current && !videoError) {
            videoRef.current.load();

            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    setVideoError(true);
                });
            }
        }
    }, [shouldLoadVideo, videoError]);

    const handleVideoError = () => {
        setVideoError(true);
    };

    const handleVideoLoad = () => {
        setVideoError(false);
    };

    const features = [
        {
            icon: "🚀",
            title: "Ekspresowa Dostawa",
            description:
                "Najszybsza dostawa w mieście - od 15 minut od złożenia zamówienia.",
        },
        {
            icon: "📱",
            title: "Łatwe Zamawianie",
            description: "Intuicyjna aplikacja mobilna i strona internetowa.",
        },
        {
            icon: "📍",
            title: "Śledzenie na Żywo",
            description: "Monitoruj swoją dostawę w czasie rzeczywistym.",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className={`${styles.videoSection} ${
                isVisible ? styles.animateIn : ""
            }`}
        >
            <div className="container">
                <div
                    className={`${styles.videoHeader} ${
                        isVisible ? styles.animateIn : ""
                    }`}
                >
                    <h2 className={styles.sectionTitle}>
                        Zobacz Speedy Dowozy w Akcji
                    </h2>
                    <p className={styles.sectionSubtitle}>
                        Poznaj naszą platformę i zobacz, jak łatwo możesz
                        zamawiać jedzenie
                    </p>
                </div>

                <div
                    className={`${styles.videoContainer} ${
                        isVisible ? styles.animateIn : ""
                    }`}
                >
                    <div className={styles.videoWrapper}>
                        {shouldLoadVideo ? (
                            <video
                                ref={videoRef}
                                className={styles.demoVideo}
                                muted
                                loop
                                playsInline
                                preload="none"
                                onError={handleVideoError}
                                onLoadedData={handleVideoLoad}
                            >
                                <source
                                    src="/videos/video2.mp4"
                                    type="video/mp4"
                                />
                                Twoja przeglądarka nie obsługuje odtwarzania
                                wideo.
                            </video>
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    background:
                                        "linear-gradient(45deg, #e1107d, #ff6b6b)",
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                }}
                            >
                                🎬 Ładowanie Demo...
                            </div>
                        )}

                        {videoError && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background:
                                        "linear-gradient(45deg, #e1107d, #ff6b6b)",
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    zIndex: 10,
                                }}
                            >
                                🎬 Demo Video
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className={`${styles.videoFeatures} ${
                        isVisible ? styles.animateIn : ""
                    }`}
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={styles.featureItem}
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.featureIcon}>
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

VideoSection.displayName = "VideoSection";

export default VideoSection;
