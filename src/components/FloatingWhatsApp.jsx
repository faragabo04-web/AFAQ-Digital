import { PHONE_DISPLAY, whatsappHref } from "../data/content.js";

// Floating WhatsApp button — fixed bottom-right (the AI assistant lives bottom-left).
export default function FloatingWhatsApp({ t }) {
  const ariaLabel =
    t.dir === "rtl"
      ? `تواصل عبر واتساب ${PHONE_DISPLAY}`
      : `Chat on WhatsApp ${PHONE_DISPLAY}`;

  return (
    <a className="whatsapp-float" href={whatsappHref} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
      <span className="whatsapp-float-halo" aria-hidden="true" />
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M16.04 4.02A9.86 9.86 0 0 0 7.5 18.8L6.2 23.5l4.86-1.27a9.83 9.83 0 0 0 4.98 1.35h.01A9.85 9.85 0 0 0 16.04 4.02Zm5.8 15.62a8.17 8.17 0 0 1-10.34 1l-.35-.2-2.88.75.77-2.8-.23-.36a8.17 8.17 0 1 1 13.03 1.61Zm-3.16-2.33c-.17-.09-1.02-.5-1.18-.56-.16-.06-.28-.09-.4.09-.12.17-.46.56-.57.68-.1.11-.21.13-.39.04-.17-.08-.73-.27-1.4-.86-.51-.46-.86-1.03-.96-1.2-.1-.18-.01-.27.08-.36.08-.08.18-.21.26-.31.09-.1.12-.17.18-.29.06-.11.03-.21-.01-.3-.05-.09-.4-.97-.55-1.33-.15-.35-.29-.3-.4-.31h-.34c-.12 0-.3.04-.46.21-.16.18-.6.59-.6 1.43s.62 1.66.7 1.78c.09.11 1.22 1.86 2.96 2.61.41.18.74.29.99.37.42.13.79.11 1.09.07.33-.05 1.02-.42 1.17-.82.14-.4.14-.75.1-.82-.05-.08-.16-.12-.33-.2Z" />
      </svg>
    </a>
  );
}
