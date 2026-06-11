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
  const highlightService = (href) => {
    window.setTimeout(() => {
      const target = document.querySelector(href);
      const card = target?.closest(".service-card") || target;

      if (!card) return;
      card.classList.remove("service-card--highlight");
      window.requestAnimationFrame(() => {
        card.classList.add("service-card--highlight");
        window.setTimeout(() => card.classList.remove("service-card--highlight"), 1800);
      });
    }, 260);
  };

  return (
    <section className="hero section" id="home">
      {/* Dubai + space atmosphere: layered skyline inspired by real Dubai architecture
          (Burj Khalifa tiers + spire, Burj Al Arab sail, Emirates Towers angled crown).
          Pure SVG — no image assets, no copyright concerns. */}
      <div className="hero-skyline" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="afaqSkylineFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3ecfff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#030710" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="afaqSkylineFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6b66f" stopOpacity="0.4" />
              <stop offset="58%" stopColor="#d6b66f" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#030710" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="afaqHorizonLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3ecfff" stopOpacity="0" />
              <stop offset="45%" stopColor="#d6b66f" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#3ecfff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3ecfff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="afaqHorizonGlow" cx="50%" cy="100%" r="65%">
              <stop offset="0%" stopColor="#3ecfff" stopOpacity="0.16" />
              <stop offset="55%" stopColor="#d6b66f" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#030710" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="100" width="1440" height="220" fill="url(#afaqHorizonGlow)" />
          {/* Far depth layer — soft distant towers in cool atmospheric haze */}
          <path
            fill="url(#afaqSkylineFar)"
            d="M0 320 V252 H78 V230 H158 V262 H242 V216 H330 V246 H424 V204 H472 V238 H562 V260 H648 V234 H766 V212 H844 V244 H932 V220 H1022 V250 H1104 V208 H1184 V240 H1282 V224 H1362 V254 H1440 V320 Z"
          />
          {/* Near layer — landmark silhouettes */}
          <path
            fill="url(#afaqSkylineFill)"
            d="M0 320 L0 270 L48 270 L48 242 L90 242 L90 282 L138 282 L138 236 L178 236 L178 266 L240 266 L240 296 L296 296
               L300 296 L300 208 C300 122 316 102 350 94 C358 168 361 246 361 296 L420 296
               L420 252 L460 252 L460 276 L520 276 L520 240 L560 240 L560 268 L612 268 L612 292
               L630 292 L630 254 L652 254 L652 198 L670 198 L670 146 L686 146 L686 92 L700 92 L700 46 L708 46 L708 14 L714 14 L718 0 L722 14 L728 14 L728 46 L736 46 L736 92 L750 92 L750 146 L766 146 L766 198 L784 198 L784 254 L806 254 L806 292
               L870 292 L870 250 L912 250 L912 274 L958 274 L958 210 L990 192 L998 274 L1050 274
               L1050 238 L1092 238 L1092 264 L1148 264 L1148 222 L1190 222 L1190 252 L1248 252 L1248 286 L1304 286 L1304 246 L1352 246 L1352 272 L1400 272 L1400 296 L1440 296 L1440 320 Z"
          />
          {/* Faint city lights along the skyline base */}
          <g fill="#f0d79a" opacity="0.4">
            <circle cx="64" cy="288" r="1.2" />
            <circle cx="160" cy="276" r="1.1" />
            <circle cx="330" cy="262" r="1.2" />
            <circle cx="438" cy="282" r="1.1" />
            <circle cx="540" cy="270" r="1.2" />
            <circle cx="718" cy="232" r="1.3" />
            <circle cx="700" cy="268" r="1.1" />
            <circle cx="740" cy="268" r="1.1" />
            <circle cx="890" cy="280" r="1.1" />
            <circle cx="1070" cy="266" r="1.2" />
            <circle cx="1168" cy="252" r="1.1" />
            <circle cx="1326" cy="274" r="1.2" />
          </g>
          <g fill="#3ecfff" opacity="0.32">
            <circle cx="246" cy="284" r="1.1" />
            <circle cx="612" cy="280" r="1.1" />
            <circle cx="976" cy="244" r="1.2" />
            <circle cx="1248" cy="270" r="1.1" />
          </g>
          <rect x="0" y="318" width="1440" height="2" fill="url(#afaqHorizonLine)" />
        </svg>
      </div>
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
          <div className="hero-service-strip" aria-label="Services">
            <div className="hero-service-strip-inner">
              {[...t.hero.chips, ...t.hero.chips].map((service, index) => {
                const target = heroChipTargets[index % heroChipTargets.length];

                return (
                  <a
                    href={target}
                    key={`${service}-${index}`}
                    onClick={() => highlightService(target)}
                    aria-hidden={index >= t.hero.chips.length}
                    tabIndex={index >= t.hero.chips.length ? -1 : undefined}
                  >
                    {service}
                  </a>
                );
              })}
            </div>
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
