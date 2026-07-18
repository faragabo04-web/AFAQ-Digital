import { LEAD_FORM_FIELDS } from "../../data/assistantFlow.js";

const ROW_FIELDS = [
  LEAD_FORM_FIELDS.FULL_NAME,
  LEAD_FORM_FIELDS.WHATSAPP_NUMBER,
  LEAD_FORM_FIELDS.BUSINESS_NAME,
  LEAD_FORM_FIELDS.SERVICE_NEEDED,
  LEAD_FORM_FIELDS.PRIMARY_GOAL,
  LEAD_FORM_FIELDS.PROJECT_DETAILS,
  LEAD_FORM_FIELDS.PREFERRED_START
];

// SUMMARY screen — read-only recap of the values already sitting in
// AssistantWidget's lifted state. No network call, no persistence: this is
// purely a local confirmation step with an explicit, isolated notice that
// submission wiring lands in a later stage.
export default function ProjectLeadReview({ t, data, onEdit, onBack }) {
  const copy = t.smartAssistant.review;
  const leadFormCopy = t.smartAssistant.leadForm;

  const resolveDisplay = (field) => {
    const raw = data[field];
    if (!raw) return "—";
    if (field === LEAD_FORM_FIELDS.SERVICE_NEEDED) return leadFormCopy.serviceOptions[raw] || raw;
    if (field === LEAD_FORM_FIELDS.PRIMARY_GOAL) return leadFormCopy.goalOptions[raw] || raw;
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
        {ROW_FIELDS.map((field) => (
          <div className="sa-review__row" key={field}>
            <dt>{copy.labels[field]}</dt>
            <dd>{resolveDisplay(field)}</dd>
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
        <button type="button" className="sa-review__edit" onClick={onEdit}>
          {copy.editAction}
        </button>
        <button type="button" className="sa-review__back" onClick={onBack}>
          {copy.backAction}
        </button>
      </div>
    </div>
  );
}
