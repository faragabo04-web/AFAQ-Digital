import { whatsappHref } from "../data/content.js";
import Logo from "./Logo.jsx";

const heroChipTargets = [
  "#service-websites",
  "#service-ecommerce",
  "#service-dashboards",
  "#service-google-business",
  "#service-linkedin",
  "#service-ai-assistant"
];

export default function Hero({ t }) {
  return (
    <section className="hero section" id="home">
      <div className="shell hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">{t.hero.badge}</span>
          <h1>{t.hero.headline}</h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="chip-row" aria-label="Services">
            {t.hero.chips.map((chip, index) => (
              <a className="chip chip--link" href={heroChipTargets[index]} key={chip}>
                {chip}
              </a>
            ))}
          </div>
          <p className="location-line">{t.hero.location}</p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#contact">
              {t.hero.primary}
            </a>
            <a className="btn btn--ghost" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <div className="hero-visual orbital-system reveal" aria-label="AFAQ Digital orbital service visual">
          <div className="cosmic-grid" aria-hidden="true" />
          <div className="particle-field" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hero-intelligence-layer" aria-hidden="true">
            <div className="hero-ui-panel hero-ui-panel--analytics">
              <span>{t.hero.chips[2]}</span>
              <strong>+42%</strong>
              <div className="hero-ui-bars">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="hero-ui-panel hero-ui-panel--ai">
              <span>{t.hero.chips[5]}</span>
              <div className="hero-ai-pulse">
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="hero-ui-panel hero-ui-panel--presence">
              <span>{t.hero.chips[4]}</span>
              <strong>ON</strong>
            </div>
            <div className="hero-workflow-map">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="orbit-ring orbit-ring--outer" aria-hidden="true" />
          <div className="orbit-ring orbit-ring--middle" aria-hidden="true" />
          <div className="orbit-ring orbit-ring--inner" aria-hidden="true" />
          <div className="horizon-arc horizon-arc--one" aria-hidden="true" />
          <div className="horizon-arc horizon-arc--two" aria-hidden="true" />
          <div className="orbit-core">
            <span className="core-glow" aria-hidden="true" />
            <Logo variant="main" />
          </div>
          <div className="orbit-track">
            {t.hero.floating.map((label, index) => (
              <div className={`orbit-chip orbit-chip--${index + 1}`} key={label}>
                <Logo variant="icon" className="mini-logo" />
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className="signal-panel signal-panel--one">
            <span />
            <strong>+ Growth Path</strong>
          </div>
          <div className="signal-panel signal-panel--two">
            <span />
            <strong>Digital Flow</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
