import { LINKEDIN_URL } from "./content.js";

/*
 * Central service → proof mapping (Services cards are gateways to real proof).
 *
 * proof types:
 *  - "work":      internal filtered Work view (project links keyed below)
 *  - "contact":   legitimate request/contact destination (no public demo yet)
 *  - "external":  approved public URL already stored in project data
 *  - "assistant": opens the live AssistantWidget on this site (real demo)
 *
 * To activate a real public Business Systems demo later, change that entry to
 * { proof: "external", url: "<neutral public demo URL>" } — no component edits needed.
 */
export const serviceProof = {
  websites: { proof: "work" },
  ecommerce: { proof: "work" },
  dashboards: { proof: "contact", url: "#contact" },
  "google-business": { proof: "contact", url: "#contact" },
  linkedin: { proof: "external", url: LINKEDIN_URL },
  "ai-assistant": { proof: "assistant" }
};

/* Which portfolio projects (keyed by their live link in content.js) prove which service.
   Every current project is a real website build; VANTÉ NOIR also stands as the
   e-commerce/premium-store proof (the only store-type project in the data). */
export const projectServicesByLink = {
  "https://zawianasr.com/": ["websites"],
  "https://www.muyedmohammed.xyz/": ["websites"],
  "https://faragabo04-web.github.io/beauty-pets/": ["websites"],
  "https://ahmed-farouk-vante-noir.vercel.app/": ["websites", "ecommerce"],
  "https://faragabo04-web.github.io/MM-PLAYAREA-PREMIUM/": ["websites"],
  "https://faragabo04-web.github.io/Cool-Grand-restaurant/": ["websites"]
};

export const OPEN_ASSISTANT_EVENT = "afaq:open-assistant";
