"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
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
    const contactPersons = [
        {
            name: "Marcin Czuba",
            role: "Prezes",
            phone: "537 448 037",
            location: "Centrala",
            imageSrc:
                "/images/att.NN20_25xozR1-qHbPFqqSgUNtpUi1PnYp6gn1ocRPWU.jpeg",
        },
        {
            name: "Karolina Frąk",
            role: "Kierownik Regionalny",
            phone: "501 752 297",
            location: "Kielce",
            imageSrc: "/images/IMG_8598.jpeg",
        },
        {
            name: "Łukasz Grodzicki",
            role: "Kierownik Regionalny",
            phone: "605 921 050",
            location: "Ostrowiec Świętokrzyski",
            imageSrc: "/images/placeholder-profile.svg",
        },
        {
            name: "Rafał Abramczyk",
            role: "Kierownik Regionalny",
            phone: "536 273 405",
            location: "Starachowice",
            imageSrc: "/images/IMG_8599.jpeg",
        },
    ];

    return (
        <main className={styles.main}>
            <div
                ref={sectionRef}
                className={`${styles.contactSection} ${
                    isVisible ? styles.visible : ""
                }`}
            >
                <div className="container">
                    <h1 className={styles.title}>Kontakt</h1>

                    <div className={styles.contactInfoCard}>
                        <div className={styles.contactIconContainer}>
                            <div className={styles.contactIcon}>📞</div>
                        </div>
                        <h2 className={styles.contactTitle}>
                            Skontaktuj się z nami
                        </h2>
                        <p className={styles.contactDescription}>
                            Masz pytania dotyczące naszych usług lub chcesz
                            rozpocząć współpracę? Skontaktuj się z naszym
                            zespołem już dziś!
                        </p>
                    </div>

                    <div className={styles.contactCardsGrid}>
                        {contactPersons.map((person, index) => (
                            <div
                                key={index}
                                className={styles.contactPersonCard}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={styles.profileImageContainer}>
                                    <Image
                                        src={person.imageSrc}
                                        alt={`${person.name} - ${person.role}`}
                                        width={200}
                                        height={200}
                                        className={styles.profileImage}
                                    />
                                </div>
                                <h3 className={styles.personName}>
                                    {person.name}
                                </h3>
                                <p className={styles.personRole}>
                                    {person.role}
                                </p>
                                <p className={styles.personLocation}>
                                    {person.location}
                                </p>
                                <Link
                                    href={`tel:${person.phone.replace(
                                        /\s/g,
                                        ""
                                    )}`}
                                    className={styles.phoneButton}
                                >
                                    <span className={styles.phoneIcon}>📞</span>{" "}
                                    {person.phone}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className={styles.officeLocationsContainer}>
                        <h2 className={styles.sectionTitle}>
                            Nasze lokalizacje
                        </h2>{" "}
                        <div className={styles.officeLocationsGrid}>
                            <div className={styles.officeCard}>
                                <h3 className={styles.officeName}>
                                    Ostrowiec Świętokrzyski
                                </h3>                                <p className={styles.officeAddress}>
                                    <strong>Główny adres - Centrala firmy</strong>
                                    <br />
                                    27-400 Ostrowiec Świętokrzyski
                                </p>
                                <div className={styles.officeContact}>
                                    <p>
                                        <strong>Kierownik:</strong> Łukasz
                                        Grodzicki
                                    </p>
                                    <p>
                                        <strong>Telefon:</strong> 605 921 050
                                    </p>
                                </div>
                            </div>

                            <div className={styles.officeCard}>
                                <h3 className={styles.officeName}>
                                    Starachowice
                                </h3>
                                <p className={styles.officeAddress}>
                                    Oddział regionalny
                                    <br />
                                    27-200 Starachowice
                                </p>
                                <div className={styles.officeContact}>
                                    <p>
                                        <strong>Kierownik:</strong> Rafał
                                        Abramczyk
                                    </p>
                                    <p>
                                        <strong>Telefon:</strong> 536 273 405
                                    </p>
                                </div>
                            </div>

                            <div className={styles.officeCard}>
                                <h3 className={styles.officeName}>Kielce</h3>
                                <p className={styles.officeAddress}>
                                    Oddział regionalny
                                    <br />
                                    25-000 Kielce
                                </p>{" "}
                                <div className={styles.officeContact}>
                                    <p>
                                        <strong>Kierownik:</strong> Karolina
                                        Frąk
                                    </p>
                                    <p>
                                        <strong>Telefon:</strong> 501 752 297
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
