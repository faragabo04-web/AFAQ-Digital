// Canonical, channel-agnostic IDs and structure for the AFAQ Smart Project
// Assistant. Stable machine keys only — never translated strings. Visible
// EN/AR copy lives exclusively in src/data/content.js (key: smartAssistant).

export const SERVICE_IDS = {
  WEBSITES: "premium_websites",
  ECOMMERCE: "ecommerce",
  BUSINESS_SYSTEMS: "business_systems",
  GOOGLE_BUSINESS: "google_business",
  LINKEDIN: "linkedin",
  SMART_ASSISTANT: "smart_assistant",
  OTHER: "other"
};

// Ordered for <select> rendering — matches the approved copy order.
export const SERVICE_ID_LIST = [
  SERVICE_IDS.WEBSITES,
  SERVICE_IDS.ECOMMERCE,
  SERVICE_IDS.BUSINESS_SYSTEMS,
  SERVICE_IDS.GOOGLE_BUSINESS,
  SERVICE_IDS.LINKEDIN,
  SERVICE_IDS.SMART_ASSISTANT,
  SERVICE_IDS.OTHER
];

export const PRIMARY_GOAL_IDS = {
  ESTABLISH_DIGITAL_PRESENCE: "establish_digital_presence",
  GENERATE_LEADS: "generate_leads",
  SELL_ONLINE: "sell_online",
  IMPROVE_BUSINESS_OPERATIONS: "improve_business_operations",
  IMPROVE_PROFESSIONAL_PRESENCE: "improve_professional_presence",
  ADD_AUTOMATION: "add_automation",
  OTHER: "other"
};

export const PRIMARY_GOAL_ID_LIST = [
  PRIMARY_GOAL_IDS.ESTABLISH_DIGITAL_PRESENCE,
  PRIMARY_GOAL_IDS.GENERATE_LEADS,
  PRIMARY_GOAL_IDS.SELL_ONLINE,
  PRIMARY_GOAL_IDS.IMPROVE_BUSINESS_OPERATIONS,
  PRIMARY_GOAL_IDS.IMPROVE_PROFESSIONAL_PRESENCE,
  PRIMARY_GOAL_IDS.ADD_AUTOMATION,
  PRIMARY_GOAL_IDS.OTHER
];

export const PROJECT_STATUS_IDS = {
  NEW: "new",
  EXISTING: "existing"
};

export const TIMELINE_IDS = {
  ASAP: "asap",
  WITHIN_1_MONTH: "within_1_month",
  WITHIN_1_3_MONTHS: "within_1_3_months",
  EXPLORING: "exploring"
};

// The direct lead form's "Preferred Start" reuses the same canonical values
// as the guided flow's timeline question (Stage 6B-0C architecture lock),
// so both entry paths classify identically.
export const PREFERRED_START_ID_LIST = [
  TIMELINE_IDS.ASAP,
  TIMELINE_IDS.WITHIN_1_MONTH,
  TIMELINE_IDS.WITHIN_1_3_MONTHS,
  TIMELINE_IDS.EXPLORING
];

// Canonical field keys for the direct Project Lead Form (Stage 6B-1E).
export const LEAD_FORM_FIELDS = {
  FULL_NAME: "fullName",
  WHATSAPP_NUMBER: "whatsappNumber",
  BUSINESS_NAME: "businessName",
  SERVICE_NEEDED: "serviceNeeded",
  PRIMARY_GOAL: "primaryGoal",
  PROJECT_DETAILS: "projectDetails",
  PREFERRED_START: "preferredStart",
  CONTACT_CONSENT: "contactConsent"
};

export const SOURCE_CHANNEL_IDS = {
  WEBSITE: "website",
  WHATSAPP_APP: "whatsapp_app",
  WHATSAPP_PLATFORM: "whatsapp_platform"
};

export const HANDOFF_REASON_IDS = {
  EXPLICIT_HUMAN_REQUEST: "explicit_human_request",
  QUOTE_REQUEST: "quote_request",
  DISCOUNT_REQUEST: "discount_request",
  CONTRACT_OR_PAYMENT: "contract_or_payment",
  CUSTOM_SCOPE: "custom_scope",
  COMMITTED_DEADLINE: "committed_deadline",
  UNSUPPORTED_QUESTION: "unsupported_question",
  REPEATED_FAILURE: "repeated_failure",
  LOOP_DETECTED: "loop_detected",
  FRUSTRATION: "frustration",
  SENSITIVE_DATA: "sensitive_data"
};

export const ANALYTICS_EVENTS = {
  TEASER_SHOWN: "assistant_teaser_shown",
  ASSISTANT_OPENED: "assistant_opened",
  QUICK_GUIDANCE_STARTED: "quick_guidance_started",
  GUIDED_FLOW_STARTED: "guided_flow_started",
  GUIDED_FLOW_COMPLETED: "guided_flow_completed",
  LEAD_FORM_STARTED: "lead_form_started",
  LEAD_SUBMITTED: "lead_submitted",
  LEAD_WARM: "lead_warm",
  LEAD_HOT: "lead_hot",
  HUMAN_HANDOFF: "human_handoff",
  MANUAL_FALLBACK: "manual_fallback",
  FLOW_ABANDONED: "flow_abandoned"
};

// The five primary guided-flow questions (Stage 6B-3 implements the actual
// question flow; the IDs are locked here so every stage references the
// same keys).
export const PRIMARY_QUESTION_IDS = {
  BUSINESS_TYPE: "businessType",
  SERVICE_NEEDED: "serviceNeeded",
  PRIMARY_GOAL: "primaryGoal",
  PROJECT_STATUS: "projectStatus",
  TIMELINE: "timeline"
};

// The two locked optional follow-ups (Stage 6B-3):
// ECOMMERCE_CATALOG_SIZE fires when serviceNeeded === SERVICE_IDS.ECOMMERCE
// EXISTING_PLATFORM fires when projectStatus === PROJECT_STATUS_IDS.EXISTING
export const FOLLOW_UP_IDS = {
  ECOMMERCE_CATALOG_SIZE: "ecommerceCatalogSize",
  EXISTING_PLATFORM: "existingPlatform"
};
