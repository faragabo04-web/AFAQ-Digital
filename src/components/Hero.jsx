export default function Hero({ t }) {
  return (
    <section className="hero section" id="home">
      <picture className="hero-media" aria-hidden="true">
        <source
          media="(max-width: 760px)"
          srcSet="/images/lifestyle-5-mobile.webp"
          type="image/webp"
        />
        <source media="(max-width: 760px)" srcSet="/images/lifestyle-5-mobile.jpg" type="image/jpeg" />
        <source srcSet="/images/lifestyle-5.webp" type="image/webp" />
        <img
          className="hero-media-image"
          src="/images/lifestyle-5.jpg"
          alt=""
          width="1024"
          height="1024"
          loading="eager"
          decoding="async"
        />
      </picture>

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
      </div>
    </section>
  );
}
