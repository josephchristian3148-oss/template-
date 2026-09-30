import { AGENTS, DIMENSIONS, HORIZON_META, STANCE_META } from "./agents";
import type { Roadmap } from "./types";

export function roadmapToMarkdown(r: Roadmap): string {
  const dimLines = r.dimensions
    .map((d) => {
      const meta = DIMENSIONS[d.id];
      const delta = d.projected - d.current;
      const sign = delta > 0 ? "+" : "";
      return `- **${meta.label}** ${d.current.toFixed(1)} → ${d.projected.toFixed(1)} (${sign}${delta.toFixed(1)}): ${d.summary}`;
    })
    .join("\n");

  const agentLines = r.agents
    .map((a) => {
      const meta = AGENTS[a.agentId];
      const findings = a.findings.map((f) => `  - ${f}`).join("\n");
      const tensions = a.tensions.map((t) => `  - ${t}`).join("\n");
      return `### ${meta.name} — ${meta.role}\n\n${a.verdict}\n\nFindings:\n${findings}\n\nTensions:\n${tensions}\n`;
    })
    .join("\n");

  const moveLines = (["now", "next", "later"] as const)
    .map((h) => {
      const items = r.moves.filter((m) => m.horizon === h);
      if (!items.length) return "";
      const body = items
        .map(
          (m) =>
            `- **${m.title}** (${m.effort}, impact ${m.impact})\n  - Outcome: ${m.outcome}\n  - Metric: ${m.metric}`,
        )
        .join("\n");
      return `### ${HORIZON_META[h].label}\n\n${body}\n`;
    })
    .join("\n");

  const people = r.stakeholders
    .map(
      (s) =>
        `- **${s.name}** (${STANCE_META[s.stance].label}, influence ${s.influence}): ${s.need}`,
    )
    .join("\n");

  const ripples = r.secondOrder
    .map(
      (s) =>
        `- ${s.order === 2 ? "Second" : "Third"}-order ${s.valence}: **${s.trigger}** → ${s.consequence}`,
    )
    .join("\n");

  const trades = r.tradeoffs
    .map((t) => `- Keep **${t.keep}**. Give **${t.give}**.`)
    .join("\n");

  const kills = r.killCriteria.map((k) => `- ${k}`).join("\n");

  return `# ${r.title}

${r.thesis}

## Dimensions

${dimLines}

## Council

${agentLines}

## Roadmap

${moveLines}

## Stakeholders

${people}

## Ripples

${ripples}

## Tradeoffs

${trades}

## Kill criteria

${kills}
`;
}
