// Reducer-based finite-state machine for the AFAQ Smart Project Assistant.
// Canonical states/events are all defined here so every stage references
// the same constants; only the Stage 6B-1 transitions are implemented.
// Unhandled {state, event} pairs are safe no-ops (state unchanged) so later
// stages can add cases without redesigning the reducer.

export const STATES = {
  IDLE: "IDLE",
  TEASER_VISIBLE: "TEASER_VISIBLE",
  OPEN_MENU: "OPEN_MENU",
  QUICK_GUIDANCE: "QUICK_GUIDANCE",
  GUIDED_FLOW: "GUIDED_FLOW",
  SUMMARY: "SUMMARY",
  LEAD_FORM: "LEAD_FORM",
  SUBMITTING: "SUBMITTING",
  SUCCESS: "SUCCESS",
  MANUAL_FALLBACK: "MANUAL_FALLBACK",
  CLOSED: "CLOSED"
};

export const EVENTS = {
  SHOW_TEASER: "SHOW_TEASER",
  OPEN_ASSISTANT: "OPEN_ASSISTANT",
  OPEN_QUICK_GUIDANCE: "OPEN_QUICK_GUIDANCE",
  OPEN_LEAD_FORM: "OPEN_LEAD_FORM",
  CHOOSE_QUICK_GUIDANCE: "CHOOSE_QUICK_GUIDANCE",
  CHOOSE_LEAD_FORM: "CHOOSE_LEAD_FORM",
  ANSWER_STEP: "ANSWER_STEP",
  GO_BACK: "GO_BACK",
  EDIT_ANSWER: "EDIT_ANSWER",
  SHOW_SUMMARY: "SHOW_SUMMARY",
  SUBMIT_LEAD: "SUBMIT_LEAD",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  SUBMIT_FAILURE: "SUBMIT_FAILURE",
  RESET: "RESET",
  CLOSE: "CLOSE"
};

export const initialAssistantState = STATES.IDLE;

// States considered "open" for the purposes of the universal CLOSE event —
// every state except IDLE and CLOSED itself.
const OPEN_STATES = new Set([
  STATES.TEASER_VISIBLE,
  STATES.OPEN_MENU,
  STATES.QUICK_GUIDANCE,
  STATES.GUIDED_FLOW,
  STATES.SUMMARY,
  STATES.LEAD_FORM,
  STATES.SUBMITTING,
  STATES.SUCCESS,
  STATES.MANUAL_FALLBACK
]);

// Accepts a Redux-style action object ({ type, ...payload }) — the shape
// every dispatch() call in AssistantWidget.jsx already sends, and the shape
// later stages will need anyway once events start carrying a payload
// (e.g. ANSWER_STEP's answer value).
export function assistantReducer(state, action) {
  const type = action?.type;

  // Universal: any open state closes on CLOSE.
  if (type === EVENTS.CLOSE && OPEN_STATES.has(state)) {
    return STATES.CLOSED;
  }

  switch (state) {
    case STATES.IDLE:
      if (type === EVENTS.SHOW_TEASER) return STATES.TEASER_VISIBLE;
      if (type === EVENTS.OPEN_ASSISTANT) return STATES.OPEN_MENU;
      if (type === EVENTS.OPEN_QUICK_GUIDANCE) return STATES.QUICK_GUIDANCE;
      if (type === EVENTS.OPEN_LEAD_FORM) return STATES.LEAD_FORM;
      return state;

    case STATES.TEASER_VISIBLE:
      if (type === EVENTS.OPEN_ASSISTANT) return STATES.OPEN_MENU;
      if (type === EVENTS.OPEN_QUICK_GUIDANCE) return STATES.QUICK_GUIDANCE;
      if (type === EVENTS.OPEN_LEAD_FORM) return STATES.LEAD_FORM;
      return state;

    case STATES.CLOSED:
      if (type === EVENTS.OPEN_ASSISTANT) return STATES.OPEN_MENU;
      if (type === EVENTS.OPEN_QUICK_GUIDANCE) return STATES.QUICK_GUIDANCE;
      if (type === EVENTS.OPEN_LEAD_FORM) return STATES.LEAD_FORM;
      if (type === EVENTS.RESET) return STATES.IDLE;
      return state;

    case STATES.OPEN_MENU:
      if (type === EVENTS.CHOOSE_QUICK_GUIDANCE) return STATES.QUICK_GUIDANCE;
      if (type === EVENTS.CHOOSE_LEAD_FORM) return STATES.LEAD_FORM;
      return state;

    case STATES.QUICK_GUIDANCE:
      if (type === EVENTS.GO_BACK) return STATES.OPEN_MENU;
      return state;

    case STATES.LEAD_FORM:
      if (type === EVENTS.GO_BACK) return STATES.OPEN_MENU;
      if (type === EVENTS.SHOW_SUMMARY) return STATES.SUMMARY;
      return state;

    case STATES.SUMMARY:
      if (type === EVENTS.EDIT_ANSWER) return STATES.LEAD_FORM;
      if (type === EVENTS.GO_BACK) return STATES.OPEN_MENU;
      return state;

    default:
      return state;
  }
}
