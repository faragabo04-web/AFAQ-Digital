import { LEAD_FORM_FIELDS } from "../../data/assistantFlow.js";

const SECTION_FIELDS = {
  contact: [LEAD_FORM_FIELDS.FULL_NAME, LEAD_FORM_FIELDS.WHATSAPP_NUMBER, LEAD_FORM_FIELDS.BUSINESS_NAME],
  direction: [LEAD_FORM_FIELDS.SERVICE_NEEDED, LEAD_FORM_FIELDS.PRIMARY_GOAL, LEAD_FORM_FIELDS.PREFERRED_START],
  brief: [LEAD_FORM_FIELDS.PROJECT_DETAILS, LEAD_FORM_FIELDS.CONTACT_CONSENT]
};

// Matches ProjectLeadForm.jsx's step numbering exactly, so a section's Edit
// action reopens LEAD_FORM at the right step.
const SECTION_STEPS = { contact: 1, direction: 2, brief: 3 };

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
// AssistantWidget's lifted state, grouped into the same three sections as
// the guided intake (Stage 6B-1G). This view has no network logic of its
// own; onSubmit is owned and executed entirely by AssistantWidget so the
// submit/leadId/retry lifecycle stays in one place.
export default function ProjectLeadReview({ t, data, onEditSection, onBack, onSubmit, isSubmitting }) {
  const copy = t.smartAssistant.review;
  const leadFormCopy = t.smartAssistant.leadForm;

  const resolveDisplay = (field) => {
    if (field === LEAD_FORM_FIELDS.CONTACT_CONSENT) return data.contactConsent ? copy.consentConfirmed : "—";
    const raw = data[field];
    if (!raw) return "—";
    if (field === LEAD_FORM_FIELDS.SERVICE_NEEDED) return leadFormCopy.serviceOptions[raw] || raw;
    if (field === LEAD_FORM_FIELDS.PRIMARY_GOAL) return leadFormCopy.goalOptions[raw] || raw;
    if (field === LEAD_FORM_FIELDS.PREFERRED_START) return leadFormCopy.startOptions[raw] || raw;
    return raw;
  };

  const renderSection = (sectionKey) => (
    <section className="sa-review__section" key={sectionKey}>
      <div className="sa-review__section-head">
        <h3 className="sa-review__section-title">{leadFormCopy.steps[sectionKey].title}</h3>
        <button
          type="button"
          className="sa-review__section-edit"
          onClick={() => onEditSection(SECTION_STEPS[sectionKey])}
          disabled={isSubmitting}
        >
          {copy.editSectionAction}
        </button>
      </div>
      <dl className="sa-review__list">
        {SECTION_FIELDS[sectionKey]
          .filter((field) => field !== LEAD_FORM_FIELDS.BUSINESS_NAME || data.businessName)
          .map((field) => (
            <div className="sa-review__row" key={field}>
              <dt>{copy.labels[field]}</dt>
              <dd dir={resolveValueDir(field)}>{resolveDisplay(field)}</dd>
            </div>
          ))}
      </dl>
    </section>
  );

  return (
    <div className="sa-review">
      <span className="sa-review__eyebrow">{copy.eyebrow}</span>
      <h2 className="sa-review__heading" id="sa-drawer-title">
        {copy.heading}
      </h2>
      <p className="sa-review__body" id="sa-drawer-desc">
        {copy.body}
      </p>

      {renderSection("contact")}
      {renderSection("direction")}
      {renderSection("brief")}

      <p className="sa-review__notice" role="note">
        {copy.pendingNotice}
      </p>

      <div className="sa-review__actions">
        <button type="button" className="sa-lead__submit" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? copy.submitting : copy.submitAction}
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
