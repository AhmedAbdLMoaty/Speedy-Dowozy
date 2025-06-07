import "./Partners.css";

const Partners = () => {
    const partnerTypes = [
        {
            icon: "🍽️",
            title: "Restauracje",
            description:
                "Zwiększ swoje przychody dzięki naszej platformie dostaw",
            features: [
                "Brak opłat startowych",
                "Wsparcie marketingowe",
                "Analityka sprzedaży",
            ],
            color: "blue",
            buttonText: "Dołącz Teraz",
        },
        {
            icon: "🚗",
            title: "Kierowcy",
            description:
                "Zarabiaj jako niezależny kierowca w elastycznych godzinach",
            features: [
                "Elastyczne godziny",
                "Tygodniowe wypłaty",
                "Ubezpieczenie gratis",
            ],
            color: "green",
            buttonText: "Zostań Kierowcą",
        },
        {
            icon: "🏢",
            title: "Franczyza",
            description:
                "Rozwijaj własny biznes z sprawdzonym modelem franczyzowym",
            features: ["Sprawdzony model", "Pełne szkolenie", "Marketing i IT"],
            color: "purple",
            buttonText: "Dowiedz Się Więcej",
        },
    ];

    return (
        <section className="partners-section">
            <div className="container">
                <div className="partners-header">
                    <h2 className="section-title">Dołącz do Naszej Sieci</h2>
                    <p className="section-subtitle">
                        Zostań częścią największej sieci dostaw w Polsce
                    </p>
                </div>

                <div className="partners-grid">
                    {partnerTypes.map((partner, index) => (
                        <div
                            key={index}
                            className={`partner-card partner-${partner.color}`}
                        >
                            <div className="partner-icon">
                                <span className="icon-emoji">
                                    {partner.icon}
                                </span>
                            </div>
                            <h3 className="partner-title">{partner.title}</h3>
                            <p className="partner-description">
                                {partner.description}
                            </p>

                            <ul className="partner-features">
                                {partner.features.map((feature, idx) => (
                                    <li key={idx} className="partner-feature">
                                        <span className="feature-check">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`partner-btn btn-${partner.color}`}
                            >
                                {partner.buttonText}
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Partners;
