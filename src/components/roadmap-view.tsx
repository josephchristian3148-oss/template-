import { AGENTS, AGENT_ORDER, DIMENSIONS, HORIZON_META, STANCE_META } from "@/lib/roadmap/agents";
import type { Roadmap } from "@/lib/roadmap/types";
import { HORIZONS } from "@/lib/roadmap/types";
import { Compass, Flame, Globe2, Shield, Users, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarChart } from "@/components/radar-chart";

const ICONS = {
  atlas: Globe2,
  forge: Flame,
  loom: Workflow,
  hearth: Users,
  sentinel: Shield,
  horizon: Compass,
} as const;

function delta(current: number, projected: number) {
  const d = projected - current;
  const sign = d > 0 ? "+" : "";
  return { d, label: `${sign}${d.toFixed(1)}`, up: d > 0.05, down: d < -0.05 };
}

export function RoadmapView({ roadmap }: { roadmap: Roadmap }) {
  const avgNow =
    roadmap.dimensions.reduce((a, d) => a + d.current, 0) / roadmap.dimensions.length;
  const avgNext =
    roadmap.dimensions.reduce((a, d) => a + d.projected, 0) / roadmap.dimensions.length;

  return (
    <div className="flex flex-col gap-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-subtle">
            {roadmap.source === "sample" ? "Reference briefing" : "Council briefing"}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
            {roadmap.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted text-pretty">{roadmap.thesis}</p>
          <div className="mt-6 flex flex-wrap gap-6">
            <Stat label="Current mean" value={avgNow.toFixed(1)} />
            <Stat label="Projected mean" value={avgNext.toFixed(1)} />
            <Stat
              label="Net shift"
              value={`${avgNext - avgNow >= 0 ? "+" : ""}${(avgNext - avgNow).toFixed(1)}`}
            />
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <RadarChart dimensions={roadmap.dimensions} className="w-full" />
          <div className="mt-1 flex justify-center gap-4 text-[0.6875rem] text-subtle">
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-5 border-t border-dashed border-muted" />
              Current
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-px w-5 bg-primary/80" />
              Projected
            </span>
          </div>
        </div>
      </section>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="council">Council</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="ripples">Ripples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab roadmap={roadmap} />
        </TabsContent>
        <TabsContent value="council">
          <CouncilTab roadmap={roadmap} />
        </TabsContent>
        <TabsContent value="roadmap">
          <MovesTab roadmap={roadmap} />
        </TabsContent>
        <TabsContent value="ripples">
          <RipplesTab roadmap={roadmap} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">{label}</p>
      <p className="mt-1 font-mono text-2xl tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function OverviewTab({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {roadmap.dimensions.map((d) => {
        const meta = DIMENSIONS[d.id];
        const { label, up, down } = delta(d.current, d.projected);
        return (
          <Card key={d.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{meta.label}</p>
                <p className="mt-1 text-[0.75rem] text-subtle">{meta.question}</p>
              </div>
              <Badge variant={up ? "pos" : down ? "neg" : "mid"}>{label}</Badge>
            </div>
            <div className="mt-4 flex items-baseline gap-2 font-mono tabular-nums">
              <span className="text-muted">{d.current.toFixed(1)}</span>
              <span className="text-subtle">→</span>
              <span className="text-lg">{d.projected.toFixed(1)}</span>
            </div>
            <ScoreBar current={d.current} projected={d.projected} />
            <p className="mt-3 text-sm text-muted text-pretty">{d.summary}</p>
          </Card>
        );
      })}
    </div>
  );
}

function ScoreBar({ current, projected }: { current: number; projected: number }) {
  return (
    <div className="relative mt-3 h-1.5 rounded-full bg-surface-2">
      <div
        className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-muted"
        style={{ left: `calc(${current * 10}% - 4px)` }}
      />
      <div
        className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary"
        style={{ left: `calc(${projected * 10}% - 4px)` }}
      />
    </div>
  );
}

function CouncilTab({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {AGENT_ORDER.map((id) => {
        const report = roadmap.agents.find((a) => a.agentId === id);
        if (!report) return null;
        const agent = AGENTS[id];
        const Icon = ICONS[id];
        return (
          <Card key={id} className="flex flex-col gap-3 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-md bg-surface-2 text-primary">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium">{agent.name}</p>
                  <p className="text-[0.6875rem] text-subtle">{agent.role}</p>
                </div>
              </div>
              <span className="font-mono text-[0.75rem] tabular-nums text-muted">
                {Math.round(report.confidence * 100)}%
              </span>
            </div>
            <p className="font-display text-lg leading-snug text-pretty">{report.verdict}</p>
            <Separator />
            <ul className="flex flex-col gap-2 text-sm text-muted">
              {report.findings.map((f) => (
                <li key={f} className="pl-3 shadow-[inset_2px_0_0_0] shadow-border-strong">
                  {f}
                </li>
              ))}
            </ul>
            {report.tensions.length > 0 && (
              <div className="rounded-md bg-surface-2 px-3 py-2">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
                  Tension
                </p>
                {report.tensions.map((t) => (
                  <p key={t} className="mt-1 text-[0.8125rem] text-muted">
                    {t}
                  </p>
                ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function MovesTab({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {HORIZONS.map((h) => {
        const items = roadmap.moves.filter((m) => m.horizon === h);
        const meta = HORIZON_META[h];
        return (
          <section key={h} className="flex flex-col gap-3">
            <div>
              <h2 className="font-display text-2xl">{meta.label}</h2>
              <p className="mt-1 text-[0.75rem] text-subtle">{meta.commitment}</p>
            </div>
            {items.map((m) => (
              <Card key={m.id} className="flex flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium leading-snug">{m.title}</h3>
                  <Badge>{m.effort}</Badge>
                </div>
                <p className="text-[0.8125rem] text-muted text-pretty">{m.outcome}</p>
                <div className="flex flex-wrap gap-1">
                  {m.dimensions.map((d) => (
                    <Badge key={d}>{DIMENSIONS[d].short}</Badge>
                  ))}
                </div>
                <p className="font-mono text-[0.6875rem] leading-relaxed text-subtle">
                  {m.metric}
                </p>
              </Card>
            ))}
          </section>
        );
      })}
    </div>
  );
}

function RipplesTab({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section>
        <h2 className="font-display text-2xl">Stakeholders</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {roadmap.stakeholders.map((s) => {
            const stance = STANCE_META[s.stance];
            return (
              <li key={s.name}>
                <Card className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="mt-1 text-[0.8125rem] text-muted">{s.need}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={stance.tone}>{stance.label}</Badge>
                    <span className="font-mono text-[0.75rem] tabular-nums text-subtle">
                      {s.influence}/10
                    </span>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="flex flex-col gap-6">
        <div>
          <h2 className="font-display text-2xl">Second-order</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {roadmap.secondOrder.map((s) => (
              <li key={s.trigger}>
                <Card className="p-4">
                  <div className="flex items-center gap-2">
                    <Badge variant={s.valence === "risk" ? "neg" : "pos"}>
                      {s.order === 2 ? "2nd" : "3rd"} · {s.valence}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm font-medium">{s.trigger}</p>
                  <p className="mt-1 text-[0.8125rem] text-muted">{s.consequence}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Tradeoffs</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {roadmap.tradeoffs.map((t) => (
              <li key={t.keep}>
                <Card className="p-4 text-sm">
                  <p>
                    <span className="text-subtle">Keep</span> {t.keep}
                  </p>
                  <p className="mt-1">
                    <span className="text-subtle">Give</span> {t.give}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Kill criteria</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {roadmap.killCriteria.map((k) => (
              <li key={k} className="rounded-lg bg-surface px-4 py-3 text-sm text-muted shadow-border">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
