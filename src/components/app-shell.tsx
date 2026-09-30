import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  right,
  bleed = false,
}: {
  children: ReactNode;
  right?: ReactNode;
  bleed?: boolean;
}) {
  return (
    <div className="relative min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <HexMark />
            <span className="font-display text-lg tracking-tight">Axial</span>
          </Link>
          {right}
        </div>
      </header>
      <div className={cn(bleed ? "" : "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10")}>
        {children}
      </div>
    </div>
  );
}

export function HexMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5 text-primary", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2.4 20.2 7v10L12 21.6 3.8 17V7L12 2.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <path
        d="M12 5.2v13.6M6.2 8.6l11.6 6.8M17.8 8.6 6.2 15.4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}
