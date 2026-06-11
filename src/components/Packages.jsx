import SectionIntro from "./SectionIntro.jsx";

export default function Packages({ t }) {
  return (
    <section className="section" id="packages">
      <div className="shell">
        <SectionIntro title={t.packages.title} description={t.packages.description} />
        <div className="packages-grid">
          {t.packages.items.map((item, index) => (
            <article className={`package-card reveal ${index === 1 ? "is-featured" : ""}`} key={item.title}>
              <span className="package-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <ul>
                {item.includes.map((include) => (
                  <li key={include}>{include}</li>
                ))}
              </ul>
              <a className="btn btn--primary" href="#contact">
                {t.packages.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="addons-line">{t.packages.addons}</p>
      </div>
    </section>
  );
}
