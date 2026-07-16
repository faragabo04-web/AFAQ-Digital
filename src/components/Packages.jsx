export default function Packages({ t }) {
  return (
    <section className="section section--solutions" id="packages">
      <div className="shell">
        <div className="section-intro section-intro--center solutions-intro">
          <span className="section-kicker">{t.packages.eyebrow}</span>
          <h2>{t.packages.title}</h2>
          <p>{t.packages.description}</p>
        </div>
        <div className="solutions-grid">
          {t.packages.items.map((item, index) => (
            <article className={`solution-card reveal ${index === 1 ? "solution-card--featured" : ""}`} key={item.title}>
              <div className="solution-card-topline">
                <span className="solution-number">{String(index + 1).padStart(2, "0")}</span>
                {item.badge && <span className="solution-badge">{item.badge}</span>}
              </div>
              <h3>{item.title}</h3>
              <p className="solution-fit">{item.fit}</p>
              <p className="solution-text">{item.text}</p>
              <ul className="solution-features">
                {item.includes.map((include) => (
                  <li key={include}>{include}</li>
                ))}
              </ul>
              {item.scope && <p className="solution-scope">{item.scope}</p>}
              <a className="solution-cta" href="#contact">
                <span>{t.packages.cta}</span>
                <span className="solution-cta-arrow" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
        <p className="tailored-note">{t.packages.quoteNote}</p>
      </div>
    </section>
  );
}