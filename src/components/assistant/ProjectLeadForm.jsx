import { useRef, useState } from "react";
import {
  LEAD_FORM_FIELDS,
  SERVICE_ID_LIST,
  PRIMARY_GOAL_ID_LIST,
  PREFERRED_START_ID_LIST
} from "../../data/assistantFlow.js";

const MIN_DETAILS_LENGTH = 20;
const MIN_WHATSAPP_DIGITS = 7;
const MAX_WHATSAPP_DIGITS = 15;

const digitsOnly = (value) => value.replace(/\D/g, "");

const FIELD_ORDER = [
  LEAD_FORM_FIELDS.FULL_NAME,
  LEAD_FORM_FIELDS.WHATSAPP_NUMBER,
  LEAD_FORM_FIELDS.SERVICE_NEEDED,
  LEAD_FORM_FIELDS.PRIMARY_GOAL,
  LEAD_FORM_FIELDS.PROJECT_DETAILS,
  LEAD_FORM_FIELDS.PREFERRED_START,
  LEAD_FORM_FIELDS.CONTACT_CONSENT
];

// LEAD_FORM screen. Values are controlled by the parent (AssistantWidget)
// so they survive the drawer closing/reopening within the same page
// lifecycle; a full refresh naturally clears them since they're plain React
// state, never written to storage. Errors/touched stay local — they don't
// need to persist and intentionally reset each time this view mounts.
export default function ProjectLeadForm({ t, value, onChange, onValid, onBack }) {
  const copy = t.smartAssistant.leadForm;
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);

  const fullNameRef = useRef(null);
  const whatsappRef = useRef(null);
  const serviceRef = useRef(null);
  const goalRef = useRef(null);
  const detailsRef = useRef(null);
  const startRef = useRef(null);
  const consentRef = useRef(null);

  const fieldRefs = {
    [LEAD_FORM_FIELDS.FULL_NAME]: fullNameRef,
    [LEAD_FORM_FIELDS.WHATSAPP_NUMBER]: whatsappRef,
    [LEAD_FORM_FIELDS.SERVICE_NEEDED]: serviceRef,
    [LEAD_FORM_FIELDS.PRIMARY_GOAL]: goalRef,
    [LEAD_FORM_FIELDS.PROJECT_DETAILS]: detailsRef,
    [LEAD_FORM_FIELDS.PREFERRED_START]: startRef,
    [LEAD_FORM_FIELDS.CONTACT_CONSENT]: consentRef
  };

  const validate = (data) => {
    const next = {};
    if (!data.fullName.trim()) next.fullName = copy.errors.fullName;
    const digits = digitsOnly(data.whatsappNumber);
    if (digits.length < MIN_WHATSAPP_DIGITS || digits.length > MAX_WHATSAPP_DIGITS) {
      next.whatsappNumber = copy.errors.whatsappNumber;
    }
    if (!data.serviceNeeded) next.serviceNeeded = copy.errors.serviceNeeded;
    if (!data.primaryGoal) next.primaryGoal = copy.errors.primaryGoal;
    if (data.projectDetails.trim().length < MIN_DETAILS_LENGTH) next.projectDetails = copy.errors.projectDetails;
    if (!data.preferredStart) next.preferredStart = copy.errors.preferredStart;
    if (!data.contactConsent) next.contactConsent = copy.errors.contactConsent;
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    const nextErrors = validate(value);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      fieldRefs[firstInvalid]?.current?.focus();
      return;
    }
    onValid();
  };

  const handleField = (field) => (event) => {
    const next = field === LEAD_FORM_FIELDS.CONTACT_CONSENT ? event.target.checked : event.target.value;
    onChange(field, next);
  };

  const errorId = (field) => `sa-lead-error-${field}`;
  const inputId = (field) => `sa-lead-${field}`;
  const isInvalid = (field) => Boolean(touched && errors[field]);
  const describedBy = (field) => (isInvalid(field) ? errorId(field) : undefined);

  return (
    <div className="sa-lead">
      <span className="sa-lead__eyebrow">{copy.eyebrow}</span>
      <h2 className="sa-lead__heading" id="sa-drawer-title">
        {copy.heading}
      </h2>
      <p className="sa-lead__intro" id="sa-drawer-desc">
        {copy.intro}
      </p>
      <form className="sa-lead__form" onSubmit={handleSubmit} noValidate>
        <div className="sa-lead__row">
          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.FULL_NAME)}>
            <span className="sa-field__label">
              {copy.fields.fullName} <span className="sa-field__required">*</span>
            </span>
            <input
              id={inputId(LEAD_FORM_FIELDS.FULL_NAME)}
              type="text"
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
              <option value="">{copy.selectPlaceholder}</option>
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

        <div className="sa-lead__row">
          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.PRIMARY_GOAL)}>
            <span className="sa-field__label">
              {copy.fields.primaryGoal} <span className="sa-field__required">*</span>
            </span>
            <select
              id={inputId(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
              className={isInvalid(LEAD_FORM_FIELDS.PRIMARY_GOAL) ? "is-invalid" : ""}
              value={value.primaryGoal}
              onChange={handleField(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
              aria-invalid={isInvalid(LEAD_FORM_FIELDS.PRIMARY_GOAL) || undefined}
              aria-describedby={describedBy(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
              ref={goalRef}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {PRIMARY_GOAL_ID_LIST.map((id) => (
                <option key={id} value={id}>
                  {copy.goalOptions[id]}
                </option>
              ))}
            </select>
            {isInvalid(LEAD_FORM_FIELDS.PRIMARY_GOAL) && (
              <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.PRIMARY_GOAL)} role="alert">
                {errors.primaryGoal}
              </span>
            )}
          </label>
          <label className="sa-field" htmlFor={inputId(LEAD_FORM_FIELDS.PREFERRED_START)}>
            <span className="sa-field__label">
              {copy.fields.preferredStart} <span className="sa-field__required">*</span>
            </span>
            <select
              id={inputId(LEAD_FORM_FIELDS.PREFERRED_START)}
              className={isInvalid(LEAD_FORM_FIELDS.PREFERRED_START) ? "is-invalid" : ""}
              value={value.preferredStart}
              onChange={handleField(LEAD_FORM_FIELDS.PREFERRED_START)}
              aria-invalid={isInvalid(LEAD_FORM_FIELDS.PREFERRED_START) || undefined}
              aria-describedby={describedBy(LEAD_FORM_FIELDS.PREFERRED_START)}
              ref={startRef}
            >
              <option value="">{copy.selectPlaceholder}</option>
              {PREFERRED_START_ID_LIST.map((id) => (
                <option key={id} value={id}>
                  {copy.startOptions[id]}
                </option>
              ))}
            </select>
            {isInvalid(LEAD_FORM_FIELDS.PREFERRED_START) && (
              <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.PREFERRED_START)} role="alert">
                {errors.preferredStart}
              </span>
            )}
          </label>
        </div>

        <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.PROJECT_DETAILS)}>
          <span className="sa-field__label">
            {copy.fields.projectDetails} <span className="sa-field__required">*</span>
          </span>
          <textarea
            id={inputId(LEAD_FORM_FIELDS.PROJECT_DETAILS)}
            rows="4"
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

        <div className="sa-lead__actions">
          <button type="submit" className="sa-lead__submit">
            {copy.submit}
          </button>
          <button type="button" className="sa-lead__back" onClick={onBack}>
            {copy.back}
          </button>
        </div>
      </form>
    </div>
  );
}
