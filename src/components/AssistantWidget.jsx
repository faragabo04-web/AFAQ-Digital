import { useEffect, useState } from "react";
import { whatsappHref } from "../data/content.js";
import { OPEN_ASSISTANT_EVENT } from "../data/serviceProofMap.js";
import Logo from "./Logo.jsx";

export default function AssistantWidget({ t }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([t.assistant.welcome]);

  useEffect(() => {
    setMessages([t.assistant.welcome]);
  }, [t.assistant.welcome]);

  // The AI Website Assistant service card opens this widget as its live demo.
  useEffect(() => {
    const openAssistant = () => setOpen(true);
    window.addEventListener(OPEN_ASSISTANT_EVENT, openAssistant);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, openAssistant);
  }, []);

  const chooseAction = (index) => {
    const response = t.assistant.responses[index];
    setMessages((current) => [...current, t.assistant.quickActions[index], response]);
    if (index === 0) document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    if (index === 1 || index === 3) document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    if (index === 4) window.open(whatsappHref, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`assistant-widget ${open ? "is-open" : ""}`}>
      {open && (
        <div className="assistant-panel">
          <div className="assistant-header">
            <Logo variant="icon" />
            <div>
              <h3>{t.assistant.name}</h3>
              <p>{t.assistant.subtitle}</p>
            </div>
            <button type="button" aria-label="Close assistant" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="assistant-messages">
            {messages.map((message, index) => (
              <p className={index % 2 === 0 ? "assistant-message" : "assistant-message assistant-message--user"} key={`${message}-${index}`}>
                {message}
              </p>
            ))}
          </div>
          <div className="quick-actions" aria-label={t.assistant.inputPlaceholder}>
            {t.assistant.quickActions.map((action, index) => (
              <button type="button" key={action} onClick={() => chooseAction(index)}>
                {action}
              </button>
            ))}
          </div>
        </div>
      )}
      <button className="assistant-bubble" type="button" aria-label={t.assistant.name} onClick={() => setOpen((value) => !value)}>
        <span className="assistant-bubble-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M5.8 6.2h12.4a3 3 0 0 1 3 3v5.5a3 3 0 0 1-3 3h-4.9l-3.7 3.1v-3.1H5.8a3 3 0 0 1-3-3V9.2a3 3 0 0 1 3-3Z" />
            <path d="M7.4 11.5h.01M12 11.5h.01M16.6 11.5h.01" />
          </svg>
          <span>AI</span>
        </span>
        <span className="assistant-bubble-label">{t.assistant.triggerLabel}</span>
      </button>
    </div>
  );
}
