import SectionIntro from "./SectionIntro.jsx";
import { projectServicesByLink } from "../data/serviceProofMap.js";

// Keyed by project link (stable across languages and list order) rather than
// array position, so reordering portfolio.items in content.js can never mismatch a card's theme.
const projectVisualsByLink = {
  "https://zawianasr.com/": { badge: "Z", style: "zawia", nav: ["Services", "Booking", "WhatsApp"], ctas: ["Book", "Maps"] },
  "https://faragabo04-web.github.io/Cool-Grand-restaurant/": { badge: "CG", style: "cool", nav: ["Menu", "Order", "Location"], ctas: ["Menu", "Order"] },
  "https://ahmed-farouk-vante-noir.vercel.app/": { badge: "VN", style: "vante", nav: ["Brand", "Work", "Story"], ctas: ["View", "Brand"] },
  "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/": { badge: "MM", style: "play", nav: ["Gallery", "Pricing", "Booking"], ctas: ["Gallery", "Book"] },
  "https://faragabo04-web.github.io/beauty-pets/": { badge: "BP", style: "pets", nav: ["Grooming", "Products", "Care"], ctas: ["Services", "Shop"] },
  "https://www.muyedmohammed.xyz/": { badge: "M", style: "muyed", nav: ["Services", "Work", "WhatsApp"], ctas: ["View", "Chat"] }
};

const defaultVisual = { badge: "•", style: "builder", nav: ["Preview"], ctas: ["View"] };

const cardLabels = {
  en: { comingSoon: "Coming Soon" },
  ar: { comingSoon: "قريبًا" }
};

function ProjectCard({ item, visual, index, labels }) {
  const active = Boolean(item.link);
  const isVideoStyle = visual.style === "muyed";
  const titleContent = (
    <>
      <span className={`project-logo-badge project-logo-badge--${visual.style}`}>{visual.badge}</span>
      <span>{item.title}</span>
    </>
  );

  return (
    <article className={`project-card project-card--${visual.style} reveal ${active ? "is-active" : "is-disabled"}`}>
      <div className="project-preview">
        <div className={`preview-window preview-window--${visual.style}`} aria-hidden="true">
          <div className="preview-browser">
            <div className="preview-browser-bar">
              <span />
              <span />
              <span />
              <em>{visual.nav.join(" · ")}</em>
            </div>
            <div className="preview-screen">
              <div className="preview-hero-block">
                <span className="preview-mark">
                  {isVideoStyle ? <span className="preview-play-icon" aria-hidden="true" /> : visual.badge}
                </span>
                <div>
                  <span className="preview-line preview-line--wide" />
                  <span className={`preview-line ${isVideoStyle ? "preview-line--timeline" : ""}`} />
                  <span className="preview-line preview-line--short" />
                </div>
              </div>
              <div className={`preview-ui-grid ${isVideoStyle ? "preview-ui-grid--reel" : ""}`}>
                <span />
                <span />
                <span />
              </div>
              <div className="preview-cta-row">
                {visual.ctas.map((cta) => (
                  <span key={cta}>{cta}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="project-body">
        <div className="project-heading">
          <span className="project-label">{item.label}</span>
          <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="project-title">
          {active ? (
            <a href={item.link} target="_blank" rel="noreferrer">
              {titleContent}
            </a>
          ) : (
            <span>{titleContent}</span>
          )}
        </h3>
        <p>{item.description}</p>
        {item.impact && <p className="impact-note">{item.impact}</p>}
        <div className="tag-row">
          {item.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {active ? (
          <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
            {item.button}
          </a>
        ) : (
          <span className="text-link text-link--disabled">{labels?.comingSoon || item.button}</span>
        )}
      </div>
    </article>
  );
}

export default function Portfolio({ t, proofFilter, onClearProofFilter }) {
  const lang = t.dir === "rtl" ? "ar" : "en";
  const labels = cardLabels[lang];
  const items = proofFilter
    ? t.portfolio.items.filter((item) => (projectServicesByLink[item.link] ?? []).includes(proofFilter.serviceId))
    : t.portfolio.items;

  const backToServices = () => {
    onClearProofFilter();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionIntro title={t.portfolio.title} description={t.portfolio.description} />
        {proofFilter && (
          <div className="proof-bar reveal" role="status">
            <p className="proof-bar-label">
              <span className="proof-bar-kicker">{t.services.proofBar.kicker}</span>
              <strong>{proofFilter.title}</strong>
            </p>
            <div className="proof-bar-actions">
              <button type="button" onClick={onClearProofFilter}>
                {t.services.proofBar.showAll}
              </button>
              <button type="button" onClick={backToServices}>
                {t.services.proofBar.back}
              </button>
            </div>
          </div>
        )}
        <div className="portfolio-grid">
          {items.map((item, index) => (
            <ProjectCard
              item={item}
              visual={projectVisualsByLink[item.link] ?? defaultVisual}
              index={index}
              key={item.link ?? item.title}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
