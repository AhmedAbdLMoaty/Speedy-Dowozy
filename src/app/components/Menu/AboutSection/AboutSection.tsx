"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AboutSection.module.css";

const AboutSection = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasMounted, setHasMounted] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [activeVideoId, setActiveVideoId] = useState<1 | 2 | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const secondVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setHasMounted(true);

        const isFirstVisit = !sessionStorage.getItem("aboutSectionVisited");
        if (isFirstVisit) {
            sessionStorage.setItem("aboutSectionVisited", "true");
        }

        const handleUserInteraction = () => {
            setHasUserInteracted(true);

            if (activeVideoId === 1 && videoRef.current) {
                if (!videoRef.current.paused) {
                    videoRef.current.muted = false;
                }
            } else if (activeVideoId === 2 && secondVideoRef.current) {
                if (!secondVideoRef.current.paused) {
                    secondVideoRef.current.muted = false;
                }
            }
        };

        document.addEventListener("click", handleUserInteraction, {
            once: true,
            capture: true,
        });
        document.addEventListener("scroll", handleUserInteraction, {
            once: true,
            capture: true,
        });
        document.addEventListener("touchstart", handleUserInteraction, {
            once: true,
            capture: true,
        });

        return () => {
            document.removeEventListener("click", handleUserInteraction, {
                capture: true,
            });
            document.removeEventListener("scroll", handleUserInteraction, {
                capture: true,
            });
            document.removeEventListener("touchstart", handleUserInteraction, {
                capture: true,
            });
        };
    }, [activeVideoId]);

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

    useEffect(() => {
        if (!hasMounted) return;

        const firstVideo = videoRef.current;
        const secondVideo = secondVideoRef.current;

        if (!firstVideo || !secondVideo) return;

        const isPageRefresh = !sessionStorage.getItem("aboutSectionVisited");

        const updateVideoStates = (newActiveId: 1 | 2 | null) => {
            if (newActiveId === null) {
                firstVideo.pause();
                secondVideo.pause();
                setActiveVideoId(null);
                return;
            }

            const activeVideo = newActiveId === 1 ? firstVideo : secondVideo;
            const inactiveVideo = newActiveId === 1 ? secondVideo : firstVideo;

            inactiveVideo.pause();

            if (activeVideo.paused) {
                activeVideo.play().catch(() => {});

                if (hasUserInteracted) {
                    activeVideo.muted = false;
                }
            }

            setActiveVideoId(newActiveId);
        };

        const videoObserver = new IntersectionObserver(
            (entries) => {
                const entryMap = new Map(
                    entries.map((entry) => [entry.target, entry])
                );

                const firstVideoEntry = entryMap.get(firstVideo);
                const secondVideoEntry = entryMap.get(secondVideo);

                if (!firstVideoEntry || !secondVideoEntry) return;

                const firstVisible = firstVideoEntry.isIntersecting;
                const secondVisible = secondVideoEntry.isIntersecting;

                if (firstVisible && secondVisible) {
                    const firstRatio = firstVideoEntry.intersectionRatio;
                    const secondRatio = secondVideoEntry.intersectionRatio;

                    if (firstRatio > secondRatio) {
                        updateVideoStates(1);
                    } else {
                        updateVideoStates(2);
                    }
                } else if (firstVisible) {
                    updateVideoStates(1);
                } else if (secondVisible) {
                    updateVideoStates(2);
                } else {
                    updateVideoStates(null);
                }
            },
            {
                threshold: [
                    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
                ],

                rootMargin: "0px 0px 0px 0px",
            }
        );

        videoObserver.observe(firstVideo);
        videoObserver.observe(secondVideo);

        if (isPageRefresh) {
            const calculateVisibleArea = (rect: DOMRect): number => {
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(window.innerHeight, rect.bottom);
                return visibleBottom > visibleTop
                    ? visibleBottom - visibleTop
                    : 0;
            };

            const firstVideoRect = firstVideo.getBoundingClientRect();
            const secondVideoRect = secondVideo.getBoundingClientRect();

            const firstVideoVisibleArea = calculateVisibleArea(firstVideoRect);
            const secondVideoVisibleArea =
                calculateVisibleArea(secondVideoRect);

            if (firstVideoVisibleArea > 0 || secondVideoVisibleArea > 0) {
                if (firstVideoVisibleArea > secondVideoVisibleArea) {
                    updateVideoStates(1);
                } else if (secondVideoVisibleArea > 0) {
                    updateVideoStates(2);
                }
            }
        }

        const handlePlay = (videoId: 1 | 2) => () => {
            if (videoId === 1) {
                if (secondVideo && !secondVideo.paused) {
                    secondVideo.pause();
                }
                setActiveVideoId(1);
            } else {
                if (firstVideo && !firstVideo.paused) {
                    firstVideo.pause();
                }
                setActiveVideoId(2);
            }

            if (hasUserInteracted) {
                const video = videoId === 1 ? firstVideo : secondVideo;
                video.muted = false;
            }
        };

        firstVideo.addEventListener("play", handlePlay(1));
        secondVideo.addEventListener("play", handlePlay(2));

        const handleScroll = () => {
            const firstVideoRect = firstVideo.getBoundingClientRect();
            const secondVideoRect = secondVideo.getBoundingClientRect();

            const calculateVisibility = (rect: DOMRect): number => {
                const visibleHeight =
                    Math.min(window.innerHeight, rect.bottom) -
                    Math.max(0, rect.top);
                return Math.max(0, visibleHeight) / rect.height;
            };

            const firstVisibility = calculateVisibility(firstVideoRect);
            const secondVisibility = calculateVisibility(secondVideoRect);

            if (firstVisibility > 0 || secondVisibility > 0) {
                if (firstVisibility > secondVisibility) {
                    updateVideoStates(1);
                } else if (secondVisibility > 0) {
                    updateVideoStates(2);
                }
            } else {
                updateVideoStates(null);
            }
        };

        let scrollTimeout: number | null = null;
        const throttledScroll = () => {
            if (scrollTimeout === null) {
                scrollTimeout = window.setTimeout(() => {
                    handleScroll();
                    scrollTimeout = null;
                }, 100);
            }
        };

        window.addEventListener("scroll", throttledScroll, { passive: true });

        return () => {
            videoObserver.disconnect();
            firstVideo.removeEventListener("play", handlePlay(1));
            secondVideo.removeEventListener("play", handlePlay(2));
            window.removeEventListener("scroll", throttledScroll);

            if (scrollTimeout) {
                window.clearTimeout(scrollTimeout);
            }

            firstVideo.pause();
            firstVideo.removeAttribute("src");
            firstVideo.load();

            secondVideo.pause();
            secondVideo.removeAttribute("src");
            secondVideo.load();
        };
    }, [hasMounted, hasUserInteracted]);

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
                <div className={styles.heroIntro}>
                    <h2 className={styles.mainTitle}>Kim jesteśmy?</h2>
                    <p className={styles.introText}>
                        Speedy to firma, która zajmuje się dowozem wszelkiego
                        rodzaju posiłków serwowanych przez restauracje oraz
                        punkty gastronomiczne.
                    </p>
                </div>
                <div className={styles.videoSection}>
                    <div
                        className={styles.videoContainer}
                        style={{ position: "relative" }}
                    >
                        <div
                            className={styles.videoOverlay}
                            style={{
                                pointerEvents: "none",
                                left: 0,
                                right: 0,
                                top: 0,
                                width: "100%",
                                position: "absolute",
                                zIndex: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                padding: "2rem 1rem 4.5rem 1rem",
                            }}
                        >
                            <h3 className={styles.videoTitle}>
                                Film prezentacyjny
                            </h3>
                            <p className={styles.videoSubtitle}>
                                Speedy Dowozy: Uwalniając moc dostaw.
                            </p>
                        </div>
                        <video
                            ref={videoRef}
                            className={styles.speedyVideo}
                            loop
                            playsInline
                            preload="metadata"
                            controls
                            muted
                            data-video-id="1"
                            style={{ position: "relative", zIndex: 1 }}
                        >
                            <source src="/videos/video0.mp4" type="video/mp4" />
                            Twoja przeglądarka nie obsługuje odtwarzania wideo.
                        </video>
                    </div>
                </div>
                <div
                    className={styles.videoSection}
                    style={{ marginTop: "2.5rem" }}
                >
                    <div
                        className={styles.videoContainer}
                        style={{ position: "relative" }}
                    >
                        <div
                            className={styles.videoOverlay}
                            style={{
                                pointerEvents: "none",
                                left: 0,
                                right: 0,
                                top: 0,
                                width: "100%",
                                position: "absolute",
                                zIndex: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                padding: "2rem 1rem 4.5rem 1rem",
                            }}
                        >
                            <h3 className={styles.videoTitle}>
                                Szybkość to nasza pasja
                            </h3>
                            <p className={styles.videoSubtitle}>
                                Masz problem z dowozem? Speedy Dowozy to
                                rozwiązanie dla Twojej restauracji.
                                Gwarantujemy, że Twoje potrawy dotrą do klientów
                                zawsze gorące i zawsze na czas. Zapraszamy do
                                współpracy!
                            </p>
                        </div>
                        <video
                            className={styles.speedyVideo}
                            loop
                            playsInline
                            preload="metadata"
                            controls
                            muted
                            data-video-id="2"
                            ref={secondVideoRef}
                            style={{ position: "relative", zIndex: 1 }}
                        >
                            <source src="/videos/video1.mp4" type="video/mp4" />
                            Twoja przeglądarka nie obsługuje odtwarzania wideo.
                        </video>
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
                                <span className={styles.checkIcon}>
                                    &#10004;
                                </span>
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
