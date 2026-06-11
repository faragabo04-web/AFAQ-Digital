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
            return (
              <article className={`faq-item ${open ? "is-open" : ""}`} key={item.question}>
                <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open}>
                  <span>{item.question}</span>
                  <span className="faq-plus">{open ? "−" : "+"}</span>
                </button>
                <div className="faq-answer">
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
