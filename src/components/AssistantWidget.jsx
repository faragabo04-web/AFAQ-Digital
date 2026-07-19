import { useEffect, useReducer, useRef, useState } from "react";
import { OPEN_ASSISTANT_EVENT } from "../data/serviceProofMap.js";
import { assistantReducer, initialAssistantState, STATES, EVENTS } from "../utils/assistantMachine.js";
import { LEAD_FORM_FIELDS } from "../data/assistantFlow.js";
import { buildLeadSummary } from "../utils/leadSummary.js";
import { WEB3FORMS_ACCESS_KEY, whatsappHref, websiteRequestFormUrl } from "../data/content.js";
import {
  getOrCreateSessionId,
  hasTeaserBeenShownThisSession,
  markTeaserShownThisSession,
  hasAssistantBeenOpenedThisSession,
  markAssistantOpenedThisSession,
  isTeaserSuppressedByRecentDismissal,
  markTeaserDismissedNow,
  persistCurrentState
} from "../utils/assistantStorage.js";
import TeaserPrompt from "./assistant/TeaserPrompt.jsx";
import EntryChoices from "./assistant/EntryChoices.jsx";
import ProjectLeadForm from "./assistant/ProjectLeadForm.jsx";
import ProjectLeadReview from "./assistant/ProjectLeadReview.jsx";
import Logo from "./Logo.jsx";

const EMPTY_LEAD_FORM = {
  [LEAD_FORM_FIELDS.FULL_NAME]: "",
  [LEAD_FORM_FIELDS.WHATSAPP_NUMBER]: "",
  [LEAD_FORM_FIELDS.BUSINESS_NAME]: "",
  [LEAD_FORM_FIELDS.SERVICE_NEEDED]: "",
  [LEAD_FORM_FIELDS.PRIMARY_GOAL]: "",
  [LEAD_FORM_FIELDS.PROJECT_DETAILS]: "",
  [LEAD_FORM_FIELDS.PREFERRED_START]: "",
  [LEAD_FORM_FIELDS.CONTACT_CONSENT]: false
};

const TEASER_DELAY_MS = 10000;
const TEASER_PREVIEW_DELAY_MS = 1000;
const SUBMIT_TIMEOUT_MS = 10000;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const generateLeadId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
// The Hero is considered "substantially visible" at or above this
// intersection ratio (within the approved ~0.25–0.35 range).
const HERO_VISIBILITY_THRESHOLD = 0.3;

// Dev-only QA aid, mirrors LeadCapture.jsx's leadPreview=1 convention.
// import.meta.env.DEV is statically false in `vite build` output, so this
// branch (and the query-param check itself) is dead-code-eliminated from
// the production bundle — it can never be active once deployed.
const isAssistantPreviewMode = () =>
  import.meta.env.DEV && new URLSearchParams(window.location.search).get("assistantPreview") === "1";

const DRAWER_STATES = new Set([
  STATES.OPEN_MENU,
  STATES.QUICK_GUIDANCE,
  STATES.GUIDED_FLOW,
  STATES.SUMMARY,
  STATES.LEAD_FORM,
  STATES.SUBMITTING,
  STATES.SUCCESS,
  STATES.MANUAL_FALLBACK
]);

// Temporary Stage 6B-1 placeholder for the routes that later stages
// implement (6B-2 Quick Guidance, 6B-4 Lead Form). Isolated here so it is
// trivial to delete once the real views land.
function HoldingView({ title, t, onBack }) {
  return (
    <div className="sa-holding">
      <h2 className="sa-holding__title" id="sa-drawer-title">
        {title}
      </h2>
      <p className="sa-holding__message" id="sa-drawer-desc">
        {t.smartAssistant.holding.comingSoon}
      </p>
      <button type="button" className="sa-holding__back" onClick={onBack}>
        {t.smartAssistant.holding.backToOptions}
      </button>
    </div>
  );
}

// SUCCESS view (Stage 6B-1F). Reuses the sa-review__* classes already
// styled for the review step so no CSS changes are needed for this stage.
function SuccessView({ t, onClose }) {
  const copy = t.smartAssistant.success;
  return (
    <div className="sa-review">
      <span className="sa-review__eyebrow">{copy.eyebrow}</span>
      <h2 className="sa-review__heading" id="sa-drawer-title">
        {copy.heading}
      </h2>
      <p className="sa-review__body" id="sa-drawer-desc">
        {copy.body}
      </p>
      <div className="sa-review__actions">
        <button type="button" className="sa-lead__submit" onClick={onClose}>
          {copy.close}
        </button>
      </div>
    </div>
  );
}

// MANUAL_FALLBACK view (Stage 6B-1F). Reached only on a failed submission —
// never clears leadFormData/leadId, so Try Again reuses the same attempt.
function ManualFallbackView({ t, onTryAgain, onEditDetails }) {
  const copy = t.smartAssistant.manualFallback;
  return (
    <div className="sa-review">
      <span className="sa-review__eyebrow">{copy.eyebrow}</span>
      <h2 className="sa-review__heading" id="sa-drawer-title">
        {copy.heading}
      </h2>
      <p className="sa-review__body" id="sa-drawer-desc">
        {copy.body}
      </p>
      <div className="sa-review__actions">
        <button type="button" className="sa-lead__submit" onClick={onTryAgain}>
          {copy.tryAgain}
        </button>
        <button type="button" className="sa-review__edit" onClick={onEditDetails}>
          {copy.editDetails}
        </button>
        <a className="sa-review__back" href={whatsappHref} target="_blank" rel="noreferrer">
          {copy.continueWhatsapp}
        </a>
        <a className="sa-review__back" href={websiteRequestFormUrl} target="_blank" rel="noopener noreferrer">
          {copy.googleFormBackup}
        </a>
      </div>
    </div>
  );
}

export default function AssistantWidget({ t }) {
  const [state, dispatch] = useReducer(assistantReducer, initialAssistantState);
  const teaserTimerRef = useRef(null);
  const heroObserverRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const bodyOverflowRef = useRef("");
  const [leadFormData, setLeadFormData] = useState(EMPTY_LEAD_FORM);
  // Synchronous submit guard — the SUBMITTING FSM state is the declarative
  // layer, this ref is the backstop against two rapid clicks landing before
  // React re-renders the disabled button. Unlocked only on failure (Try
  // Again) or on leaving a SUCCESS screen — never immediately on success.
  const isSubmittingRef = useRef(false);
  // One stable id per lead attempt, kept in memory only. Generated on first
  // submit, reused across every MANUAL_FALLBACK retry, and across an
  // ordinary drawer close/reopen of the same unfinished request. Cleared
  // only after a confirmed success or an explicit RESET (never on failure,
  // never on ordinary close).
  const leadIdRef = useRef(null);
  // The in-flight request's AbortController/timeout id, so an ordinary
  // drawer close during SUBMITTING can abort it instead of leaving it to
  // resolve in the background against a widget that has moved on.
  const activeControllerRef = useRef(null);
  const activeTimeoutRef = useRef(null);

  const isDrawerOpen = DRAWER_STATES.has(state);

  const cancelPendingTeaser = () => {
    if (teaserTimerRef.current) {
      window.clearTimeout(teaserTimerRef.current);
      teaserTimerRef.current = null;
    }
    if (heroObserverRef.current) {
      heroObserverRef.current.disconnect();
      heroObserverRef.current = null;
    }
  };

  // Shared direct-open path for the launcher, the Services
  // OPEN_ASSISTANT_EVENT, and the two greeting-bubble actions — every entry
  // point routes through here so the teaser/session/focus bookkeeping never
  // drifts between call sites.
  const openAssistantAt = (eventType = EVENTS.OPEN_ASSISTANT) => {
    cancelPendingTeaser();
    previousFocusRef.current = document.activeElement;
    markAssistantOpenedThisSession();
    dispatch({ type: eventType });
  };

  const updateLeadField = (field, fieldValue) => {
    setLeadFormData((previous) => ({ ...previous, [field]: fieldValue }));
  };

  // Owns the entire submit lifecycle: guard, leadId, timeout, request,
  // gated success check, and routing to SUCCESS/MANUAL_FALLBACK. Reused
  // unchanged by both the review Submit button and MANUAL_FALLBACK's Try
  // Again — same in-memory leadFormData/leadId on every attempt.
  const submitLead = async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    if (!leadIdRef.current) leadIdRef.current = generateLeadId();
    dispatch({ type: EVENTS.SUBMIT_LEAD });

    const controller = new AbortController();
    activeControllerRef.current = controller;
    // Stage 7A: an explicit abort reason distinguishes a user closing the
    // drawer (already fully handled synchronously by closeDrawer — the
    // catch below must no-op) from the automatic timeout firing while the
    // drawer is still open (nothing else has cleaned up — the catch below
    // must treat it as a real failure, same as any other one).
    const timeoutId = window.setTimeout(() => controller.abort("automatic_timeout_abort"), SUBMIT_TIMEOUT_MS);
    activeTimeoutRef.current = timeoutId;

    try {
      const lang = t.dir === "rtl" ? "ar" : "en";
      const submittedAt = new Date().toISOString();
      const shortLeadId = leadIdRef.current.slice(0, 8);
      const leadFormCopy = t.smartAssistant.leadForm;
      const reviewLabels = t.smartAssistant.review.labels;

      const summary = buildLeadSummary({
        data: leadFormData,
        leadId: leadIdRef.current,
        lang,
        sourceChannel: "website",
        fieldLabels: reviewLabels,
        optionLabels: leadFormCopy
      });

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: "AFAQ Smart Project Assistant",
        subject: `New AFAQ Project Request — ${shortLeadId}`,
        full_name: leadFormData[LEAD_FORM_FIELDS.FULL_NAME],
        whatsapp_number: leadFormData[LEAD_FORM_FIELDS.WHATSAPP_NUMBER],
        business_name: leadFormData[LEAD_FORM_FIELDS.BUSINESS_NAME],
        service_needed_id: leadFormData[LEAD_FORM_FIELDS.SERVICE_NEEDED],
        service_needed_label: leadFormCopy.serviceOptions[leadFormData[LEAD_FORM_FIELDS.SERVICE_NEEDED]] || "",
        primary_goal_id: leadFormData[LEAD_FORM_FIELDS.PRIMARY_GOAL],
        primary_goal_label: leadFormCopy.goalOptions[leadFormData[LEAD_FORM_FIELDS.PRIMARY_GOAL]] || "",
        preferred_start_id: leadFormData[LEAD_FORM_FIELDS.PREFERRED_START],
        preferred_start_label: leadFormCopy.startOptions[leadFormData[LEAD_FORM_FIELDS.PREFERRED_START]] || "",
        project_details: leadFormData[LEAD_FORM_FIELDS.PROJECT_DETAILS],
        contact_consent: leadFormData[LEAD_FORM_FIELDS.CONTACT_CONSENT] ? "yes" : "no",
        lead_id: leadIdRef.current,
        submitted_at: submittedAt,
        source_channel: "website",
        source: "smart_project_assistant",
        language: lang,
        project_summary: summary
      };

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!response.ok) throw new Error("non_2xx_response");
      const result = await response.json();
      // If the drawer was closed mid-request, closeDrawer already aborted
      // this exact controller and handled cleanup — a late resolve must not
      // retroactively show success against a widget that has moved on.
      if (controller.signal.aborted) return;
      if (!result || result.success !== true) throw new Error("submission_not_successful");

      // Confirmed success only: clear PII now. isSubmittingRef stays locked
      // until the visitor leaves this SUCCESS screen (closeDrawer unlocks it).
      setLeadFormData(EMPTY_LEAD_FORM);
      leadIdRef.current = null;
      activeControllerRef.current = null;
      dispatch({ type: EVENTS.SUBMIT_SUCCESS });
    } catch {
      // Network error, non-2xx, malformed JSON, success !== true, and an
      // automatic timeout abort all land here and must recover the same
      // way: unlock the submit guard, preserve leadFormData/leadId
      // untouched, and route to MANUAL_FALLBACK. Only a user-initiated
      // abort (closeDrawer, tagged with this exact reason) is already
      // fully handled synchronously there — skip re-dispatching for a
      // request that's no longer the active one. Checking the reason
      // string (not just .aborted, which is also true for the timeout
      // case) is what fixes the Stage 7A stuck-in-SUBMITTING bug.
      if (controller.signal.aborted && controller.signal.reason === "user_initiated_abort") return;
      isSubmittingRef.current = false;
      activeControllerRef.current = null;
      dispatch({ type: EVENTS.SUBMIT_FAILURE });
    } finally {
      window.clearTimeout(timeoutId);
      if (activeTimeoutRef.current === timeoutId) activeTimeoutRef.current = null;
    }
  };

  // Session id is established once per tab session (not otherwise used in
  // Stage 6B-1, but required groundwork for later stages' payloads).
  useEffect(() => {
    getOrCreateSessionId();
  }, []);

  // Explicit RESET / New Chat — distinct from an ordinary close. IDLE is
  // only reached via EVENTS.RESET (CLOSED + RESET -> IDLE), so this clears
  // every piece of in-memory request state: form PII, leadId, any active
  // request, and the submit guard. Ordinary close never reaches IDLE, so it
  // never triggers this. A no-op on initial mount (everything already at
  // its default value).
  useEffect(() => {
    if (state !== STATES.IDLE) return;
    if (activeControllerRef.current) {
      activeControllerRef.current.abort("user_initiated_abort");
      activeControllerRef.current = null;
    }
    if (activeTimeoutRef.current) {
      window.clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }
    isSubmittingRef.current = false;
    leadIdRef.current = null;
    setLeadFormData(EMPTY_LEAD_FORM);
  }, [state]);

  // Non-modal teaser, suppressed per the session/24h/opened rules, and —
  // in production — additionally gated so it never appears while the Hero
  // (the site's primary sales section, #home) is still substantially
  // visible. The ~10s timer and the Hero's visibility are independent
  // conditions; the teaser only shows once BOTH are satisfied, whichever
  // becomes true last. ?assistantPreview=1 (dev-only) bypasses both the
  // suppression rules and the Hero-visibility gate, showing the teaser
  // after ~1s for reliable QA.
  useEffect(() => {
    const preview = isAssistantPreviewMode();

    if (!preview) {
      if (hasTeaserBeenShownThisSession()) return undefined;
      if (isTeaserSuppressedByRecentDismissal()) return undefined;
      if (hasAssistantBeenOpenedThisSession()) return undefined;
    }

    let timerElapsed = false;
    let heroDominant = false;
    let fired = false;

    const attemptShow = () => {
      if (fired || !timerElapsed) return;
      if (!preview && heroDominant) return;
      fired = true;
      markTeaserShownThisSession();
      dispatch({ type: EVENTS.SHOW_TEASER });
    };

    teaserTimerRef.current = window.setTimeout(
      () => {
        teaserTimerRef.current = null;
        timerElapsed = true;
        attemptShow();
      },
      preview ? TEASER_PREVIEW_DELAY_MS : TEASER_DELAY_MS
    );

    // Hero-visibility gate — production only. #home is the Hero section's
    // existing stable id (src/components/Hero.jsx), unedited.
    if (!preview && typeof IntersectionObserver !== "undefined") {
      const heroEl = document.getElementById("home");
      if (heroEl) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            heroDominant = entry.isIntersecting && entry.intersectionRatio >= HERO_VISIBILITY_THRESHOLD;
            if (!heroDominant) attemptShow();
          },
          { threshold: [0, HERO_VISIBILITY_THRESHOLD, 0.5, 1] }
        );
        observer.observe(heroEl);
        heroObserverRef.current = observer;
      }
    }

    return () => {
      if (teaserTimerRef.current) window.clearTimeout(teaserTimerRef.current);
      teaserTimerRef.current = null;
      if (heroObserverRef.current) {
        heroObserverRef.current.disconnect();
        heroObserverRef.current = null;
      }
    };
  }, []);

  // The Services "Try the Assistant" card opens the widget via this event.
  useEffect(() => {
    const openMenu = () => openAssistantAt(EVENTS.OPEN_ASSISTANT);
    window.addEventListener(OPEN_ASSISTANT_EVENT, openMenu);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, openMenu);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    persistCurrentState(state);
  }, [state]);

  // WhatsApp mutual-exclusion + body scroll lock, scoped to drawer states only.
  useEffect(() => {
    if (!isDrawerOpen) return undefined;
    bodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("smart-assistant-open");
    return () => {
      document.body.style.overflow = bodyOverflowRef.current;
      document.body.classList.remove("smart-assistant-open");
    };
  }, [isDrawerOpen]);

  // Focus management + focus trap + Escape, active only while the drawer is open.
  useEffect(() => {
    if (!isDrawerOpen) return undefined;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrawerOpen]);

  const restoreFocus = () => {
    const previous = previousFocusRef.current;
    if (previous && typeof previous.focus === "function" && document.contains(previous)) {
      previous.focus();
    }
  };

  const closeDrawer = () => {
    // Ordinary close (X button, Escape, backdrop, or the SUCCESS screen's
    // own Close action) is NOT Reset: leadFormData and leadIdRef are left
    // untouched so the same unfinished request resumes with the same
    // leadId if the visitor reopens the drawer.
    //
    // If a request is still in flight, abort it first — clearing the
    // timeout and unlocking isSubmittingRef only after the abort — so the
    // abandoned request can never later dispatch SUBMIT_SUCCESS/FAILURE
    // against a widget that has moved on. Tagged "user_initiated_abort" so
    // submitLead's catch can tell this apart from its own automatic
    // timeout abort (Stage 7A fix) and no-op instead of re-dispatching.
    if (activeControllerRef.current) {
      activeControllerRef.current.abort("user_initiated_abort");
      activeControllerRef.current = null;
    }
    if (activeTimeoutRef.current) {
      window.clearTimeout(activeTimeoutRef.current);
      activeTimeoutRef.current = null;
    }
    isSubmittingRef.current = false;
    dispatch({ type: EVENTS.CLOSE });
    window.requestAnimationFrame(restoreFocus);
  };

  const dismissTeaser = () => {
    markTeaserDismissedNow();
    dispatch({ type: EVENTS.CLOSE });
  };

  const goBackToMenu = () => dispatch({ type: EVENTS.GO_BACK });

  const liveMessage =
    state === STATES.OPEN_MENU
      ? t.smartAssistant.entryMenu.title
      : state === STATES.QUICK_GUIDANCE
        ? t.smartAssistant.entryMenu.quickGuidance.title
        : state === STATES.LEAD_FORM
          ? t.smartAssistant.leadForm.heading
          : state === STATES.SUMMARY
            ? t.smartAssistant.review.heading
            : state === STATES.SUBMITTING
              ? t.smartAssistant.review.submitting
              : state === STATES.SUCCESS
                ? t.smartAssistant.success.heading
                : state === STATES.MANUAL_FALLBACK
                  ? t.smartAssistant.manualFallback.heading
                  : "";

  return (
    <>
      <button
        type="button"
        className={`sa-launcher${isDrawerOpen ? " sa-launcher--hidden" : ""}`}
        aria-label={t.smartAssistant.launcherLabel}
        onClick={() => openAssistantAt(EVENTS.OPEN_ASSISTANT)}
      >
        <span className="sa-launcher__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M5.8 6.2h12.4a3 3 0 0 1 3 3v5.5a3 3 0 0 1-3 3h-4.9l-3.7 3.1v-3.1H5.8a3 3 0 0 1-3-3V9.2a3 3 0 0 1 3-3Z" />
            <path d="M7.4 11.5h.01M12 11.5h.01M16.6 11.5h.01" />
          </svg>
        </span>
        <span className="sa-launcher__label">{t.smartAssistant.launcherLabel}</span>
      </button>

      {state === STATES.TEASER_VISIBLE && (
        <TeaserPrompt
          t={t}
          onOpenLeadForm={() => openAssistantAt(EVENTS.OPEN_LEAD_FORM)}
          onOpenQuickGuidance={() => openAssistantAt(EVENTS.OPEN_QUICK_GUIDANCE)}
          onDismiss={dismissTeaser}
        />
      )}

      {isDrawerOpen && (
        <div
          className="sa-backdrop"
          onMouseDown={(event) => event.target === event.currentTarget && closeDrawer()}
        >
          <section
            className="sa-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sa-drawer-title"
            aria-describedby="sa-drawer-desc"
            ref={dialogRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="sa-drawer__header">
              <div className="sa-drawer__brand">
                <span className="sa-drawer__brand-mark">
                  <Logo variant="icon" />
                </span>
                <span className="sa-drawer__brand-text">
                  <span className="sa-drawer__title">{t.smartAssistant.drawer.title}</span>
                  <span className="sa-drawer__subtitle">{t.smartAssistant.drawer.subtitle}</span>
                </span>
              </div>
              <button
                type="button"
                className="sa-drawer__close"
                aria-label={t.smartAssistant.drawer.closeAriaLabel}
                onClick={closeDrawer}
                ref={closeButtonRef}
              >
                ×
              </button>
            </header>
            <div className="sa-sr-only" aria-live="polite">
              {liveMessage}
            </div>
            <div className="sa-drawer__body">
              {state === STATES.OPEN_MENU && (
                <EntryChoices
                  t={t}
                  onChooseQuickGuidance={() => dispatch({ type: EVENTS.CHOOSE_QUICK_GUIDANCE })}
                  onChooseLeadForm={() => dispatch({ type: EVENTS.CHOOSE_LEAD_FORM })}
                />
              )}
              {state === STATES.QUICK_GUIDANCE && (
                <HoldingView title={t.smartAssistant.entryMenu.quickGuidance.title} t={t} onBack={goBackToMenu} />
              )}
              {state === STATES.LEAD_FORM && (
                <ProjectLeadForm
                  t={t}
                  value={leadFormData}
                  onChange={updateLeadField}
                  onValid={() => dispatch({ type: EVENTS.SHOW_SUMMARY })}
                  onBack={goBackToMenu}
                />
              )}
              {(state === STATES.SUMMARY || state === STATES.SUBMITTING) && (
                <ProjectLeadReview
                  t={t}
                  data={leadFormData}
                  onEdit={() => dispatch({ type: EVENTS.EDIT_ANSWER })}
                  onBack={goBackToMenu}
                  onSubmit={submitLead}
                  isSubmitting={state === STATES.SUBMITTING}
                />
              )}
              {state === STATES.SUCCESS && <SuccessView t={t} onClose={closeDrawer} />}
              {state === STATES.MANUAL_FALLBACK && (
                <ManualFallbackView
                  t={t}
                  onTryAgain={submitLead}
                  onEditDetails={() => dispatch({ type: EVENTS.EDIT_ANSWER })}
                />
              )}
            </div>
            <footer className="sa-drawer__footer">
              <p className="sa-drawer__footer-line">{t.smartAssistant.footer.governance}</p>
              <p className="sa-drawer__footer-line sa-drawer__footer-line--muted">
                {t.smartAssistant.footer.noPayment}
              </p>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
