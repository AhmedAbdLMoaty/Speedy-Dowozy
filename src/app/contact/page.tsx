"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/mgvydbey", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setSubmitted(true);
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                const errorData = await response.json();
                console.error("Formspree error:", errorData);
                throw new Error("Wystąpił problem z wysłaniem wiadomości");
            }
        } catch (err) {
            setError(
                "Wystąpił problem z wysłaniem wiadomości. Spróbuj ponownie później."
            );
            console.error("Error sending message:", err);
        } finally {
            setLoading(false);
        }
    };

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
                            Formularz kontaktowy
                        </h2>
                        <p className={styles.contactDescription}>
                            Skorzystaj z poniższego formularza, aby skontaktować
                            się z nami. Odpowiemy najszybciej jak to możliwe.
                        </p>
                    </div>

                    {submitted ? (
                        <div
                            style={{
                                maxWidth: 520,
                                margin: "0 auto",
                                padding: "30px",
                                textAlign: "center",
                                backgroundColor: "#f0f9f4",
                                borderRadius: "8px",
                                color: "#E91E63",
                                fontWeight: 600,
                            }}
                        >
                            <h3
                                style={{
                                    marginBottom: "15px",
                                    color: "#E91E63",
                                }}
                            >
                                Dziękujemy za kontakt!
                            </h3>
                            <p style={{ color: "#E91E63" }}>
                                Twoja wiadomość została wysłana. Odpowiemy
                                najszybciej jak to możliwe.
                            </p>
                            <button
                                className={styles.phoneButton}
                                onClick={() => setSubmitted(false)}
                                style={{
                                    marginTop: "20px",
                                    padding: "10px 20px",
                                }}
                            >
                                Wyślij kolejną wiadomość
                            </button>
                        </div>
                    ) : (
                        <form
                            ref={formRef}
                            className={styles.contactForm}
                            onSubmit={handleSubmit}
                            style={{ maxWidth: 520, margin: "0 auto" }}
                        >
                            <label htmlFor="name">Imię i nazwisko*</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={styles.input}
                            />
                            <label htmlFor="email">Email*</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={styles.input}
                            />
                            <label htmlFor="phone">Telefon</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className={styles.input}
                            />
                            <label htmlFor="message">Wiadomość*</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                className={styles.textarea}
                            />
                            <input
                                type="hidden"
                                name="_subject"
                                value="Nowy kontakt ze strony Speedy Dowozy"
                            />
                            <input type="hidden" name="_format" value="json" />
                            <input
                                type="text"
                                name="_gotcha"
                                style={{ display: "none" }}
                            />

                            {error && (
                                <div
                                    style={{
                                        color: "#ff4d4f",
                                        marginBottom: 12,
                                    }}
                                >
                                    {error}
                                </div>
                            )}

                            <button
                                className={styles.phoneButton}
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "100%",
                                    marginTop: 18,
                                    opacity: loading ? 0.7 : 1,
                                    cursor: loading ? "not-allowed" : "pointer",
                                }}
                            >
                                {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
