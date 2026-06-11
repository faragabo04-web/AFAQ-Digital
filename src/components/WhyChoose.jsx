export default function WhyChoose({ t }) {
  return (
    <section className="section section--soft" id="why">
      <div className="shell">
        <div className="section-intro">
          <span className="section-kicker">Premium Execution</span>
          <h2>{t.why.title}</h2>
        </div>
        <div className="why-grid">
          {t.why.items.map((item, index) => (
            <article className="premium-card why-card reveal" key={item.title}>
              <div className="why-icon" aria-hidden="true">
                {["◜", "◇", "◡", "✦"][index]}
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
