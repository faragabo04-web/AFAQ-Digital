// OPEN_MENU screen inside the drawer: a branded welcome introduction plus
// the two Stage-6B-1 entry choices, presented as one coherent system (no
// choice looks "selected by default" — distinction comes only from a
// CSS-only index mark, not a permanent accent border).
export default function EntryChoices({ t, onChooseQuickGuidance, onChooseLeadForm }) {
  const welcome = t.smartAssistant.welcome;
  const copy = t.smartAssistant.entryMenu;

  return (
    <div className="sa-entry">
      <div className="sa-welcome">
        <span className="sa-welcome__eyebrow">{welcome.eyebrow}</span>
        <h2 className="sa-welcome__heading" id="sa-drawer-title">
          {welcome.heading}
        </h2>
        <p className="sa-welcome__body" id="sa-drawer-desc">
          {welcome.body}
        </p>
      </div>
      <div className="sa-entry__choices">
        <button
          type="button"
          className="sa-entry__choice sa-entry__choice--guidance"
          onClick={onChooseQuickGuidance}
        >
          <span className="sa-entry__choice-index" aria-hidden="true">
            01
          </span>
          <span className="sa-entry__choice-text">
            <span className="sa-entry__choice-title">{copy.quickGuidance.title}</span>
            <span className="sa-entry__choice-desc">{copy.quickGuidance.description}</span>
          </span>
          <span className="sa-entry__choice-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <button
          type="button"
          className="sa-entry__choice sa-entry__choice--details"
          onClick={onChooseLeadForm}
        >
          <span className="sa-entry__choice-index" aria-hidden="true">
            02
          </span>
          <span className="sa-entry__choice-text">
            <span className="sa-entry__choice-title">{copy.leadForm.title}</span>
            <span className="sa-entry__choice-desc">{copy.leadForm.description}</span>
          </span>
          <span className="sa-entry__choice-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
