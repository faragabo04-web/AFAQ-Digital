import { projectServicesByLink } from "../data/serviceProofMap.js";

function ProjectCard({ item, index, dir }) {
  const isRtl = dir === "rtl";
  const hoverAction = isRtl
    ? item.statusKey === "live-project"
      ? "فتح الموقع"
      : "استعراض النموذج"
    : item.statusKey === "live-project"
      ? "Open Website"
      : "Explore Demo";
  const linkLabel = `${item.button}: ${item.title}`;

  return (
    <article className="project-card project-card--proof reveal">
      <a className="project-card-link" href={item.link} target="_blank" rel="noopener noreferrer" aria-label={linkLabel}>
        <figure className="project-cover">
          <img src={item.image} alt={item.imageAlt} loading={index === 0 ? "eager" : "lazy"} decoding="async" />
          <span className="project-hover-action" aria-hidden="true">
            {hoverAction} <span dir="ltr">↗</span>
          </span>
        </figure>
        <div className="project-body">
          <div className="project-meta">
            <span className={`project-status project-status--${item.statusKey}`}>{item.status}</span>
            <span className="project-type">{item.type}</span>
          </div>
          <h3 className="project-title">{item.title}</h3>
          <p className="project-description">{item.description}</p>
          <span className="project-card-cta" aria-hidden="true">
            <span>{item.button}</span>
            <span className="project-card-cta-arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </a>
    </article>
  );
}

export default function Portfolio({ t, proofFilter, onClearProofFilter }) {
  const visibleItems = t.portfolio.items.filter((item) => item.portfolioVisible !== false);

  const items = proofFilter
    ? visibleItems.filter((item) => (projectServicesByLink[item.link] ?? []).includes(proofFilter.serviceId))
    : visibleItems;

  const backToServices = () => {
    onClearProofFilter();
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section section--work-showcase" id="work">
      <div className="shell">
        <div className="section-intro section-intro--center work-intro">
          <span className="section-kicker">{t.portfolio.eyebrow}</span>
          <h2>{t.portfolio.title}</h2>
          <p>{t.portfolio.description}</p>
        </div>
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
            <ProjectCard item={item} index={index} dir={t.dir} key={item.link} />
          ))}
        </div>
      </div>
    </section>
  );
}