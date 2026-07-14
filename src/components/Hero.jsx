export default function Hero({ t }) {
  return (
    <section className="hero section" id="home">
      <div className="shell hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">{t.hero.badge}</span>
          <h1>{t.hero.headline}</h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#contact">
              {t.hero.primary}
            </a>
            <a className="btn btn--ghost" href="#work">
              {t.hero.secondary}
            </a>
          </div>
          <ul className="hero-trust">
            {t.hero.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Decorative premium website mockup — one calm visual, no data inside */}
        <div className="hero-showcase reveal" aria-hidden="true">
          <div className="mockup-browser">
            <div className="mockup-bar">
              <span />
              <span />
              <span />
              <em>afaqdigital.ae</em>
            </div>
            <div className="mockup-screen">
              <div className="mockup-nav">
                <span className="mockup-logo" />
                <span className="mockup-links">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="mockup-pill" />
              </div>
              <div className="mockup-hero">
                <span className="mockup-line mockup-line--title" />
                <span className="mockup-line" />
                <span className="mockup-line mockup-line--short" />
                <span className="mockup-btns">
                  <i />
                  <i />
                </span>
              </div>
              <div className="mockup-cards">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="mockup-float mockup-float--lang">EN · عربي</div>
          <div className="mockup-float mockup-float--growth">
            <span className="mockup-spark">
              <i />
              <i />
              <i />
              <i />
            </span>
            <strong>{t.hero.floatNote}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
