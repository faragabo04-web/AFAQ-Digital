import SectionIntro from "./SectionIntro.jsx";

export default function Process({ t }) {
  return (
    <section className="section section--process" id="process">
      <div className="shell">
        <SectionIntro title={t.process.title} description={t.process.description} />
        <div className="process-panel reveal">
          <ol className="process-rail" aria-label={t.process.title}>
            {t.process.steps.map((step) => (
              <li className="process-step" key={step.number}>
                <span className="process-step-number">{step.number}</span>
                <div className="process-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}