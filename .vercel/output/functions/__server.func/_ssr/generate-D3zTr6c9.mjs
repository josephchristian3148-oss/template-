import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as DIMENSION_IDS, r as HORIZONS, t as AGENT_IDS } from "./types-CEZnEvng.mjs";
import { a as object, i as number, n as array, o as string, r as literal, s as union, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/generate-D3zTr6c9.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var briefingSchema = object({
	initiative: string().min(8).max(1200),
	context: string().max(2e3),
	planHorizon: _enum([
		"90d",
		"12m",
		"3y"
	]),
	nonNegotiable: string().max(600)
});
var dimensionSchema = object({
	id: _enum(DIMENSION_IDS),
	current: number().min(0).max(10),
	projected: number().min(0).max(10),
	summary: string().min(8).max(400)
});
var agentSchema = object({
	agentId: _enum(AGENT_IDS),
	verdict: string().min(12).max(600),
	findings: array(string().min(8).max(280)).min(2).max(4),
	tensions: array(string().min(8).max(280)).min(1).max(3),
	confidence: number().min(0).max(1)
});
var moveSchema = object({
	id: string().min(1).max(40).optional(),
	title: string().min(8).max(140),
	outcome: string().min(12).max(320),
	horizon: _enum(HORIZONS),
	dimensions: array(_enum(DIMENSION_IDS)).min(1).max(4),
	effort: _enum([
		"S",
		"M",
		"L"
	]),
	impact: number().min(1).max(10),
	dependencies: array(string().max(120)).max(4),
	metric: string().min(8).max(220)
});
var payloadSchema = object({
	title: string().min(4).max(80),
	thesis: string().min(20).max(400),
	dimensions: array(dimensionSchema).length(6),
	agents: array(agentSchema).length(6),
	moves: array(moveSchema).min(4).max(8),
	stakeholders: array(object({
		name: string().min(2).max(60),
		stance: _enum([
			"champion",
			"support",
			"neutral",
			"resist",
			"block"
		]),
		influence: number().min(1).max(10),
		need: string().min(8).max(220)
	})).min(4).max(8),
	secondOrder: array(object({
		trigger: string().min(8).max(180),
		consequence: string().min(12).max(280),
		order: union([literal(2), literal(3)]),
		valence: _enum(["risk", "opportunity"])
	})).min(3).max(6),
	tradeoffs: array(object({
		keep: string().min(8).max(180),
		give: string().min(8).max(180)
	})).min(2).max(5),
	killCriteria: array(string().min(8).max(220)).min(3).max(6)
});
var SYSTEM = `You are the Axial council: six specialist agents who refuse generic strategy.

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
function extractJson(text) {
	const trimmed = text.trim();
	const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
	const raw = fence ? fence[1].trim() : trimmed;
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) throw new Error("Council returned no JSON");
	return JSON.parse(raw.slice(start, end + 1));
}
function slugId(title, index) {
	return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "move"}-${index + 1}`;
}
var generateRoadmap_createServerFn_handler = createServerRpc({
	id: "ec76cd140158eff312066f945baec55cb5c0269f48cc0ee17eacfd9d0dff9b72",
	name: "generateRoadmap",
	filename: "src/lib/roadmap/generate.ts"
}, (opts) => generateRoadmap.__executeServer(opts));
var generateRoadmap = createServerFn({ method: "POST" }).validator((input) => briefingSchema.parse(input)).handler(generateRoadmap_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "The council is offline in this environment."
	};
	const user = [
		`Initiative: ${data.initiative}`,
		data.context ? `Context: ${data.context}` : "Context: (none given — infer a plausible company)",
		`Planning horizon: ${data.planHorizon}`,
		data.nonNegotiable ? `Non-negotiable: ${data.nonNegotiable}` : "Non-negotiable: (none named — infer one and treat it as real)"
	].join("\n");
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .7,
				max_tokens: 4200,
				messages: [{
					role: "system",
					content: SYSTEM
				}, {
					role: "user",
					content: user
				}],
				response_format: { type: "json_object" }
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `Council failed (${res.status}). Try again in a moment.`
		};
		const text = (await res.json()).choices?.[0]?.message?.content ?? "";
		const parsed = payloadSchema.parse(extractJson(text));
		const dimIds = parsed.dimensions.map((d) => d.id);
		if (new Set(dimIds).size !== 6) return {
			ok: false,
			error: "Council missed a dimension. Brief it again."
		};
		const agentIds = parsed.agents.map((a) => a.agentId);
		if (new Set(agentIds).size !== 6) return {
			ok: false,
			error: "Council missed an agent. Brief it again."
		};
		return {
			ok: true,
			roadmap: {
				id: crypto.randomUUID(),
				title: parsed.title,
				thesis: parsed.thesis,
				briefing: data,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				source: "council",
				dimensions: parsed.dimensions,
				agents: parsed.agents,
				moves: parsed.moves.map((m, i) => ({
					...m,
					id: m.id && m.id.length > 1 ? m.id : slugId(m.title, i)
				})),
				stakeholders: parsed.stakeholders,
				secondOrder: parsed.secondOrder,
				tradeoffs: parsed.tradeoffs,
				killCriteria: parsed.killCriteria
			}
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Council could not finish."
		};
	}
});
//#endregion
export { generateRoadmap_createServerFn_handler };
