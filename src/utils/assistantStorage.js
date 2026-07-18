// Centralized, privacy-approved storage access for the AFAQ Smart Project
// Assistant. Only non-sensitive fields are ever written — never contact PII
// (name/email/WhatsApp/message/consent) and never translated display
// strings. Every read validates the stored value before use.

import { STATES } from "./assistantMachine.js";

const KEYS = {
  SESSION_ID: "afaq-assistant-session-id",
  TEASER_SHOWN_SESSION: "afaq-assistant-teaser-shown-session",
  OPENED_SESSION: "afaq-assistant-opened-session",
  CURRENT_STATE_SESSION: "afaq-assistant-state-session",
  TEASER_DISMISSED_AT: "afaq-assistant-teaser-dismissed-at"
};

const DAY_MS = 24 * 60 * 60 * 1000;
const VALID_STATES = new Set(Object.values(STATES));

const safeGet = (storage, key) => {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (storage, key, value) => {
  try {
    storage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode, quota, etc.) — fail silently, the
    // assistant remains fully usable without persistence.
  }
};

const getSession = () => (typeof window === "undefined" ? null : window.sessionStorage);
const getLocal = () => (typeof window === "undefined" ? null : window.localStorage);

export function getOrCreateSessionId() {
  const storage = getSession();
  if (!storage) return null;
  const existing = safeGet(storage, KEYS.SESSION_ID);
  if (typeof existing === "string" && existing.length > 0) return existing;
  const id =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `sa-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  safeSet(storage, KEYS.SESSION_ID, id);
  return id;
}

export function hasTeaserBeenShownThisSession() {
  const storage = getSession();
  if (!storage) return false;
  return safeGet(storage, KEYS.TEASER_SHOWN_SESSION) === "1";
}

export function markTeaserShownThisSession() {
  const storage = getSession();
  if (!storage) return;
  safeSet(storage, KEYS.TEASER_SHOWN_SESSION, "1");
}

export function hasAssistantBeenOpenedThisSession() {
  const storage = getSession();
  if (!storage) return false;
  return safeGet(storage, KEYS.OPENED_SESSION) === "1";
}

export function markAssistantOpenedThisSession() {
  const storage = getSession();
  if (!storage) return;
  safeSet(storage, KEYS.OPENED_SESSION, "1");
}

export function isTeaserSuppressedByRecentDismissal() {
  const storage = getLocal();
  if (!storage) return false;
  const raw = safeGet(storage, KEYS.TEASER_DISMISSED_AT);
  const dismissedAt = Number(raw);
  if (!Number.isFinite(dismissedAt) || dismissedAt <= 0) return false;
  return Date.now() - dismissedAt < DAY_MS;
}

export function markTeaserDismissedNow() {
  const storage = getLocal();
  if (!storage) return;
  safeSet(storage, KEYS.TEASER_DISMISSED_AT, String(Date.now()));
}

// Persists only the current FSM state name (a canonical string, never
// translated copy or answer content) for lightweight session coordination.
export function persistCurrentState(state) {
  if (!VALID_STATES.has(state)) return;
  const storage = getSession();
  if (!storage) return;
  safeSet(storage, KEYS.CURRENT_STATE_SESSION, state);
}

export function readPersistedState() {
  const storage = getSession();
  if (!storage) return null;
  const value = safeGet(storage, KEYS.CURRENT_STATE_SESSION);
  return VALID_STATES.has(value) ? value : null;
}
