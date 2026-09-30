import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Copy } from "lucide-react";
import { roadmapToMarkdown } from "@/lib/roadmap/markdown";
import { SAMPLES } from "@/lib/roadmap/samples";
import { useArchive } from "@/lib/roadmap/store";
import { AppShell } from "@/components/app-shell";
import { RoadmapView } from "@/components/roadmap-view";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/r/$id")({
  component: RoadmapPage,
});

function RoadmapPage() {
  const { id } = Route.useParams();
  const persisted = useArchive((s) => s.saved[id]);
  const sample = SAMPLES.find((s) => s.id === id);
  const roadmap = sample ?? persisted;
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(Boolean(sample));

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready && !roadmap) {
    return (
      <AppShell>
        <div className="flex flex-col gap-4 py-10">
          <Skeleton className="h-10 w-2/3 max-w-md" />
          <Skeleton className="h-24 w-full max-w-xl" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!roadmap) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md py-20 text-center">
          <h1 className="font-display text-3xl">No map on this id</h1>
          <p className="mt-3 text-sm text-muted">
            It may have been local to another browser. Brief the council again.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">New briefing</Link>
          </Button>
        </div>
      </AppShell>
    );
  }

  async function copy() {
    const md = roadmapToMarkdown(roadmap);
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <AppShell
      right={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="size-4" />
              Briefing
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      }
    >
      <RoadmapView roadmap={roadmap} />
    </AppShell>
  );
}
