import burjKhalifaHero from "../assets/hero/afaq-burj-khalifa-hero-final.png";

export default function Hero({ t }) {
  return (
    <section className="hero section" id="home">
      <picture className="hero-media" aria-hidden="true">
        <source srcSet={burjKhalifaHero} type="image/png" />
        <img
          className="hero-media-image"
          src={burjKhalifaHero}
          alt=""
          width="1672"
          height="941"
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
