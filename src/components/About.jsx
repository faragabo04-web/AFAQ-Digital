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
          <p className="founder-line">{t.about.founder}</p>
        </div>
        <div className="brand-card about-ecosystem reveal" aria-label={t.about.visualLabel}>
          <div className="ecosystem-stage">
            <svg className="ecosystem-orbits" viewBox="0 0 420 320" aria-hidden="true" focusable="false">
              <ellipse className="ecosystem-orbit ecosystem-orbit--one" cx="210" cy="160" rx="168" ry="82" />
              <ellipse className="ecosystem-orbit ecosystem-orbit--two" cx="210" cy="160" rx="132" ry="116" />
              <ellipse className="ecosystem-orbit ecosystem-orbit--three" cx="210" cy="160" rx="178" ry="56" />
            </svg>
            <div className="ecosystem-center">
              <Logo variant="main" />
            </div>
            <ul className="ecosystem-nodes" aria-label={t.about.visualLabel}>
              {t.about.ecosystem.map((item, index) => (
                <li className={`ecosystem-node ecosystem-node--${index + 1}`} key={item}>
                  <span aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="location-pills" aria-label={t.about.marketsLabel}>
            {t.about.locations.map((location) => (
              <span key={location}>{location}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
