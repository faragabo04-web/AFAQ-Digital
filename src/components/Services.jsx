import SectionIntro from "./SectionIntro.jsx";

const serviceAnchors = [
  ["service-websites"],
  ["service-ecommerce"],
  ["service-dashboards"],
  ["service-google-business"],
  ["service-linkedin"],
  ["service-ai-assistant"]
];

/* Each cover is a distinct dark cinematic scene built from lightweight spans —
   no images, styled entirely in CSS (see "Service cover scenes" in index.css). */
const serviceVisuals = [
  { style: "web", badge: "UI" },
  { style: "commerce", badge: "EC" },
  { style: "dashboard", badge: "BI" },
  { style: "google", badge: "G" },
  { style: "linkedin", badge: "in" },
  { style: "ai", badge: "AI" }
];

const sceneMarkup = {
  /* 1) Websites — browser mockup wired into a motherboard with circuit traces */
  web: (
    <>
      <span className="scene-trace scene-trace--w1" />
      <span className="scene-trace scene-trace--w2" />
      <span className="scene-browser">
        <i className="scene-browser-bar" />
        <i className="scene-block scene-block--band" />
        <i className="scene-block scene-block--col1" />
        <i className="scene-block scene-block--col2" />
      </span>
      <span className="scene-glow-web" />
      <span className="scene-side-panel" />
      <span className="scene-pins" />
    </>
  ),
  /* 2) E-Commerce — product grid wired to a checkout rail and payment chip */
  commerce: (
    <>
      <span className="scene-product" />
      <span className="scene-product scene-product--mid" />
      <span className="scene-product scene-product--end" />
      <span className="scene-trace scene-trace--c" />
      <span className="scene-price-tag" />
      <span className="scene-pay" />
      <span className="scene-checkout">
        <i />
        <i />
        <i />
      </span>
      <span className="scene-pins" />
    </>
  ),
  /* 3) Dashboards — KPI cards, glowing chart, data table, processor chip */
  dashboard: (
    <>
      <span className="scene-kpi" />
      <span className="scene-kpi scene-kpi--two" />
      <span className="scene-cpu scene-cpu--dash" />
      <span className="scene-chart">
        <i style={{ "--h": "40%" }} />
        <i style={{ "--h": "72%" }} />
        <i style={{ "--h": "54%" }} />
        <i style={{ "--h": "90%" }} />
      </span>
      <span className="scene-table" />
      <span className="scene-trend" />
      <span className="scene-trend-dot" />
    </>
  ),
  /* 4) Google Business — location pin, radar, profile panel, signal lines, rating */
  google: (
    <>
      <span className="scene-road" />
      <span className="scene-road scene-road--two" />
      <span className="scene-radar" />
      <span className="scene-pin" />
      <span className="scene-signal scene-signal--one" />
      <span className="scene-signal scene-signal--two" />
      <span className="scene-biz" />
      <span className="scene-rating">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </>
  ),
  /* 5) LinkedIn — profile card, connection graph, professional "in" cue */
  linkedin: (
    <>
      <span className="scene-profile">
        <i className="scene-profile-banner" />
        <i className="scene-profile-avatar" />
        <i className="scene-profile-line scene-profile-line--name" />
        <i className="scene-profile-line" />
      </span>
      <span className="scene-trace scene-trace--l" />
      <span className="scene-network">
        <i />
        <i />
        <i />
      </span>
      <span className="scene-in-mark" />
    </>
  ),
  /* 6) AI Assistant — brain outline, neural cluster, automation flow, chip */
  ai: (
    <>
      <span className="scene-brain" />
      <span className="scene-node scene-node--a" />
      <span className="scene-node scene-node--b" />
      <span className="scene-node scene-node--c" />
      <span className="scene-node scene-node--d" />
      <span className="scene-node scene-node--e" />
      <span className="scene-link scene-link--ab" />
      <span className="scene-link scene-link--bc" />
      <span className="scene-link scene-link--bd" />
      <span className="scene-link scene-link--ce" />
      <span className="scene-cpu scene-cpu--ai" />
      <span className="scene-flow">
        <i />
        <i />
        <i />
      </span>
      <span className="scene-chat">
        <i />
        <i />
        <i />
      </span>
    </>
  )
};

export default function Services({ t }) {
  return (
    <section className="section" id="services">
      <div className="shell">
        <SectionIntro title={t.services.title} description={t.services.description} />
        <div className="card-grid service-grid">
          {t.services.items.map((item, index) => {
            const visual = serviceVisuals[index];

            return (
              <article className={`premium-card service-card service-card--${visual.style} reveal`} id={serviceAnchors[index]?.[0]} key={item.title}>
                {serviceAnchors[index]?.slice(1).map((anchor) => (
                  <span className="service-anchor" id={anchor} key={anchor} aria-hidden="true" />
                ))}
                <div className="service-visual" aria-hidden="true">
                  <div className="service-visual-grid" />
                  <div className={`service-scene service-scene--${visual.style}`}>{sceneMarkup[visual.style]}</div>
                  <span className="service-visual-badge">{visual.badge}</span>
                </div>
                <span className="card-icon">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
