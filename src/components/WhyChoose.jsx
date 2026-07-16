export default function WhyChoose({ t }) {
  const title =
    t.dir === "rtl" ? (
      <>
        لماذا تختار <bdi dir="ltr">AFAQ Digital</bdi>؟
      </>
    ) : (
      t.why.title
    );

  return (
    <section className="section section--soft section--why" id="why">
      <div className="shell why-shell">
        <div className="section-intro why-intro">
          <span className="section-kicker">{t.why.eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <div className="why-grid">
          {t.why.items.map((item, index) => (
            <article className="premium-card why-card reveal" key={item.title}>
              <div className="why-icon" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
