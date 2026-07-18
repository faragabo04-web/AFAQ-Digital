import Logo from "../Logo.jsx";

// Non-modal timed teaser. Never steals focus, never traps focus, never
// uses aria-modal — it is a passive, dismissible nudge that sits in normal
// document flow near the launcher until the user acts on it. Both actions
// open the drawer directly at their destination state — no intermediate
// menu click required.
export default function TeaserPrompt({ t, onOpenLeadForm, onOpenQuickGuidance, onDismiss }) {
  const copy = t.smartAssistant.teaser;

  return (
    <div className="sa-teaser">
      <button type="button" className="sa-teaser__close" aria-label={copy.closeAriaLabel} onClick={onDismiss}>
        ×
      </button>
      <div className="sa-teaser__brand">
        <span className="sa-teaser__brand-mark" aria-hidden="true">
          <Logo variant="icon" />
        </span>
        <strong className="sa-teaser__title">{copy.title}</strong>
      </div>
      <p className="sa-teaser__body">{copy.body}</p>
      <div className="sa-teaser__actions">
        <button type="button" className="sa-teaser__cta sa-teaser__cta--primary" onClick={onOpenLeadForm}>
          {copy.primaryAction}
          <span className="sa-teaser__cta-arrow" aria-hidden="true">
            →
          </span>
        </button>
        <button type="button" className="sa-teaser__cta sa-teaser__cta--secondary" onClick={onOpenQuickGuidance}>
          {copy.secondaryAction}
        </button>
      </div>
    </div>
  );
}
