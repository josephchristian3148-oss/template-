export const DIMENSION_IDS = [
  "customer",
  "revenue",
  "operations",
  "people",
  "risk",
  "optionality",
] as const;

export type DimensionId = (typeof DIMENSION_IDS)[number];

export const AGENT_IDS = [
  "atlas",
  "forge",
  "loom",
  "hearth",
  "sentinel",
  "horizon",
] as const;

export type AgentId = (typeof AGENT_IDS)[number];

export const HORIZONS = ["now", "next", "later"] as const;
export type Horizon = (typeof HORIZONS)[number];

export const STANCES = [
  "champion",
  "support",
  "neutral",
  "resist",
  "block",
] as const;
export type Stance = (typeof STANCES)[number];

export const EFFORTS = ["S", "M", "L"] as const;
export type Effort = (typeof EFFORTS)[number];

export const PLAN_HORIZONS = ["90d", "12m", "3y"] as const;
export type PlanHorizon = (typeof PLAN_HORIZONS)[number];

export interface Briefing {
  initiative: string;
  context: string;
  planHorizon: PlanHorizon;
  nonNegotiable: string;
}

export interface DimensionScore {
  id: DimensionId;
  current: number;
  projected: number;
  summary: string;
}

export interface AgentReport {
  agentId: AgentId;
  verdict: string;
  findings: string[];
  tensions: string[];
  confidence: number;
}

export interface RoadmapMove {
  id: string;
  title: string;
  outcome: string;
  horizon: Horizon;
  dimensions: DimensionId[];
  effort: Effort;
  impact: number;
  dependencies: string[];
  metric: string;
}

export interface Stakeholder {
  name: string;
  stance: Stance;
  influence: number;
  need: string;
}

export interface SecondOrder {
  trigger: string;
  consequence: string;
  order: 2 | 3;
  valence: "risk" | "opportunity";
}

export interface Tradeoff {
  keep: string;
  give: string;
}

export interface Roadmap {
  id: string;
  title: string;
  thesis: string;
  briefing: Briefing;
  createdAt: string;
  source: "sample" | "council";
  dimensions: DimensionScore[];
  agents: AgentReport[];
  moves: RoadmapMove[];
  stakeholders: Stakeholder[];
  secondOrder: SecondOrder[];
  tradeoffs: Tradeoff[];
  killCriteria: string[];
}
