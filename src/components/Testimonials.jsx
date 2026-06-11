import SectionIntro from "./SectionIntro.jsx";

export default function Testimonials({ t }) {
  return (
    <section className="section section--testimonials" id="feedback">
      <div className="shell">
        <SectionIntro title={t.testimonials.title} description={t.testimonials.subtitle} />
        <p className="testimonial-trust-note reveal">{t.testimonials.trustLine}</p>
        <div className="testimonial-grid" aria-label={t.testimonials.title}>
          {t.testimonials.items.map((item, index) => (
            <article className="testimonial-card reveal" key={item.label}>
              <div className="testimonial-card-head">
                <span className="testimonial-avatar" aria-hidden="true">{item.icon}</span>
                <span className="testimonial-tag">{item.tag}</span>
              </div>
              <p>{item.text}</p>
              <div className="testimonial-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </div>
            </article>
          ))}
        </div>
        <div className="testimonial-cta reveal">
          <p>{t.testimonials.ctaText}</p>
          <a className="btn btn--primary" href="#contact">
            {t.testimonials.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
