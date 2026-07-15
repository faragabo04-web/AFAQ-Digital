import SectionIntro from "./SectionIntro.jsx";
import { serviceProof, OPEN_ASSISTANT_EVENT } from "../data/serviceProofMap.js";
import premiumWebsitesCover from "../assets/services/01-premium-websites-cover.webp";
import ecommerceStoresCover from "../assets/services/02-ecommerce-stores-cover.webp";
import businessSystemsCover from "../assets/services/03-business-systems-cover.webp";
import googleBusinessCover from "../assets/services/04-google-business-profile-cover.webp";
import linkedinOptimizationCover from "../assets/services/05-linkedin-optimization-cover.webp";
import aiAssistantCover from "../assets/services/06-ai-website-assistant-cover.webp";

const checkIcon = (
  <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path d="M3.2 8.4l3 3 6.6-6.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const covers = {
  websites: premiumWebsitesCover,
  ecommerce: ecommerceStoresCover,
  dashboards: businessSystemsCover,
  "google-business": googleBusinessCover,
  linkedin: linkedinOptimizationCover,
  "ai-assistant": aiAssistantCover
};

function ServiceCta({ item, onShowProof }) {
  const proof = serviceProof[item.id] ?? { proof: "contact", url: "#contact" };

  if (proof.proof === "work") {
    return (
      <button className="svc2-cta" type="button" onClick={() => onShowProof(item.id, item.title)}>
        {item.cta} <span aria-hidden="true">→</span>
      </button>
    );
  }
  if (proof.proof === "assistant") {
    return (
      <button className="svc2-cta" type="button" onClick={() => window.dispatchEvent(new CustomEvent(OPEN_ASSISTANT_EVENT))}>
        {item.cta} <span aria-hidden="true">→</span>
      </button>
    );
  }
  if (proof.proof === "external") {
    return (
      <a className="svc2-cta" href={proof.url} target="_blank" rel="noopener noreferrer">
        {item.cta} <span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <a className="svc2-cta" href={proof.url}>
      {item.cta} <span aria-hidden="true">→</span>
    </a>
  );
}

export default function Services({ t, onShowProof }) {
  return (
    <section className="section section--services-v2" id="services">
      <div className="shell">
        <SectionIntro title={t.services.title} description={t.services.description} />
        <div className="svc2-grid">
          {t.services.items.map((item) => (
            <article className={`svc2-card svc2-card--${item.id} service-card reveal`} id={`service-${item.id}`} key={item.id}>
              <figure className="svc2-cover">
                <img src={covers[item.id]} alt="" loading="lazy" decoding="async" />
              </figure>
              <div className="svc2-content">
                <h3>{item.title}</h3>
                <p className="svc2-tagline">{item.tagline}</p>
                <p className="svc2-text">{item.text}</p>
                <ul className="svc2-points">
                  {item.points.map((point) => (
                    <li key={point}>
                      <span className="svc2-check" aria-hidden="true">{checkIcon}</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <ServiceCta item={item} onShowProof={onShowProof} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
