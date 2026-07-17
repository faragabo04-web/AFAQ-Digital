import AboutEcosystem from "./AboutEcosystem.jsx";

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
        <AboutEcosystem t={t} />
      </div>
    </section>
  );
}
