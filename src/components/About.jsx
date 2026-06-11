import Logo from "./Logo.jsx";

export default function About({ t }) {
  return (
    <section className="section section--about" id="about">
      <div className="shell about-grid">
        <div className="about-copy reveal">
          <span className="section-kicker">{t.about.subtitle}</span>
          <h2>{t.about.title}</h2>
          {t.about.copy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="quality-callout">
            <h3>{t.about.qualityTitle}</h3>
            <p>{t.about.qualityText}</p>
          </div>
          <p className="founder-line">{t.about.founder}</p>
        </div>
        <div className="brand-card reveal">
          <Logo variant="main" />
          <div className="location-pills">
            {t.about.locations.map((location) => (
              <span key={location}>{location}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
