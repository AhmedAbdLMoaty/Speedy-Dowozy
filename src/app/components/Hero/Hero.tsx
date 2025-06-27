"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const STATS_DATA = [
    { count: 15, label: "minut" },
    { count: 50, label: "restauracji" },
    { count: 5, label: "miast" },
] as const;

const Hero = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);
    useEffect(() => {
        if (!isLoaded) return;

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
    }, [isLoaded]);

    return (
        <section className={styles.heroSection}>
            <div className={styles.heroBackground}>
                <div className={styles.heroImageContainer}>
                    <Image
                        src="/images/logo1.webp"
                        alt="Speedy Dowozy - Background Logo"
                        fill
                        className={styles.heroBackgroundImage}
                        priority
                        sizes="100vw"
                    />
                    <div className={styles.backgroundOverlay}></div>
                </div>
            </div>
            <div className={styles.heroOverlay} />
            <div className="container">
                <div
                    className={`${styles.heroContent} ${
                        isLoaded ? styles.loaded : ""
                    }`}
                >
                    <div className={styles.heroLayout}>
                        <div className={styles.heroTextSection}>
                            <div className={styles.heroLogo}>
                                <Image
                                    src="/images/logo2.webp"
                                    alt="Zawsze Gorące - Zawsze Na Czas"
                                    width={200}
                                    height={200}
                                    className={styles.roundLogo}
                                    priority
                                />
                            </div>
                            <h1 className={styles.heroTitle}>
                                Najszybsza dostawa w Polsce
                            </h1>
                            <p className={styles.heroSubtitle}>
                                Ekspresowa dostawa jedzenia w{" "}
                                <span className={styles.highlightTime}>
                                    15 minut
                                </span>
                            </p>{" "}
                            <div className={styles.heroStats}>
                                {STATS_DATA.map(({ count, label }, index) => (
                                    <div
                                        key={label}
                                        className={styles.stat}
                                        data-count={count}
                                        style={
                                            {
                                                "--stat-index": index,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <span className={styles.statNumber}>
                                            0
                                        </span>
                                        <span className={styles.statLabel}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
