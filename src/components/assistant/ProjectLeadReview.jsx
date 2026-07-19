import { LEAD_FORM_FIELDS } from "../../data/assistantFlow.js";

// Stage 7A: short, flat review — no per-section grouping/editing now that
// the direct intake is a single screen. Only fields that contain a value
// are shown. Primary Project Goal is intentionally never part of a
// direct-intake submission, so it never appears here.
const REVIEW_FIELDS = [
  LEAD_FORM_FIELDS.FULL_NAME,
  LEAD_FORM_FIELDS.WHATSAPP_NUMBER,
  LEAD_FORM_FIELDS.BUSINESS_NAME,
  LEAD_FORM_FIELDS.SERVICE_NEEDED,
  LEAD_FORM_FIELDS.PREFERRED_START,
  LEAD_FORM_FIELDS.PROJECT_DETAILS
];

// WhatsApp numbers always read left-to-right so "+971" stays in the correct
// order in Arabic mode. Free-text/name values get "auto" so mixed-language
// content displays naturally without forcing the whole review card to LTR.
const LTR_VALUE_FIELDS = new Set([LEAD_FORM_FIELDS.WHATSAPP_NUMBER]);
const AUTO_DIR_VALUE_FIELDS = new Set([
  LEAD_FORM_FIELDS.FULL_NAME,
  LEAD_FORM_FIELDS.BUSINESS_NAME,
  LEAD_FORM_FIELDS.PROJECT_DETAILS
]);

const resolveValueDir = (field) => {
  if (LTR_VALUE_FIELDS.has(field)) return "ltr";
  if (AUTO_DIR_VALUE_FIELDS.has(field)) return "auto";
  return undefined;
};

// SUMMARY screen — read-only recap of the values already sitting in
// AssistantWidget's lifted state. No network logic of its own; onSubmit is
// owned and executed entirely by AssistantWidget so the submit/leadId/retry
// lifecycle stays in one place.
export default function ProjectLeadReview({ t, data, onEdit, onBack, onSubmit, isSubmitting }) {
  const copy = t.smartAssistant.review;
  const leadFormCopy = t.smartAssistant.leadForm;

  const resolveDisplay = (field) => {
    const raw = data[field];
    if (field === LEAD_FORM_FIELDS.SERVICE_NEEDED) return leadFormCopy.serviceOptions[raw] || raw;
    if (field === LEAD_FORM_FIELDS.PREFERRED_START) return leadFormCopy.startOptions[raw] || raw;
    return raw;
  };

  return (
    <div className="sa-review">
      <span className="sa-review__eyebrow">{copy.eyebrow}</span>
      <h2 className="sa-review__heading" id="sa-drawer-title">
        {copy.heading}
      </h2>
      <p className="sa-review__body" id="sa-drawer-desc">
        {copy.body}
      </p>

      <dl className="sa-review__list">
        {REVIEW_FIELDS.filter((field) => data[field]).map((field) => (
          <div className="sa-review__row" key={field}>
            <dt>{copy.labels[field]}</dt>
            <dd dir={resolveValueDir(field)}>{resolveDisplay(field)}</dd>
          </div>
        ))}
        <div className="sa-review__row">
          <dt>{copy.labels[LEAD_FORM_FIELDS.CONTACT_CONSENT]}</dt>
          <dd>{data.contactConsent ? copy.consentConfirmed : "—"}</dd>
        </div>
      </dl>

      <p className="sa-review__notice" role="note">
        {copy.pendingNotice}
      </p>

      <div className="sa-review__actions">
        <button type="button" className="sa-lead__submit" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? copy.submitting : copy.submitAction}
        </button>
        <button type="button" className="sa-review__edit" onClick={onEdit} disabled={isSubmitting}>
          {copy.editAction}
        </button>
        <button
          type="button"
          className="sa-review__back sa-review__back--quiet"
          onClick={onBack}
          disabled={isSubmitting}
        >
          {copy.backAction}
        </button>
      </div>
    </div>
  );
}
