import { useState } from "react";
import { PLAN_HORIZON_META } from "@/lib/roadmap/agents";
import type { Briefing, PlanHorizon } from "@/lib/roadmap/types";
import { PLAN_HORIZONS } from "@/lib/roadmap/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function BriefingForm({
  busy,
  onSubmit,
}: {
  busy: boolean;
  onSubmit: (briefing: Briefing) => void;
}) {
  const [initiative, setInitiative] = useState("");
  const [context, setContext] = useState("");
  const [nonNegotiable, setNonNegotiable] = useState("");
  const [planHorizon, setPlanHorizon] = useState<PlanHorizon>("12m");

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        if (initiative.trim().length < 8 || busy) return;
        onSubmit({
          initiative: initiative.trim(),
          context: context.trim(),
          nonNegotiable: nonNegotiable.trim(),
          planHorizon,
        });
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="initiative">The move</Label>
        <Textarea
          id="initiative"
          required
          minLength={8}
          value={initiative}
          onChange={(e) => setInitiative(e.target.value)}
          placeholder="What are you actually trying to do? Name the decision, not the slogan."
          className="min-h-28"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="context">Context</Label>
        <Textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Company, customers, constraints, the last time this failed."
          className="min-h-24"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="hold">What you will not sacrifice</Label>
        <Textarea
          id="hold"
          value={nonNegotiable}
          onChange={(e) => setNonNegotiable(e.target.value)}
          placeholder="A number, a promise, a relationship, a legal line."
          className="min-h-20"
        />
      </div>
      <fieldset>
        <legend className="mb-2 text-[0.8125rem] font-medium tracking-wide text-muted">
          Horizon
        </legend>
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-surface p-1 shadow-border">
          {PLAN_HORIZONS.map((h) => {
            const meta = PLAN_HORIZON_META[h];
            const on = planHorizon === h;
            return (
              <button
                key={h}
                type="button"
                onClick={() => setPlanHorizon(h)}
                className={cn(
                  "h-11 rounded-md text-[0.8125rem] font-medium transition-[background-color,color] duration-150",
                  on ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {meta.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <Button type="submit" size="lg" disabled={busy || initiative.trim().length < 8}>
        {busy ? "Convening…" : "Convene the council"}
      </Button>
    </form>
  );
}
