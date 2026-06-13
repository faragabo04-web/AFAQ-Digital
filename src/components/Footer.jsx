import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, PHONE_DISPLAY, WHATSAPP_NUMBER, whatsappHref } from "../data/content.js";
import Logo from "./Logo.jsx";

const footerIds = ["home", "services", "work", "process", "faq", "contact"];
const footerServiceTargets = [
  "#service-websites",
  "#service-ecommerce",
  "#service-dashboards",
  "#service-google-business",
  "#service-linkedin",
  "#service-ai-assistant",
];
const phoneDisplay = PHONE_DISPLAY;
const phoneHref = `tel:+${WHATSAPP_NUMBER}`;

function FooterIcon({ type }) {
  const icons = {
    whatsapp: (
      <path d="M16.04 4.02A9.86 9.86 0 0 0 7.5 18.8L6.2 23.5l4.86-1.27a9.83 9.83 0 0 0 4.98 1.35h.01A9.85 9.85 0 0 0 16.04 4.02Zm5.8 15.62a8.17 8.17 0 0 1-10.34 1l-.35-.2-2.88.75.77-2.8-.23-.36a8.17 8.17 0 1 1 13.03 1.61Zm-3.16-2.33c-.17-.09-1.02-.5-1.18-.56-.16-.06-.28-.09-.4.09-.12.17-.46.56-.57.68-.1.11-.21.13-.39.04-.17-.08-.73-.27-1.4-.86-.51-.46-.86-1.03-.96-1.2-.1-.18-.01-.27.08-.36.08-.08.18-.21.26-.31.09-.1.12-.17.18-.29.06-.11.03-.21-.01-.3-.05-.09-.4-.97-.55-1.33-.15-.35-.29-.3-.4-.31h-.34c-.12 0-.3.04-.46.21-.16.18-.6.59-.6 1.43s.62 1.66.7 1.78c.09.11 1.22 1.86 2.96 2.61.41.18.74.29.99.37.42.13.79.11 1.09.07.33-.05 1.02-.42 1.17-.82.14-.4.14-.75.1-.82-.05-.08-.16-.12-.33-.2Z" />
    ),
    phone: (
      <path d="M7.2 4.5 9.6 4c.56-.12 1.13.17 1.35.7l1.1 2.57c.2.48.06 1.04-.35 1.36l-1.33 1.07a12.4 12.4 0 0 0 5.93 5.93l1.07-1.33c.32-.41.88-.55 1.36-.35l2.57 1.1c.53.22.82.79.7 1.35l-.5 2.4a2 2 0 0 1-1.96 1.6C10.72 20.4 3.6 13.28 3.6 4.46A2 2 0 0 1 5.2 2.5Z" />
    ),
    facebook: (
      <path d="M14.35 8.45V6.9c0-.75.5-.93.85-.93h2.16V2.2l-2.98-.02c-3.31 0-4.06 2.48-4.06 4.06v2.21H7.75v3.88h2.57v9.5h4.03v-9.5h3.38l.16-1.52.28-2.36h-3.82Z" />
    ),
    instagram: (
      <>
        <path d="M7.6 2.8h8.8a4.8 4.8 0 0 1 4.8 4.8v8.8a4.8 4.8 0 0 1-4.8 4.8H7.6a4.8 4.8 0 0 1-4.8-4.8V7.6a4.8 4.8 0 0 1 4.8-4.8Zm8.55 3.2a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Z" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="M12 8.1a3.9 3.9 0 1 1 0 7.8 3.9 3.9 0 0 1 0-7.8Z" fill="none" stroke="currentColor" strokeWidth="1.9" />
      </>
    ),
    linkedin: (
      <path d="M6.1 8.7H2.75v12.05H6.1V8.7ZM4.44 3.25a1.94 1.94 0 1 0 0 3.88 1.94 1.94 0 0 0 0-3.88Zm16.35 10.3c0-3.24-1.73-4.75-4.04-4.75a3.47 3.47 0 0 0-3.13 1.72V8.7h-3.22v12.05h3.36v-5.96c0-1.57.3-3.1 2.25-3.1 1.92 0 1.95 1.8 1.95 3.2v5.86h3.36v-7.2Z" />
    )
  };

  return (
    <svg className={`footer-icon footer-icon--${type}`} viewBox="0 0 24 24" aria-hidden="true">
      {icons[type]}
    </svg>
  );
}

export default function Footer({ t }) {
  const contactItems = [
    { icon: "whatsapp", label: t.footer.contact.whatsapp, value: phoneDisplay, href: whatsappHref },
    { icon: "phone", label: t.footer.contact.call, value: phoneDisplay, href: phoneHref },
    { icon: "linkedin", label: t.footer.contact.linkedin, value: "Ahmed Farouk", href: LINKEDIN_URL },
    { icon: "instagram", label: t.footer.contact.instagram, value: "@helloafaqdigital", href: INSTAGRAM_URL },
    { icon: "facebook", label: t.footer.contact.facebook, value: "helloafaqdigital", href: FACEBOOK_URL }
  ];
  const socialItems = [contactItems[0], contactItems[1], contactItems[4], contactItems[3], contactItems[2]];
  const highlightService = (href) => {
    window.setTimeout(() => {
      const target = document.querySelector(href);
      const card = target?.closest(".service-card") || target;

      if (!card) return;
      card.classList.remove("service-card--highlight");
      window.requestAnimationFrame(() => {
        card.classList.add("service-card--highlight");
        window.setTimeout(() => card.classList.remove("service-card--highlight"), 1800);
      });
    }, 260);
  };

  return (
    <footer className="site-footer">
      <div className="shell footer-shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo variant="header" />
            <p className="footer-slogan">{t.footer.slogan}</p>
            <p>{t.footer.description}</p>
            <p className="footer-location">{t.footer.location}</p>
            <div className="footer-socials" aria-label="Social and contact links">
              {socialItems.map((item) => (
                <a className={`footer-social footer-social--${item.icon}`} key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={item.label}>
                  <FooterIcon type={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>{t.footer.quickTitle}</h3>
            <div className="footer-links">
              {t.footer.links.map((label, index) => (
                <a href={`#${footerIds[index]}`} key={label}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column">
            <h3>{t.footer.servicesTitle}</h3>
            <div className="footer-links footer-services">
              {t.footer.services.map((service, index) => (
                <a href={footerServiceTargets[index]} key={service} onClick={() => highlightService(footerServiceTargets[index])}>
                  {service}
                </a>
              ))}
              <details className="footer-service-note">
                <summary>
                  <span>{t.footer.brandIdentity.label}</span>
                </summary>
                <p>{t.footer.brandIdentity.detail}</p>
              </details>
            </div>
          </div>

          <div className="footer-column">
            <h3>{t.footer.contactTitle}</h3>
            <div className="footer-contact">
              {contactItems.slice(0, 2).map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className={`footer-contact-icon footer-contact-icon--${item.icon}`}>
                    <FooterIcon type={item.icon} />
                  </span>
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              ))}
              {contactItems.slice(2).map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className={`footer-contact-icon footer-contact-icon--${item.icon}`}>
                    <FooterIcon type={item.icon} />
                  </span>
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.copyright}</p>
          {/* Developer credit intentionally has no link — LinkedIn already lives in the contact/social area. */}
          <span className="developer-credit">{t.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
