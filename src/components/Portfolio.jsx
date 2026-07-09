import { useEffect, useMemo, useState } from "react";
import SectionIntro from "./SectionIntro.jsx";

// Keyed by project link (stable across languages and list order) rather than
// array position, so reordering portfolio.items in content.js can never mismatch a card's theme.
const projectVisualsByLink = {
  "https://zawianasr.com/": { badge: "Z", style: "zawia", nav: ["Services", "Booking", "WhatsApp"], ctas: ["Book", "Maps"] },
  "https://faragabo04-web.github.io/Cool-Grand-restaurant/": { badge: "CG", style: "cool", nav: ["Menu", "Order", "Location"], ctas: ["Menu", "Order"] },
  "https://ahmed-farouk-vante-noir.vercel.app/": { badge: "VN", style: "vante", nav: ["Brand", "Work", "Story"], ctas: ["View", "Brand"] },
  "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/": { badge: "MM", style: "play", nav: ["Gallery", "Pricing", "Booking"], ctas: ["Gallery", "Book"] },
  "https://faragabo04-web.github.io/beauty-pets/": { badge: "BP", style: "pets", nav: ["Grooming", "Products", "Care"], ctas: ["Services", "Shop"] },
  "https://www.muyedmohammed.xyz/": { badge: "M", style: "muyed", nav: ["Services", "Work", "WhatsApp"], ctas: ["View", "Chat"] }
};

const defaultVisual = { badge: "•", style: "builder", nav: ["Preview"], ctas: ["View"] };

const builderVisual = { badge: "+", style: "builder", nav: ["Project", "Preview", "Object"], ctas: ["Preview", "Copy"] };

const builderCopy = {
  en: {
    addTitle: "Add New Project",
    helperLabel: "Internal Helper",
    addDescription: "Open a compact builder to prepare a future portfolio card and copy a clean data object.",
    builderTitle: "Project Builder",
    builderIntro: "Enter the project details, preview the portfolio card, then copy the object into your data file.",
    fields: {
      url: "Project URL",
      title: "Project Title",
      label: "Project Label",
      description: "Short Description",
      impact: "Impact Note",
      tags: "Tags",
      initials: "Logo Initials",
      status: "Status"
    },
    statuses: ["Live Project", "Website Project", "Website Concept", "Coming Soon"],
    previewTitle: "Live Preview",
    previewCta: "View Project",
    comingSoon: "Coming Soon",
    copy: "Copy Project Object",
    copied: "Copied. Paste it into your projects data file.",
    pasteNote: "Paste this object inside the projects array in src/data/projects.js or the current portfolio data file.",
    close: "Close",
    placeholderTags: "Website, Business, WhatsApp"
  },
  ar: {
    addTitle: "إضافة مشروع جديد",
    helperLabel: "أداة داخلية",
    addDescription: "افتح منشئًا مختصرًا لتحضير كارت مشروع جديد ونسخ كود بيانات جاهز.",
    builderTitle: "منشئ مشروع جديد",
    builderIntro: "أدخل بيانات المشروع، شاهد معاينة الكارت، ثم انسخ الكود إلى ملف البيانات.",
    fields: {
      url: "رابط المشروع",
      title: "اسم المشروع",
      label: "نوع المشروع",
      description: "وصف مختصر",
      impact: "لمحة التأثير",
      tags: "التصنيفات",
      initials: "اختصار اللوجو",
      status: "الحالة"
    },
    statuses: ["مشروع منشور", "مشروع موقع", "نموذج موقع", "قريبًا"],
    previewTitle: "معاينة مباشرة",
    previewCta: "عرض المشروع",
    comingSoon: "قريبًا",
    copy: "نسخ كود المشروع",
    copied: "تم النسخ. الصقه داخل ملف بيانات المشاريع.",
    pasteNote: "الصق هذا الكود داخل قائمة المشاريع في ملف src/data/projects.js أو ملف بيانات المشاريع الحالي.",
    close: "إغلاق",
    placeholderTags: "Website, Business, WhatsApp"
  }
};

const initialBuilderForm = {
  url: "",
  title: "",
  label: "",
  description: "",
  impact: "",
  tags: "",
  initials: "",
  status: ""
};

const isValidUrl = (value) => {
  if (!value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const titleFromUrl = (value) => {
  if (!isValidUrl(value)) return "";
  const host = new URL(value).hostname.replace(/^www\./, "");
  const clean = host.split(".")[0].replace(/[-_]+/g, " ");
  return clean.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const createSlug = (value) => {
  const fallback = "new-project";
  return (value || fallback)
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48) || fallback;
};

const getInitials = (value) => {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "NP";
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const formatTags = (value) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const generateProjectObject = (form, copy, lang) => {
  const title = form.title.trim() || titleFromUrl(form.url) || "Project Name";
  const label = form.label.trim() || form.status || copy.statuses[1];
  const description = form.description.trim() || "Short project description.";
  const impact = form.impact.trim() || "Short impact note.";
  const tags = formatTags(form.tags);
  const url = isValidUrl(form.url) ? form.url.trim() : "";
  const initials = (form.initials.trim() || getInitials(title)).toUpperCase();
  const isComingSoon = !url || form.status === copy.statuses[3];
  const clean = (value) => value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const text = (value) => `{ en: "${clean(value)}", ar: "${clean(value)}" }`;

  return `{
  id: "${createSlug(title || url)}",
  title: ${text(title)},
  label: ${text(label)},
  description: ${text(description)},
  impact: ${text(impact)},
  tags: ${JSON.stringify(tags.length ? tags : ["Website", "Business"], null, 2).replace(/\n/g, "\n  ")},
  url: "${clean(url)}",
  initials: "${clean(initials)}",
  isComingSoon: ${isComingSoon},
  accent: "gold"
}`;
};

function ProjectCard({ item, visual, index, isPreview = false, labels }) {
  const active = Boolean(item.link);
  const isVideoStyle = visual.style === "muyed";
  const titleContent = (
    <>
      <span className={`project-logo-badge project-logo-badge--${visual.style}`}>{visual.badge}</span>
      <span>{item.title}</span>
    </>
  );

  return (
    <article className={`project-card project-card--${visual.style} reveal ${active ? "is-active" : "is-disabled"} ${isPreview ? "project-card--preview" : ""}`}>
      <div className="project-preview">
        <div className={`preview-window preview-window--${visual.style}`} aria-hidden="true">
          <div className="preview-browser">
            <div className="preview-browser-bar">
              <span />
              <span />
              <span />
              <em>{visual.nav.join(" · ")}</em>
            </div>
            <div className="preview-screen">
              <div className="preview-hero-block">
                <span className="preview-mark">
                  {isVideoStyle ? <span className="preview-play-icon" aria-hidden="true" /> : visual.badge}
                </span>
                <div>
                  <span className="preview-line preview-line--wide" />
                  <span className={`preview-line ${isVideoStyle ? "preview-line--timeline" : ""}`} />
                  <span className="preview-line preview-line--short" />
                </div>
              </div>
              <div className={`preview-ui-grid ${isVideoStyle ? "preview-ui-grid--reel" : ""}`}>
                <span />
                <span />
                <span />
              </div>
              <div className="preview-cta-row">
                {visual.ctas.map((cta) => (
                  <span key={cta}>{cta}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="project-body">
        <div className="project-heading">
          <span className="project-label">{item.label}</span>
          <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="project-title">
          {active ? (
            <a href={item.link} target="_blank" rel="noreferrer">
              {titleContent}
            </a>
          ) : (
            <span>{titleContent}</span>
          )}
        </h3>
        <p>{item.description}</p>
        {item.impact && <p className="impact-note">{item.impact}</p>}
        <div className="tag-row">
          {item.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {active ? (
          <a className="text-link" href={item.link} target="_blank" rel="noreferrer">
            {item.button}
          </a>
        ) : (
          <span className="text-link text-link--disabled">{labels?.comingSoon || item.button}</span>
        )}
      </div>
    </article>
  );
}

export default function Portfolio({ t }) {
  const lang = t.dir === "rtl" ? "ar" : "en";
  const copy = builderCopy[lang];
  const [builderOpen, setBuilderOpen] = useState(false);
  const [form, setForm] = useState(() => ({ ...initialBuilderForm, status: copy.statuses[1], label: copy.statuses[1] }));
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!builderOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setBuilderOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [builderOpen]);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      status: current.status || copy.statuses[1],
      label: current.label || copy.statuses[1]
    }));
  }, [copy.statuses]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setCopyStatus("");
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === "url" && !current.title.trim()) {
        const suggested = titleFromUrl(value);
        if (suggested) next.title = suggested;
      }
      if (name === "status") next.label = value;
      if (name === "title" && !current.initials.trim()) next.initials = getInitials(value);
      return next;
    });
  };

  const previewItem = useMemo(() => {
    const title = form.title.trim() || titleFromUrl(form.url) || copy.addTitle;
    const tags = formatTags(form.tags);
    const active = isValidUrl(form.url) && form.status !== copy.statuses[3];

    return {
      title,
      label: form.label.trim() || form.status || copy.statuses[1],
      link: active ? form.url.trim() : "",
      description: form.description.trim() || copy.addDescription,
      impact: form.impact.trim(),
      tags: tags.length ? tags : ["Website", "Business", "WhatsApp"],
      button: active ? copy.previewCta : copy.comingSoon
    };
  }, [copy, form]);

  const previewVisual = useMemo(
    () => ({
      badge: (form.initials.trim() || getInitials(previewItem.title)).toUpperCase().slice(0, 3),
      style: "builder",
      nav: ["Preview", "Tags", "CTA"],
      ctas: previewItem.link ? ["Live", "Open"] : ["Draft", "Soon"]
    }),
    [form.initials, previewItem.link, previewItem.title]
  );

  const generatedObject = useMemo(() => generateProjectObject(form, copy, lang), [copy, form, lang]);

  const copyObject = async () => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(generatedObject);
    }
    setCopyStatus(copy.copied);
  };

  return (
    <section className="section" id="work">
      <div className="shell">
        <SectionIntro title={t.portfolio.title} description={t.portfolio.description} />
        <div className="portfolio-grid">
          {t.portfolio.items.map((item, index) => (
            <ProjectCard
              item={item}
              visual={projectVisualsByLink[item.link] ?? defaultVisual}
              index={index}
              key={item.link ?? item.title}
              labels={copy}
            />
          ))}

          <button className="project-card project-card--builder reveal" type="button" onClick={() => setBuilderOpen(true)}>
            <div className="builder-plus" aria-hidden="true">
              +
            </div>
            <span className="project-label">{copy.helperLabel}</span>
            <h3>{copy.addTitle}</h3>
            <p>{copy.addDescription}</p>
            <span className="text-link">{copy.builderTitle}</span>
          </button>
        </div>
      </div>

      {builderOpen && (
        <div className="project-builder-overlay" role="presentation" onMouseDown={() => setBuilderOpen(false)}>
          <div className="project-builder-modal" role="dialog" aria-modal="true" aria-labelledby="project-builder-title" onMouseDown={(event) => event.stopPropagation()}>
            <div className="project-builder-head">
              <div>
                <span className="section-kicker">{copy.helperLabel}</span>
                <h3 id="project-builder-title">{copy.builderTitle}</h3>
                <p>{copy.builderIntro}</p>
              </div>
              <button className="project-builder-close" type="button" onClick={() => setBuilderOpen(false)} aria-label={copy.close}>
                ×
              </button>
            </div>

            <div className="project-builder-grid">
              <form className="project-builder-form">
                <label>
                  <span>{copy.fields.url}</span>
                  <input name="url" value={form.url} onChange={updateField} placeholder="https://example.com" />
                </label>
                <div className="form-row">
                  <label>
                    <span>{copy.fields.title}</span>
                    <input name="title" value={form.title} onChange={updateField} />
                  </label>
                  <label>
                    <span>{copy.fields.initials}</span>
                    <input name="initials" value={form.initials} onChange={updateField} maxLength="3" />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    <span>{copy.fields.status}</span>
                    <select name="status" value={form.status} onChange={updateField}>
                      {copy.statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{copy.fields.label}</span>
                    <input name="label" value={form.label} onChange={updateField} />
                  </label>
                </div>
                <label>
                  <span>{copy.fields.description}</span>
                  <textarea name="description" rows="3" value={form.description} onChange={updateField} />
                </label>
                <label>
                  <span>{copy.fields.impact}</span>
                  <input name="impact" value={form.impact} onChange={updateField} />
                </label>
                <label>
                  <span>{copy.fields.tags}</span>
                  <input name="tags" value={form.tags} onChange={updateField} placeholder={copy.placeholderTags} />
                </label>
              </form>

              <div className="project-builder-preview">
                <h4>{copy.previewTitle}</h4>
                <ProjectCard item={previewItem} visual={previewVisual} index={t.portfolio.items.length} isPreview labels={copy} />
              </div>
            </div>

            <div className="project-object-panel">
              <p>{copy.pasteNote}</p>
              <pre>
                <code>{generatedObject}</code>
              </pre>
              <div className="project-object-actions">
                <button className="btn btn--primary" type="button" onClick={copyObject}>
                  {copy.copy}
                </button>
                {copyStatus && <span>{copyStatus}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
