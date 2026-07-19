import { useMemo, useRef, useState } from "react";
import { LEAD_FORM_FIELDS, SERVICE_ID_LIST, PREFERRED_START_ID_LIST } from "../../data/assistantFlow.js";

const MIN_DETAILS_LENGTH = 10;
const MIN_WHATSAPP_DIGITS = 7;
const MAX_WHATSAPP_DIGITS = 15;

const digitsOnly = (value) => value.replace(/\D/g, "");

// Stage 7A: only these five fields are required in the compact direct
// intake. Business Name and Preferred Start are optional. Primary Project
// Goal is intentionally not part of this form at all — the canonical field
// stays in the data model (EMPTY_LEAD_FORM/LEAD_FORM_FIELDS, the Web3Forms
// payload, leadSummary.js) for a future Quick Guidance/n8n path, but
// direct-intake submissions always send it as an empty string.
const REQUIRED_FIELDS = [
  LEAD_FORM_FIELDS.FULL_NAME,
  LEAD_FORM_FIELDS.WHATSAPP_NUMBER,
  LEAD_FORM_FIELDS.SERVICE_NEEDED,
  LEAD_FORM_FIELDS.PROJECT_DETAILS,
  LEAD_FORM_FIELDS.CONTACT_CONSENT
];

const validate = (data, copy) => {
  const next = {};
  if (!data.fullName.trim()) next.fullName = copy.errors.fullName;
  const digits = digitsOnly(data.whatsappNumber);
  if (digits.length < MIN_WHATSAPP_DIGITS || digits.length > MAX_WHATSAPP_DIGITS) {
    next.whatsappNumber = copy.errors.whatsappNumber;
  }
  if (!data.serviceNeeded) next.serviceNeeded = copy.errors.serviceNeeded;
  if (data.projectDetails.trim().length < MIN_DETAILS_LENGTH) next.projectDetails = copy.errors.projectDetails;
  if (!data.contactConsent) next.contactConsent = copy.errors.contactConsent;
  return next;
};

// LEAD_FORM screen — Stage 7A compact direct intake, refined in Stage 7A-2:
// one scrollable screen, not a wizard, with plain accessible <select>
// controls (not ChoiceGroup cards) for Service Needed/Preferred Start, and
// actions in normal document flow (not sticky) at the end of the form.
// value/onChange stay lifted in AssistantWidget exactly as in every prior
// stage, so typed values survive Back, Continue, and drawer close/reopen
// unchanged.
export default function ProjectLeadForm({ t, value, onChange, onValid, onBack }) {
  const copy = t.smartAssistant.leadForm;
  const [attempted, setAttempted] = useState(false);

  // Derived from the live value on every render — never a stale submit-time
  // snapshot, so a field's error clears the instant it becomes valid
  // (including Contact Consent, fixed in Stage 6B-1G and preserved here).
  const errors = useMemo(() => validate(value, copy), [value, copy]);

  const fullNameRef = useRef(null);
  const whatsappRef = useRef(null);
  const serviceRef = useRef(null);
  const detailsRef = useRef(null);
  const consentRef = useRef(null);

  const fieldRefs = {
    [LEAD_FORM_FIELDS.FULL_NAME]: fullNameRef,
    [LEAD_FORM_FIELDS.WHATSAPP_NUMBER]: whatsappRef,
    [LEAD_FORM_FIELDS.SERVICE_NEEDED]: serviceRef,
    [LEAD_FORM_FIELDS.PROJECT_DETAILS]: detailsRef,
    [LEAD_FORM_FIELDS.CONTACT_CONSENT]: consentRef
  };

  const errorId = (field) => `sa-lead-error-${field}`;
  const inputId = (field) => `sa-lead-${field}`;
  const isInvalid = (field) => attempted && Boolean(errors[field]);
  const describedBy = (field) => (isInvalid(field) ? errorId(field) : undefined);

  const handleField = (field) => (event) => {
    const next = field === LEAD_FORM_FIELDS.CONTACT_CONSENT ? event.target.checked : event.target.value;
    onChange(field, next);
  };

  const hasErrors = REQUIRED_FIELDS.some((field) => errors[field]);

  const handleContinue = () => {
    if (hasErrors) {
      setAttempted(true);
      const firstInvalid = REQUIRED_FIELDS.find((field) => errors[field]);
      fieldRefs[firstInvalid]?.current?.focus();
      return;
    }
    onValid();
  };

  return (
    <div className="sa-lead">
      <span className="sa-lead__eyebrow">{copy.eyebrow}</span>
      <h2 className="sa-lead__heading" id="sa-drawer-title">
        {copy.heading}
      </h2>
      <p className="sa-lead__intro" id="sa-drawer-desc">
        {copy.intro}
      </p>

      <div className="sa-lead__fields">
        <div className="sa-lead__row">
          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.FULL_NAME)}>
            <span className="sa-field__label">
              {copy.fields.fullName} <span className="sa-field__required">*</span>
            </span>
            <input
              id={inputId(LEAD_FORM_FIELDS.FULL_NAME)}
              type="text"
              dir="auto"
              autoComplete="name"
              className={isInvalid(LEAD_FORM_FIELDS.FULL_NAME) ? "is-invalid" : ""}
              placeholder={copy.placeholders.fullName}
              value={value.fullName}
              onChange={handleField(LEAD_FORM_FIELDS.FULL_NAME)}
              aria-invalid={isInvalid(LEAD_FORM_FIELDS.FULL_NAME) || undefined}
              aria-describedby={describedBy(LEAD_FORM_FIELDS.FULL_NAME)}
              ref={fullNameRef}
            />
            {isInvalid(LEAD_FORM_FIELDS.FULL_NAME) && (
              <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.FULL_NAME)} role="alert">
                {errors.fullName}
              </span>
            )}
          </label>

          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.WHATSAPP_NUMBER)}>
            <span className="sa-field__label">
              {copy.fields.whatsappNumber} <span className="sa-field__required">*</span>
            </span>
            <input
              id={inputId(LEAD_FORM_FIELDS.WHATSAPP_NUMBER)}
              type="tel"
              dir="ltr"
              autoComplete="tel"
              className={isInvalid(LEAD_FORM_FIELDS.WHATSAPP_NUMBER) ? "is-invalid" : ""}
              placeholder={copy.placeholders.whatsappNumber}
              value={value.whatsappNumber}
              onChange={handleField(LEAD_FORM_FIELDS.WHATSAPP_NUMBER)}
              aria-invalid={isInvalid(LEAD_FORM_FIELDS.WHATSAPP_NUMBER) || undefined}
              aria-describedby={describedBy(LEAD_FORM_FIELDS.WHATSAPP_NUMBER)}
              ref={whatsappRef}
            />
            {isInvalid(LEAD_FORM_FIELDS.WHATSAPP_NUMBER) && (
              <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.WHATSAPP_NUMBER)} role="alert">
                {errors.whatsappNumber}
              </span>
            )}
          </label>
        </div>

        <div className="sa-lead__row">
          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.BUSINESS_NAME)}>
            <span className="sa-field__label">{copy.fields.businessName}</span>
            <input
              id={inputId(LEAD_FORM_FIELDS.BUSINESS_NAME)}
              type="text"
              dir="auto"
              autoComplete="organization"
              placeholder={copy.placeholders.businessName}
              value={value.businessName}
              onChange={handleField(LEAD_FORM_FIELDS.BUSINESS_NAME)}
            />
          </label>

          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.SERVICE_NEEDED)}>
            <span className="sa-field__label">
              {copy.fields.serviceNeeded} <span className="sa-field__required">*</span>
            </span>
            <select
              id={inputId(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
              className={isInvalid(LEAD_FORM_FIELDS.SERVICE_NEEDED) ? "is-invalid" : ""}
              value={value.serviceNeeded}
              onChange={handleField(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
              aria-invalid={isInvalid(LEAD_FORM_FIELDS.SERVICE_NEEDED) || undefined}
              aria-describedby={describedBy(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
              ref={serviceRef}
            >
              <option value="">{copy.serviceSelectPlaceholder}</option>
              {SERVICE_ID_LIST.map((id) => (
                <option key={id} value={id}>
                  {copy.serviceOptions[id]}
                </option>
              ))}
            </select>
            {isInvalid(LEAD_FORM_FIELDS.SERVICE_NEEDED) && (
              <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.SERVICE_NEEDED)} role="alert">
                {errors.serviceNeeded}
              </span>
            )}
          </label>
        </div>

        <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.PREFERRED_START)}>
          <span className="sa-field__label">{copy.fields.preferredStart}</span>
          <select
            id={inputId(LEAD_FORM_FIELDS.PREFERRED_START)}
            value={value.preferredStart}
            onChange={handleField(LEAD_FORM_FIELDS.PREFERRED_START)}
          >
            <option value="">{copy.startSelectPlaceholder}</option>
            {PREFERRED_START_ID_LIST.map((id) => (
              <option key={id} value={id}>
                {copy.startOptions[id]}
              </option>
            ))}
          </select>
        </label>

        <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.PROJECT_DETAILS)}>
          <span className="sa-field__label">
            {copy.fields.projectDetails} <span className="sa-field__required">*</span>
          </span>
          <textarea
            id={inputId(LEAD_FORM_FIELDS.PROJECT_DETAILS)}
            rows="4"
            dir="auto"
            className={isInvalid(LEAD_FORM_FIELDS.PROJECT_DETAILS) ? "is-invalid" : ""}
            placeholder={copy.placeholders.projectDetails}
            value={value.projectDetails}
            onChange={handleField(LEAD_FORM_FIELDS.PROJECT_DETAILS)}
            aria-invalid={isInvalid(LEAD_FORM_FIELDS.PROJECT_DETAILS) || undefined}
            aria-describedby={describedBy(LEAD_FORM_FIELDS.PROJECT_DETAILS)}
            ref={detailsRef}
          />
          {isInvalid(LEAD_FORM_FIELDS.PROJECT_DETAILS) && (
            <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.PROJECT_DETAILS)} role="alert">
              {errors.projectDetails}
            </span>
          )}
        </label>

        <label className="sa-field sa-field--checkbox" htmlFor={inputId(LEAD_FORM_FIELDS.CONTACT_CONSENT)}>
          <input
            id={inputId(LEAD_FORM_FIELDS.CONTACT_CONSENT)}
            type="checkbox"
            checked={value.contactConsent}
            onChange={handleField(LEAD_FORM_FIELDS.CONTACT_CONSENT)}
            aria-invalid={isInvalid(LEAD_FORM_FIELDS.CONTACT_CONSENT) || undefined}
            aria-describedby={describedBy(LEAD_FORM_FIELDS.CONTACT_CONSENT)}
            ref={consentRef}
          />
          <span className="sa-field__checkbox-text">{copy.consent}</span>
        </label>
        {isInvalid(LEAD_FORM_FIELDS.CONTACT_CONSENT) && (
          <span className="sa-field__error sa-field__error--block" id={errorId(LEAD_FORM_FIELDS.CONTACT_CONSENT)} role="alert">
            {errors.contactConsent}
          </span>
        )}
      </div>

      <div className="sa-lead__nav">
        <button type="button" className="sa-lead__back sa-review__back--quiet" onClick={onBack}>
          {copy.back}
        </button>
        <button type="button" className="sa-lead__submit" onClick={handleContinue} disabled={attempted && hasErrors}>
          {copy.submit}
        </button>
      </div>
    </div>
  );
}
