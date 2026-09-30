import { AGENTS, AGENT_ORDER } from "@/lib/roadmap/agents";
import { cn } from "@/lib/utils";
import { Compass, Flame, Globe2, Shield, Users, Workflow } from "lucide-react";

const ICONS = {
  atlas: Globe2,
  forge: Flame,
  loom: Workflow,
  hearth: Users,
  sentinel: Shield,
  horizon: Compass,
} as const;

export function CouncilOverlay({
  activeIndex,
  status,
}: {
  activeIndex: number;
  status: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/92 px-4">
      <div className="w-full max-w-2xl">
        <p className="text-center text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-subtle">
          Council in session
        </p>
        <h2 className="mt-3 text-center font-display text-3xl font-medium tracking-tight text-balance">
          Six lenses. One map.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-sm text-muted text-pretty">
          {status}
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AGENT_ORDER.map((id, i) => {
            const agent = AGENTS[id];
            const Icon = ICONS[id];
            const on = i <= activeIndex;
            const current = i === activeIndex;
            return (
              <li
                key={id}
                className={cn(
                  "rounded-lg bg-surface p-3 shadow-border transition-[opacity,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  on ? "opacity-100" : "opacity-40",
                  current && "shadow-border-hover",
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-sm bg-surface-2 text-primary">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-[0.6875rem] text-subtle">{agent.role}</p>
                  </div>
                </div>
                <p className="mt-2 text-[0.75rem] leading-snug text-muted">
                  {current ? agent.watching : agent.lens}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
