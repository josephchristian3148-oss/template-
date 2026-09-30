import type { AgentId, DimensionId, Horizon, PlanHorizon, Stance } from "./types";

export const DIMENSIONS: Record<
  DimensionId,
  { label: string; short: string; question: string }
> = {
  customer: {
    label: "Customer value",
    short: "Customer",
    question: "Does this make the product more useful, trusted, or chosen?",
  },
  revenue: {
    label: "Revenue & growth",
    short: "Revenue",
    question: "Does this change how money is earned, kept, or expanded?",
  },
  operations: {
    label: "Operational leverage",
    short: "Operations",
    question: "Does this reduce friction, cost-to-serve, or delivery drag?",
  },
  people: {
    label: "People & culture",
    short: "People",
    question: "Does this change who stays, who joins, and how work feels?",
  },
  risk: {
    label: "Risk & resilience",
    short: "Risk",
    question: "Does this concentrate, hide, or absorb failure?",
  },
  optionality: {
    label: "Strategic optionality",
    short: "Options",
    question: "Does this open future moves, or lock the company in?",
  },
};

export const AGENTS: Record<
  AgentId,
  {
    name: string;
    role: string;
    lens: string;
    dimension: DimensionId | "sequence";
    watching: string;
  }
> = {
  atlas: {
    name: "Atlas",
    role: "Customer & market",
    lens: "Who feels this first, and do they stay?",
    dimension: "customer",
    watching: "Reading the customer surface",
  },
  forge: {
    name: "Forge",
    role: "Revenue & economics",
    lens: "Where does the cash actually move?",
    dimension: "revenue",
    watching: "Tracing unit economics",
  },
  loom: {
    name: "Loom",
    role: "Operations & delivery",
    lens: "What has to keep running while this lands?",
    dimension: "operations",
    watching: "Mapping the delivery load",
  },
  hearth: {
    name: "Hearth",
    role: "People & change",
    lens: "Who has to believe this, and who will not?",
    dimension: "people",
    watching: "Weighing the human cost",
  },
  sentinel: {
    name: "Sentinel",
    role: "Risk & second-order",
    lens: "What breaks if this works too well?",
    dimension: "risk",
    watching: "Hunting second-order effects",
  },
  horizon: {
    name: "Horizon",
    role: "Sequencing",
    lens: "What is committed, what is a bet, what is a story?",
    dimension: "sequence",
    watching: "Ordering now, next, later",
  },
};

export const AGENT_ORDER: AgentId[] = [
  "atlas",
  "forge",
  "loom",
  "hearth",
  "sentinel",
  "horizon",
];

export const HORIZON_META: Record<
  Horizon,
  { label: string; commitment: string }
> = {
  now: { label: "Now", commitment: "Committed. Named owners. Killable in 30 days." },
  next: { label: "Next", commitment: "Prepared. Contingent on Now evidence." },
  later: { label: "Later", commitment: "Directional. Cheap to rewrite." },
};

export const PLAN_HORIZON_META: Record<
  PlanHorizon,
  { label: string; detail: string }
> = {
  "90d": { label: "90 days", detail: "A single season. High certainty, tight sequence." },
  "12m": { label: "12 months", detail: "A year of overlapping bets." },
  "3y": { label: "3 years", detail: "A strategic arc. Later is a hypothesis." },
};

export const STANCE_META: Record<Stance, { label: string; tone: "pos" | "mid" | "neg" }> = {
  champion: { label: "Champion", tone: "pos" },
  support: { label: "Support", tone: "pos" },
  neutral: { label: "Neutral", tone: "mid" },
  resist: { label: "Resist", tone: "neg" },
  block: { label: "Block", tone: "neg" },
};
