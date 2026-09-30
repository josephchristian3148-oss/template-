import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { AGENT_IDS, DIMENSION_IDS, HORIZONS } from "./types";
import type { Briefing, Roadmap } from "./types";

const briefingSchema = z.object({
  initiative: z.string().min(8).max(1200),
  context: z.string().max(2000),
  planHorizon: z.enum(["90d", "12m", "3y"]),
  nonNegotiable: z.string().max(600),
});

const dimensionSchema = z.object({
  id: z.enum(DIMENSION_IDS),
  current: z.number().min(0).max(10),
  projected: z.number().min(0).max(10),
  summary: z.string().min(8).max(400),
});

const agentSchema = z.object({
  agentId: z.enum(AGENT_IDS),
  verdict: z.string().min(12).max(600),
  findings: z.array(z.string().min(8).max(280)).min(2).max(4),
  tensions: z.array(z.string().min(8).max(280)).min(1).max(3),
  confidence: z.number().min(0).max(1),
});

const moveSchema = z.object({
  id: z.string().min(1).max(40).optional(),
  title: z.string().min(8).max(140),
  outcome: z.string().min(12).max(320),
  horizon: z.enum(HORIZONS),
  dimensions: z.array(z.enum(DIMENSION_IDS)).min(1).max(4),
  effort: z.enum(["S", "M", "L"]),
  impact: z.number().min(1).max(10),
  dependencies: z.array(z.string().max(120)).max(4),
  metric: z.string().min(8).max(220),
});

const payloadSchema = z.object({
  title: z.string().min(4).max(80),
  thesis: z.string().min(20).max(400),
  dimensions: z.array(dimensionSchema).length(6),
  agents: z.array(agentSchema).length(6),
  moves: z.array(moveSchema).min(4).max(8),
  stakeholders: z
    .array(
      z.object({
        name: z.string().min(2).max(60),
        stance: z.enum(["champion", "support", "neutral", "resist", "block"]),
        influence: z.number().min(1).max(10),
        need: z.string().min(8).max(220),
      }),
    )
    .min(4)
    .max(8),
  secondOrder: z
    .array(
      z.object({
        trigger: z.string().min(8).max(180),
        consequence: z.string().min(12).max(280),
        order: z.union([z.literal(2), z.literal(3)]),
        valence: z.enum(["risk", "opportunity"]),
      }),
    )
    .min(3)
    .max(6),
  tradeoffs: z
    .array(
      z.object({
        keep: z.string().min(8).max(180),
        give: z.string().min(8).max(180),
      }),
    )
    .min(2)
    .max(5),
  killCriteria: z.array(z.string().min(8).max(220)).min(3).max(6),
});

const SYSTEM = `You are the Axial council: six specialist agents who refuse generic strategy.

Agents:
- Atlas (customer & market)
- Forge (revenue & economics)
- Loom (operations & delivery)
- Hearth (people & change)
- Sentinel (risk & second-order effects)
- Horizon (sequencing Now / Next / Later)

Method:
1. Score six dimensions 0-10, current vs projected: customer, revenue, operations, people, risk, optionality.
   Risk is inverted in meaning: higher = safer today. Projected risk may fall if the move concentrates failure.
2. Each agent writes a pointed verdict, 2-4 findings, and 1-2 tensions with another named agent. Agents must disagree somewhere.
3. Rewrite work as outcomes: "Enable [who] to [change] so that [impact]".
4. Sequence moves into now / next / later. Now is committed. Later is cheap to rewrite.
5. Name stakeholders with stance and what they actually need.
6. Trace 2nd and 3rd order ripples. Not obvious first-order effects.
7. Explicit tradeoffs (keep / give) and kill criteria that would end the program.
8. Be specific. Invent plausible proper nouns, numbers, and constraints from the briefing rather than vague corporate language.
9. Do not use emoji. Do not be cheerful. Do not recommend "alignment workshops" as a strategy.

Return ONLY JSON matching the schema. dimensions must include all six ids. agents must include all six agentIds.`;

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fence ? fence[1].trim() : trimmed;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Council returned no JSON");
  return JSON.parse(raw.slice(start, end + 1)) as unknown;
}

function slugId(title: string, index: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  return `${slug || "move"}-${index + 1}`;
}

export const generateRoadmap = createServerFn({ method: "POST" })
  .validator((input: Briefing) => briefingSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true; roadmap: Roadmap } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "The council is offline in this environment." };
    }

    const user = [
      `Initiative: ${data.initiative}`,
      data.context ? `Context: ${data.context}` : "Context: (none given — infer a plausible company)",
      `Planning horizon: ${data.planHorizon}`,
      data.nonNegotiable
        ? `Non-negotiable: ${data.nonNegotiable}`
        : "Non-negotiable: (none named — infer one and treat it as real)",
    ].join("\n");

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          temperature: 0.7,
          max_tokens: 4200,
          messages: [
            { role: "system", content: SYSTEM },
            { role: "user", content: user },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        return { ok: false, error: `Council failed (${res.status}). Try again in a moment.` };
      }

      const body = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = body.choices?.[0]?.message?.content ?? "";
      const parsed = payloadSchema.parse(extractJson(text));

      const dimIds = parsed.dimensions.map((d) => d.id);
      if (new Set(dimIds).size !== 6) {
        return { ok: false, error: "Council missed a dimension. Brief it again." };
      }
      const agentIds = parsed.agents.map((a) => a.agentId);
      if (new Set(agentIds).size !== 6) {
        return { ok: false, error: "Council missed an agent. Brief it again." };
      }

      const roadmap: Roadmap = {
        id: crypto.randomUUID(),
        title: parsed.title,
        thesis: parsed.thesis,
        briefing: data,
        createdAt: new Date().toISOString(),
        source: "council",
        dimensions: parsed.dimensions,
        agents: parsed.agents,
        moves: parsed.moves.map((m, i) => ({
          ...m,
          id: m.id && m.id.length > 1 ? m.id : slugId(m.title, i),
        })),
        stakeholders: parsed.stakeholders,
        secondOrder: parsed.secondOrder,
        tradeoffs: parsed.tradeoffs,
        killCriteria: parsed.killCriteria,
      };

      return { ok: true, roadmap };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Council could not finish.";
      return { ok: false, error: message };
    }
  });
