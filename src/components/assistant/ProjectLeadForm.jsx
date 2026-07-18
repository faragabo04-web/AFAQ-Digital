import { useMemo, useRef, useState } from "react";
import {
  LEAD_FORM_FIELDS,
  SERVICE_ID_LIST,
  PRIMARY_GOAL_ID_LIST,
  PREFERRED_START_ID_LIST
} from "../../data/assistantFlow.js";
import ChoiceGroup from "./ChoiceGroup.jsx";

const MIN_DETAILS_LENGTH = 20;
const MIN_WHATSAPP_DIGITS = 7;
const MAX_WHATSAPP_DIGITS = 15;
const TOTAL_STEPS = 3;

const digitsOnly = (value) => value.replace(/\D/g, "");

const STEP_FIELDS = {
  1: [LEAD_FORM_FIELDS.FULL_NAME, LEAD_FORM_FIELDS.WHATSAPP_NUMBER],
  2: [LEAD_FORM_FIELDS.SERVICE_NEEDED, LEAD_FORM_FIELDS.PRIMARY_GOAL, LEAD_FORM_FIELDS.PREFERRED_START],
  3: [LEAD_FORM_FIELDS.PROJECT_DETAILS, LEAD_FORM_FIELDS.CONTACT_CONSENT]
};

const STEP_TITLE_KEYS = { 1: "contact", 2: "direction", 3: "brief" };

// Same rules as before Stage 6B-1G — only the display (native select →
// ChoiceGroup, single screen → 3 steps) and the validation timing changed.
const validate = (data, copy) => {
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

// Slim progress header: eyebrow, "Step N of 3" + compact segment markers,
// and the current step's title as the drawer's labelled heading. No large
// wizard chrome, no illustrations — a single compact block.
function StepProgress({ copy, step }) {
  const stepLabel = copy.progress.stepLabelTemplate
    .replace("{current}", String(step))
    .replace("{total}", String(TOTAL_STEPS));

  return (
    <div className="sa-progress">
      <span className="sa-progress__eyebrow">{copy.eyebrow}</span>
      <div className="sa-progress__row">
        <span className="sa-progress__step-label" id="sa-drawer-desc">
          {stepLabel}
        </span>
        <div className="sa-progress__markers" aria-hidden="true">
          {[1, 2, 3].map((markerStep) => (
            <span
              key={markerStep}
              className={`sa-progress__marker${
                markerStep < step ? " is-complete" : markerStep === step ? " is-current" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <h2 className="sa-progress__title" id="sa-drawer-title">
        {copy.steps[STEP_TITLE_KEYS[step]].title}
      </h2>
    </div>
  );
}

// LEAD_FORM screen — three internal steps (Contact / Project Direction /
// Project Brief), entirely local to this component; the FSM only ever sees
// a single LEAD_FORM state (Stage 6B-1G audit confirmed no reducer change
// is needed). value/onChange stay lifted in AssistantWidget exactly as
// before Stage 6B-1G, so typed values survive Back, Continue, and drawer
// close/reopen unchanged. initialStep seeds the step on mount only — used
// by the review screen's per-section Edit actions to land directly on the
// relevant step.
export default function ProjectLeadForm({ t, value, onChange, onValid, onBack, initialStep }) {
  const copy = t.smartAssistant.leadForm;
  const isRtl = t.dir === "rtl";
  const [step, setStep] = useState(initialStep ?? 1);
  const [attemptedSteps, setAttemptedSteps] = useState(() => new Set());

  // Derived from the live value on every render — never a stale submit-time
  // snapshot, so a field's error clears the instant it becomes valid
  // (Stage 6B-1G fix, applies to every field including Contact Consent).
  const errors = useMemo(() => validate(value, copy), [value, copy]);

  const fullNameRef = useRef(null);
  const whatsappRef = useRef(null);
  const serviceRef = useRef(null);
  const goalRef = useRef(null);
  const startRef = useRef(null);
  const detailsRef = useRef(null);
  const consentRef = useRef(null);

  const fieldRefs = {
    [LEAD_FORM_FIELDS.FULL_NAME]: fullNameRef,
    [LEAD_FORM_FIELDS.WHATSAPP_NUMBER]: whatsappRef,
    [LEAD_FORM_FIELDS.SERVICE_NEEDED]: serviceRef,
    [LEAD_FORM_FIELDS.PRIMARY_GOAL]: goalRef,
    [LEAD_FORM_FIELDS.PREFERRED_START]: startRef,
    [LEAD_FORM_FIELDS.PROJECT_DETAILS]: detailsRef,
    [LEAD_FORM_FIELDS.CONTACT_CONSENT]: consentRef
  };

  const errorId = (field) => `sa-lead-error-${field}`;
  const inputId = (field) => `sa-lead-${field}`;
  const labelId = (field) => `sa-lead-label-${field}`;
  const isInvalid = (field) => attemptedSteps.has(step) && Boolean(errors[field]);
  const describedBy = (field) => (isInvalid(field) ? errorId(field) : undefined);

  const handleField = (field) => (event) => {
    const next = field === LEAD_FORM_FIELDS.CONTACT_CONSENT ? event.target.checked : event.target.value;
    onChange(field, next);
  };

  const handleChoiceChange = (field) => (optionId) => onChange(field, optionId);

  const stepHasErrors = (targetStep) => STEP_FIELDS[targetStep].some((field) => errors[field]);
  const currentStepBlocked = attemptedSteps.has(step) && stepHasErrors(step);

  const handleContinue = () => {
    if (stepHasErrors(step)) {
      setAttemptedSteps((previous) => new Set(previous).add(step));
      const firstInvalid = STEP_FIELDS[step].find((field) => errors[field]);
      fieldRefs[firstInvalid]?.current?.focus();
      return;
    }
    if (step === TOTAL_STEPS) {
      onValid();
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
      return;
    }
    setStep(step - 1);
  };

  const serviceOptions = SERVICE_ID_LIST.map((id) => ({ id, label: copy.serviceOptions[id] }));
  const goalOptions = PRIMARY_GOAL_ID_LIST.map((id) => ({ id, label: copy.goalOptions[id] }));
  const startOptions = PREFERRED_START_ID_LIST.map((id) => ({ id, label: copy.startOptions[id] }));

  return (
    <div className="sa-lead">
      <StepProgress copy={copy} step={step} />

      <div className="sa-lead__step" key={step}>
        {step === 1 && (
          <div className="sa-lead__fields">
            <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.FULL_NAME)}>
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

            <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.WHATSAPP_NUMBER)}>
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

            <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.BUSINESS_NAME)}>
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
          </div>
        )}

        {step === 2 && (
          <div className="sa-lead__fields">
            <div className="sa-field sa-field--full">
              <span className="sa-field__label" id={labelId(LEAD_FORM_FIELDS.SERVICE_NEEDED)}>
                {copy.fields.serviceNeeded} <span className="sa-field__required">*</span>
              </span>
              <ChoiceGroup
                id={inputId(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
                layout="grid-2"
                options={serviceOptions}
                value={value.serviceNeeded}
                onChange={handleChoiceChange(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
                labelledBy={labelId(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
                describedBy={describedBy(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
                invalid={isInvalid(LEAD_FORM_FIELDS.SERVICE_NEEDED)}
                isRtl={isRtl}
                ref={serviceRef}
              />
              {isInvalid(LEAD_FORM_FIELDS.SERVICE_NEEDED) && (
                <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.SERVICE_NEEDED)} role="alert">
                  {errors.serviceNeeded}
                </span>
              )}
            </div>

            <div className="sa-field sa-field--full">
              <span className="sa-field__label" id={labelId(LEAD_FORM_FIELDS.PRIMARY_GOAL)}>
                {copy.fields.primaryGoal} <span className="sa-field__required">*</span>
              </span>
              <ChoiceGroup
                id={inputId(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
                layout="rows"
                options={goalOptions}
                value={value.primaryGoal}
                onChange={handleChoiceChange(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
                labelledBy={labelId(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
                describedBy={describedBy(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
                invalid={isInvalid(LEAD_FORM_FIELDS.PRIMARY_GOAL)}
                isRtl={isRtl}
                ref={goalRef}
              />
              {isInvalid(LEAD_FORM_FIELDS.PRIMARY_GOAL) && (
                <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.PRIMARY_GOAL)} role="alert">
                  {errors.primaryGoal}
                </span>
              )}
            </div>

            <div className="sa-field sa-field--full">
              <span className="sa-field__label" id={labelId(LEAD_FORM_FIELDS.PREFERRED_START)}>
                {copy.fields.preferredStart} <span className="sa-field__required">*</span>
              </span>
              <ChoiceGroup
                id={inputId(LEAD_FORM_FIELDS.PREFERRED_START)}
                layout="grid-2"
                options={startOptions}
                value={value.preferredStart}
                onChange={handleChoiceChange(LEAD_FORM_FIELDS.PREFERRED_START)}
                labelledBy={labelId(LEAD_FORM_FIELDS.PREFERRED_START)}
                describedBy={describedBy(LEAD_FORM_FIELDS.PREFERRED_START)}
                invalid={isInvalid(LEAD_FORM_FIELDS.PREFERRED_START)}
                isRtl={isRtl}
                ref={startRef}
              />
              {isInvalid(LEAD_FORM_FIELDS.PREFERRED_START) && (
                <span className="sa-field__error" id={errorId(LEAD_FORM_FIELDS.PREFERRED_START)} role="alert">
                  {errors.preferredStart}
                </span>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="sa-lead__fields">
            <label className="sa-field sa-field--full" htmlFor={inputId(LEAD_FORM_FIELDS.PROJECT_DETAILS)}>
              <span className="sa-field__label">
                {copy.fields.projectDetails} <span className="sa-field__required">*</span>
              </span>
              <textarea
                id={inputId(LEAD_FORM_FIELDS.PROJECT_DETAILS)}
                rows="5"
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
        )}
      </div>

      <div className="sa-lead__nav">
        <button type="button" className="sa-lead__back" onClick={handleBack}>
          {step === 1 ? copy.back : copy.backStepAction}
        </button>
        <button type="button" className="sa-lead__submit" onClick={handleContinue} disabled={currentStepBlocked}>
          {step === TOTAL_STEPS ? copy.submit : copy.continueAction}
        </button>
      </div>
    </div>
  );
}
