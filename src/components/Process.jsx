import SectionIntro from "./SectionIntro.jsx";

export default function Process({ t }) {
  return (
    <section className="section section--soft" id="process">
      <div className="shell">
        <SectionIntro title={t.process.title} description={t.process.description} />
        <div className="process-list">
          {t.process.steps.map((step) => (
            <article className="process-card reveal" key={step.number}>
              <span className="process-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
