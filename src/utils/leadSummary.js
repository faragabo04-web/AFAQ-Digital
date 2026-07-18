// Single source of truth for the readable project summary sent through
// Web3Forms. Pure and deterministic — no network, no storage, no side
// effects — so AssistantWidget.jsx never constructs this text itself.

import { LEAD_FORM_FIELDS } from "../data/assistantFlow.js";

const resolveOptionLabel = (field, data, optionLabels) => {
  const raw = data[field];
  if (!raw) return "—";
  if (field === LEAD_FORM_FIELDS.SERVICE_NEEDED) return optionLabels.serviceOptions[raw] || raw;
  if (field === LEAD_FORM_FIELDS.PRIMARY_GOAL) return optionLabels.goalOptions[raw] || raw;
  if (field === LEAD_FORM_FIELDS.PREFERRED_START) return optionLabels.startOptions[raw] || raw;
  return raw;
};

// fieldLabels: t.smartAssistant.review.labels (localized row labels).
// optionLabels: t.smartAssistant.leadForm (serviceOptions/goalOptions/startOptions).
export function buildLeadSummary({ data, leadId, lang, sourceChannel, fieldLabels, optionLabels }) {
  const line = (field) => `${fieldLabels[field]}: ${resolveOptionLabel(field, data, optionLabels)}`;

  const lines = [
    line(LEAD_FORM_FIELDS.FULL_NAME),
    line(LEAD_FORM_FIELDS.WHATSAPP_NUMBER),
    line(LEAD_FORM_FIELDS.BUSINESS_NAME),
    line(LEAD_FORM_FIELDS.SERVICE_NEEDED),
    line(LEAD_FORM_FIELDS.PRIMARY_GOAL),
    line(LEAD_FORM_FIELDS.PROJECT_DETAILS),
    line(LEAD_FORM_FIELDS.PREFERRED_START),
    `${fieldLabels[LEAD_FORM_FIELDS.CONTACT_CONSENT]}: ${data[LEAD_FORM_FIELDS.CONTACT_CONSENT] ? "Confirmed" : "Not confirmed"}`,
    `Lead ID: ${leadId}`,
    `Language: ${lang}`,
    `Source Channel: ${sourceChannel}`
  ];

  return lines.join("\n");
}
