import { useState } from "react";
import SectionIntro from "./SectionIntro.jsx";

export default function FAQ({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section" id="faq">
      <div className="shell faq-shell">
        <SectionIntro title={t.faq.title} description={t.faq.subtitle} />
        <div className="faq-list">
          {t.faq.items.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `faq-question-${index + 1}`;
            const answerId = `faq-answer-${index + 1}`;
            return (
              <article className={`faq-item ${open ? "is-open" : ""}`} key={item.question}>
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  aria-controls={answerId}
                >
                  <span>{item.question}</span>
                  <span className="faq-plus">{open ? "−" : "+"}</span>
                </button>
                <div className="faq-answer" id={answerId} role="region" aria-labelledby={buttonId}>
                  <p>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
