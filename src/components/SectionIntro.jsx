export default function SectionIntro({ title, description, centered = true }) {
  return (
    <div className={`section-intro ${centered ? "section-intro--center" : ""}`}>
      <span className="section-kicker">AFAQ Digital</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
