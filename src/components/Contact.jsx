import { useState } from "react";
import { LINKEDIN_URL, PHONE_DISPLAY, WEB3FORMS_ACCESS_KEY, WHATSAPP_URL, whatsappHref } from "../data/content.js";

const WEBSITE_REQUEST_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScjcL6Z3P-wodVN_9V3Lgca4cRvY8rq1Zl3hXxcY2khOaCEmQ/viewform?usp=header";

const initialForm = {
  name: "",
  business: "",
  whatsapp: "",
  service: "",
  message: ""
};

export default function Contact({ t }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState("");
  const [statusIsError, setStatusIsError] = useState(false);
  const [sending, setSending] = useState(false);
  const required = ["name", "whatsapp", "service"];
  const websiteRequestCard =
    t.dir === "rtl"
      ? {
          label: "نموذج طلب موقع إلكتروني",
          text: "املأ النموذج القصير لنفهم نشاطك التجاري ونجهز لك أفضل حل مناسب.",
          button: "افتح النموذج"
        }
      : {
          label: "WEBSITE REQUEST FORM",
          text: "Fill out our short form so we can understand your business and prepare the best website solution for you.",
          button: "Open Form"
        };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setTouched(true);
    if (required.some((key) => !form[key].trim())) {
      setStatusIsError(true);
      setStatus(t.contact.required);
      return;
    }

    // No real access key configured yet — fail honestly instead of pretending to send.
    if (WEB3FORMS_ACCESS_KEY.startsWith("TODO")) {
      setStatusIsError(true);
      setStatus(t.contact.error);
      return;
    }

    setSending(true);
    setStatus("");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New project request from ${form.name} — AFAQ Digital website`,
          name: form.name,
          business: form.business,
          whatsapp: form.whatsapp,
          service: form.service,
          message: form.message
        })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || "Submission failed");
      setStatusIsError(false);
      setStatus(t.contact.success);
      setForm(initialForm);
      setTouched(false);
    } catch {
      setStatusIsError(true);
      setStatus(t.contact.error);
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (key) => (touched && required.includes(key) && !form[key].trim() ? "is-invalid" : "");

  return (
    <section className="section section--contact" id="contact">
      <div className="shell contact-grid">
        <div className="contact-copy reveal">
          <span className="section-kicker">{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
          <div className="contact-cards">
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <span>{t.contact.cards[0]}</span>
              <strong dir="ltr">{PHONE_DISPLAY}</strong>
            </a>
            <a className="contact-card--form" href={WEBSITE_REQUEST_FORM_URL} target="_blank" rel="noopener noreferrer">
              <span>{websiteRequestCard.label}</span>
              <strong>{websiteRequestCard.text}</strong>
              <em>{websiteRequestCard.button}</em>
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <span>{t.contact.cards[2]}</span>
              <strong>{t.contact.linkedinCta}</strong>
            </a>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <label>
              <span>{t.contact.fields.name}</span>
              <input className={fieldClass("name")} name="name" value={form.name} onChange={updateField} />
            </label>
            <label>
              <span>{t.contact.fields.business}</span>
              <input name="business" value={form.business} onChange={updateField} />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span>{t.contact.fields.whatsapp}</span>
              <input className={fieldClass("whatsapp")} name="whatsapp" value={form.whatsapp} onChange={updateField} />
            </label>
            <label>
              <span>{t.contact.fields.service}</span>
              <select className={fieldClass("service")} name="service" value={form.service} onChange={updateField}>
                <option value="" />
                {t.contact.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span>{t.contact.fields.message}</span>
            <textarea name="message" rows="5" value={form.message} onChange={updateField} />
          </label>
          {status && <p className={`form-status ${statusIsError ? "is-error" : ""}`}>{status}</p>}
          <div className="form-actions">
            <button className="btn btn--primary" type="submit" disabled={sending}>
              {sending ? t.contact.sending : t.contact.submit}
            </button>
            <a className="btn btn--ghost" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.contact.whatsapp}
            </a>
          </div>
          <input type="hidden" name="whatsapp_direct" value={WHATSAPP_URL} />
        </form>
      </div>
    </section>
  );
}
