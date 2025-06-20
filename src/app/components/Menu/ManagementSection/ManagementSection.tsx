"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ManagementSection.module.css";
import Image from "next/image";
import Link from "next/link";

const ManagementSection = () => {
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
    const managementTeam = [
        {
            name: "Marcin Czuba",
            role: "Prezes Zarządu",
            phone: "537 448 037",
            location: "Centrala",
            imageSrc:
                "/images/att.NN20_25xozR1-qHbPFqqSgUNtpUi1PnYp6gn1ocRPWU.jpeg",
            isMainExecutive: true,
            description:
                "Jest założycielem i prezesem firmy Speedy Dowozy, której powstanie zainicjował w 2019r. Z pasją do gastronomii oraz dostaw, postanowił stworzyć platformę, która ułatwi klientom dostęp do ich ulubionych dań z lokalnych restauracji. Od samego początku istnienia firmy, pełni kluczową rolę w kształtowaniu strategii rozwoju, zarządzaniu operacjami oraz budowaniu relacji z partnerami gastronomicznymi. Dzięki jego wizji i determinacji, Speedy Dowozy zyskało zaufanie wielu klientów i stało się liderem w branży dostaw jedzenia w województwie świętokrzyskim. Pod jego przewodnictwem, firma odnotowała znaczący wzrost zamówień wśród klientów restauracji. Jako lider zespołu, planuje dalszy rozwój firmy, wprowadzając innowacje oraz nowe usługi, które będą odpowiadać na potrzeby klientów w dynamicznie zmieniającym się rynku.",
        },
        {
            name: "Łukasz Grodzicki",
            role: "Kierownik Regionalny",
            phone: "605 921 050",
            location: "Ostrowiec Świętokrzyski",
            imageSrc: "/images/placeholder-profile.svg",
            isMainExecutive: false,
        },
        {
            name: "Rafał Abramczyk",
            role: "Kierownik Regionalny",
            phone: "536 273 405",
            location: "Starachowice",
            imageSrc: "/images/IMG_8599.jpeg",
            isMainExecutive: false,
        },
        {
            name: "Karolina Frąk",
            role: "Kierownik Regionalny",
            phone: "501 752 297",
            location: "Kielce",
            imageSrc: "/images/IMG_8598.jpeg",
            isMainExecutive: false,
        },
    ];

    return (
        <div
            ref={sectionRef}
            className={`${styles.managementSection} ${
                isVisible ? styles.visible : ""
            }`}
        >
            <div className="container">
                <h2 className={styles.title}>Kadra zarządzająca</h2>

                {/* CEO Card */}
                {managementTeam
                    .filter((member) => member.isMainExecutive)
                    .map((executive, index) => (
                        <div key={index} className={styles.ceoCard}>
                            <div className={styles.profileImageContainer}>
                                <Image
                                    src={executive.imageSrc}
                                    alt={`${executive.name} - ${executive.role}`}
                                    width={180}
                                    height={180}
                                    className={styles.profileImage}
                                />
                            </div>
                            <h3 className={styles.ceoName}>
                                {executive.name} - {executive.role}
                            </h3>
                            <p className={styles.ceoDescription}>
                                {executive.description}
                            </p>
                            {executive.phone && (
                                <Link
                                    href={`tel:${executive.phone.replace(
                                        /\s/g,
                                        ""
                                    )}`}
                                    className={styles.contactButton}
                                >
                                    <span className={styles.phoneIcon}>📞</span>{" "}
                                    {executive.phone}
                                </Link>
                            )}
                        </div>
                    ))}

                {/* Regional Managers */}
                <div className={styles.managersGrid}>
                    <h3 className={styles.managersTitle}>
                        Kierownicy Regionalni
                    </h3>
                    <div className={styles.managersContainer}>
                        {managementTeam
                            .filter((member) => !member.isMainExecutive)
                            .map((manager, index) => (
                                <div
                                    key={index}
                                    className={styles.managerCard}
                                    style={{
                                        animationDelay: `${index * 0.2}s`,
                                    }}
                                >
                                    <div
                                        className={styles.profileImageContainer}
                                    >
                                        <Image
                                            src={manager.imageSrc}
                                            alt={`${manager.name} - ${manager.role}`}
                                            width={140}
                                            height={140}
                                            className={styles.profileImage}
                                        />
                                    </div>
                                    <h4 className={styles.managerName}>
                                        {manager.name}
                                    </h4>
                                    <p className={styles.managerRole}>
                                        {manager.role}
                                    </p>
                                    <p className={styles.managerLocation}>
                                        {manager.location}
                                    </p>
                                    {manager.phone && (
                                        <Link
                                            href={`tel:${manager.phone.replace(
                                                /\s/g,
                                                ""
                                            )}`}
                                            className={styles.contactButton}
                                        >
                                            <span className={styles.phoneIcon}>
                                                📞
                                            </span>{" "}
                                            {manager.phone}
                                        </Link>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagementSection;
