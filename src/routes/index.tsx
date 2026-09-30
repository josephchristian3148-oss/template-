import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AGENT_ORDER, AGENTS, PLAN_HORIZON_META } from "@/lib/roadmap/agents";
import { generateRoadmap } from "@/lib/roadmap/generate";
import { SAMPLE_CARDS } from "@/lib/roadmap/samples";
import { useArchive } from "@/lib/roadmap/store";
import type { Briefing } from "@/lib/roadmap/types";
import { AppShell } from "@/components/app-shell";
import { BriefingForm } from "@/components/briefing-form";
import { CouncilOverlay } from "@/components/council-overlay";
import { LatticeBg } from "@/components/lattice-bg";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const save = useArchive((s) => s.save);
  const order = useArchive((s) => s.order);
  const saved = useArchive((s) => s.saved);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!busy) return;
    setActive(0);
    const t = window.setInterval(() => {
      setActive((n) => (n + 1) % AGENT_ORDER.length);
    }, 720);
    return () => window.clearInterval(t);
  }, [busy]);

  const archive = useMemo(
    () => order.map((id) => saved[id]).filter(Boolean),
    [order, saved],
  );

  const status = AGENTS[AGENT_ORDER[active]].watching;

  async function openSample(id: string) {
    setError(null);
    setBusy(true);
    const started = Date.now();
    await minWait(started, 2100);
    setBusy(false);
    void navigate({ to: "/r/$id", params: { id } });
  }

  async function convene(briefing: Briefing) {
    setError(null);
    setBusy(true);
    const started = Date.now();
    try {
      const result = await generateRoadmap({ data: briefing });
      await minWait(started, 2400);
      if (!result.ok) {
        setError(result.error);
        setBusy(false);
        return;
      }
      save(result.roadmap);
      void navigate({ to: "/r/$id", params: { id: result.roadmap.id } });
    } catch {
      setError("The council could not assemble. Try a tighter briefing.");
      setBusy(false);
    }
  }

  return (
    <AppShell
      right={
        <p className="hidden text-[0.75rem] text-subtle sm:block">
          Six agents · six dimensions
        </p>
      }
    >
      <div className="relative">
        <LatticeBg />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <section className="pt-4 sm:pt-8">
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-subtle">
              Multidimensional impact roadmap
            </p>
            <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.08] tracking-tight text-balance sm:text-6xl">
              See every dimension of the move.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted text-pretty sm:text-lg">
              Brief an initiative. Atlas, Forge, Loom, Hearth, Sentinel, and Horizon
              score customer, revenue, operations, people, risk, and optionality —
              then sequence what is committed, what is a bet, and what is still a story.
            </p>
            <ul className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted">
              <li>Current vs projected radar</li>
              <li>Now / Next / Later board</li>
              <li>Agent tensions, on purpose</li>
              <li>Second-order ripples</li>
            </ul>
          </section>
          <Card className="relative z-10 rounded-xl p-5 sm:p-6">
            <h2 className="font-display text-2xl">Brief the council</h2>
            <p className="mt-1 mb-5 text-sm text-muted">
              Specifics beat slogans. Name the decision and the constraint.
            </p>
            <BriefingForm busy={busy} onSubmit={convene} />
            {error && (
              <p className="mt-3 text-sm text-clay" role="alert">
                {error}
              </p>
            )}
          </Card>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl">Reference briefings</h2>
        <p className="mt-1 text-sm text-muted">
          Open a finished council session. No generation required.
        </p>
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {SAMPLE_CARDS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => openSample(s.id)}
                disabled={busy}
                className="h-full w-full rounded-xl bg-surface p-5 text-left shadow-border transition-[box-shadow,transform] duration-150 ease-out hover:shadow-border-hover active:scale-[0.99] disabled:opacity-50"
              >
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
                  {PLAN_HORIZON_META[s.planHorizon].label}
                </p>
                <p className="mt-2 font-display text-xl leading-snug">{s.title}</p>
                <p className="mt-2 text-sm text-muted text-pretty">{s.thesis}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[0.8125rem] text-primary">
                  Open map
                  <ArrowUpRight className="size-3.5" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {mounted && archive.length > 0 && (
        <section className="mt-14">
          <h2 className="font-display text-3xl">Your archive</h2>
          <ul className="mt-5 flex flex-col gap-2">
            {archive.map((r) => (
              <li key={r.id}>
                <Link
                  to="/r/$id"
                  params={{ id: r.id }}
                  className="flex items-center justify-between gap-4 rounded-lg bg-surface px-4 py-3 shadow-border hover:shadow-border-hover"
                >
                  <span className="text-sm font-medium">{r.title}</span>
                  <span className="text-[0.75rem] text-subtle">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-20 border-t border-border pt-6 text-[0.75rem] text-subtle">
        Axial is a council skill: six agents, six dimensions, three horizons, and the
        effects nobody put on the slide.
      </footer>

      {busy && <CouncilOverlay activeIndex={active} status={status} />}
    </AppShell>
  );
}

function minWait(started: number, ms: number) {
  const wait = ms - (Date.now() - started);
  return wait > 0 ? new Promise((r) => setTimeout(r, wait)) : Promise.resolve();
}
