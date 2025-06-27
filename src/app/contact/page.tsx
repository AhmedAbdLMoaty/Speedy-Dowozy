"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

export default function Contact() {
    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const sectionRef = useRef<HTMLDivElement>(null);

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError("Wypełnij wymagane pola: imię, email, wiadomość.");
            return;
        }
        setSubmitted(true);
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
                    <form
                        className={styles.contactForm}
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        style={{ maxWidth: 520, margin: "0 auto" }}
                    >
                        <label htmlFor="name">Imię i nazwisko*</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <label htmlFor="email">Email*</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                        <label htmlFor="phone">Telefon</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <label htmlFor="message">Wiadomość*</label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className={styles.textarea}
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
                        {submitted ? (
                            <div
                                style={{
                                    color: "#10b981",
                                    fontWeight: 600,
                                    marginTop: 16,
                                }}
                            >
                                Dziękujemy za kontakt! Odpowiemy wkrótce.
                            </div>
                        ) : (
                            <button
                                className={styles.phoneButton}
                                type="submit"
                                style={{
                                    width: "100%",
                                    marginTop: 18,
                                }}
                            >
                                Wyślij wiadomość
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}
