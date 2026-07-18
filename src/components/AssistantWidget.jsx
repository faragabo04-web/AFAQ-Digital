import { useEffect, useReducer, useRef, useState } from "react";
import { OPEN_ASSISTANT_EVENT } from "../data/serviceProofMap.js";
import { assistantReducer, initialAssistantState, STATES, EVENTS } from "../utils/assistantMachine.js";
import { LEAD_FORM_FIELDS } from "../data/assistantFlow.js";
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

export default function AssistantWidget({ t }) {
  const [state, dispatch] = useReducer(assistantReducer, initialAssistantState);
  const teaserTimerRef = useRef(null);
  const heroObserverRef = useRef(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const bodyOverflowRef = useRef("");
  const [leadFormData, setLeadFormData] = useState(EMPTY_LEAD_FORM);

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

  // Session id is established once per tab session (not otherwise used in
  // Stage 6B-1, but required groundwork for later stages' payloads).
  useEffect(() => {
    getOrCreateSessionId();
  }, []);

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
              {state === STATES.SUMMARY && (
                <ProjectLeadReview
                  t={t}
                  data={leadFormData}
                  onEdit={() => dispatch({ type: EVENTS.EDIT_ANSWER })}
                  onBack={goBackToMenu}
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
