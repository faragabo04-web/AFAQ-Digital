import { useEffect, useRef, useState } from "react";
import { WEB3FORMS_ACCESS_KEY, whatsappHref } from "../data/content.js";

const SESSION_DISMISSED_KEY = "afaq-lead-capture-dismissed-session";
const SESSION_SEEN_KEY = "afaq-lead-capture-seen-session";
const SUBMITTED_KEY = "afaq-lead-capture-submitted-at";
const DAY = 24 * 60 * 60 * 1000;
const TRIGGER_MS = 12000;
const PREVIEW_TRIGGER_MS = 750;

const initialForm = {
  name: "",
  email: "",
  whatsapp: "",
  service: "",
  brief: ""
};

const getStoredTime = (key) => {
  const value = Number(window.localStorage.getItem(key));
  return Number.isFinite(value) ? value : 0;
};

const isContactVisible = () => {
  const contact = document.getElementById("contact");
  if (!contact) return false;
  const rect = contact.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.78 && rect.bottom > window.innerHeight * 0.22;
};

const isFormFieldFocused = () => {
  const active = document.activeElement;
  if (!active || active === document.body) return false;
  return active.matches('input, textarea, select, [contenteditable="true"]');
};

const isAssistantOpen = () => Boolean(document.querySelector(".assistant-widget.is-open"));

const isPreviewMode = () => new URLSearchParams(window.location.search).get("leadPreview") === "1";

export default function LeadCapture({ lang, t }) {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [statusIsError, setStatusIsError] = useState(false);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(0);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const previousFocusRef = useRef(null);
  const previewModeRef = useRef(false);

  useEffect(() => {
    const previewMode = isPreviewMode();
    previewModeRef.current = previewMode;
    const now = Date.now();

    if (!previewMode) {
      if (window.sessionStorage.getItem(SESSION_SEEN_KEY) || window.sessionStorage.getItem(SESSION_DISMISSED_KEY)) return undefined;
      if (now - getStoredTime(SUBMITTED_KEY) < 30 * DAY) return undefined;
    }

    lastTickRef.current = performance.now();
    const interval = window.setInterval(() => {
      const current = performance.now();
      const delta = current - lastTickRef.current;
      lastTickRef.current = current;
      if (document.hidden) return;
      elapsedRef.current += delta;
      const triggerMs = previewMode ? PREVIEW_TRIGGER_MS : TRIGGER_MS;
      if (elapsedRef.current < triggerMs) return;
      if (!previewMode && (isContactVisible() || isFormFieldFocused() || isAssistantOpen())) return;
      previousFocusRef.current = document.activeElement;
      if (!previewMode) window.sessionStorage.setItem(SESSION_SEEN_KEY, String(Date.now()));
      setVisible(true);
      window.clearInterval(interval);
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 40);
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel("dismiss");
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
  }, [visible]);

  const restoreFocus = () => {
    const previous = previousFocusRef.current;
    if (previous && typeof previous.focus === "function" && document.contains(previous)) {
      previous.focus();
    }
  };

  const closePanel = (reason = "dismiss") => {
    if (reason === "dismiss" && !previewModeRef.current) {
      window.sessionStorage.setItem(SESSION_DISMISSED_KEY, String(Date.now()));
    }
    setVisible(false);
    window.requestAnimationFrame(restoreFocus);
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setTouched(true);
    setStatus("");
    if (!form.name.trim() || !form.email.trim() || !form.service.trim()) {
      setStatusIsError(true);
      setStatus(t.leadCapture.required);
      return;
    }
    if (WEB3FORMS_ACCESS_KEY.startsWith("TODO")) {
      setStatusIsError(true);
      setStatus(t.leadCapture.error);
      return;
    }

    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Soft lead request from ${form.name} - AFAQ Digital website`,
          name: form.name,
          email: form.email,
          whatsapp: form.whatsapp,
          service: form.service,
          project_brief: form.brief,
          language: lang,
          source: "Stage 6A-1 soft lead capture"
        })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Submission failed");
      window.localStorage.setItem(SUBMITTED_KEY, String(Date.now()));
      setStatusIsError(false);
      setStatus(t.leadCapture.success);
      setSubmitted(true);
      setForm(initialForm);
      setTouched(false);
    } catch {
      setStatusIsError(true);
      setStatus(t.leadCapture.error);
    } finally {
      setSending(false);
    }
  };

  if (!visible) return null;

  const fieldClass = (key) => (touched && !form[key].trim() ? "is-invalid" : "");

  return (
    <div className="lead-capture" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closePanel("dismiss")}>
      <section
        className="lead-capture__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-title"
        aria-describedby="lead-capture-intro"
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="lead-capture__close" type="button" aria-label={t.leadCapture.close} onClick={() => closePanel("dismiss")}>
          ×
        </button>
        {submitted ? (
          <div className="lead-capture__success" tabIndex="-1">
            <span className="lead-capture__eyebrow">{t.leadCapture.eyebrow}</span>
            <h2 id="lead-capture-title">{t.leadCapture.title}</h2>
            <p>{status}</p>
            <button className="btn btn--primary" type="button" onClick={() => closePanel("submitted")}>
              {t.leadCapture.close}
            </button>
          </div>
        ) : (
          <form className="lead-capture__form" onSubmit={onSubmit} noValidate>
            <div className="lead-capture__copy">
              <span className="lead-capture__eyebrow">{t.leadCapture.eyebrow}</span>
              <h2 id="lead-capture-title">{t.leadCapture.title}</h2>
              <p id="lead-capture-intro">{t.leadCapture.intro}</p>
            </div>
            <div className="lead-capture__fields">
              <label>
                <span>{t.leadCapture.fields.name}</span>
                <input
                  className={fieldClass("name")}
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={updateField}
                  ref={firstFieldRef}
                />
              </label>
              <label>
                <span>{t.leadCapture.fields.email}</span>
                <input className={fieldClass("email")} type="email" name="email" autoComplete="email" value={form.email} onChange={updateField} />
              </label>
              <label>
                <span>{t.leadCapture.fields.whatsapp}</span>
                <input type="tel" name="whatsapp" autoComplete="tel" value={form.whatsapp} onChange={updateField} />
              </label>
              <label>
                <span>{t.leadCapture.fields.service}</span>
                <select className={fieldClass("service")} name="service" value={form.service} onChange={updateField}>
                  <option value="" />
                  {t.leadCapture.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="lead-capture__brief">
              <span>{t.leadCapture.fields.brief}</span>
              <textarea name="brief" rows="3" placeholder={t.leadCapture.briefPlaceholder} value={form.brief} onChange={updateField} />
            </label>
            {status && <p className={`lead-capture__status ${statusIsError ? "is-error" : ""}`}>{status}</p>}
            <div className="lead-capture__actions">
              <button className="btn btn--primary" type="submit" disabled={sending}>
                {sending ? t.leadCapture.sending : t.leadCapture.submit}
              </button>
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                {t.leadCapture.whatsappLink}
              </a>
            </div>
            <p className="lead-capture__privacy">{t.leadCapture.privacy}</p>
          </form>
        )}
      </section>
    </div>
  );
}
