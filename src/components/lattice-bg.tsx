export function LatticeBg() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 7%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--color-foreground) 7%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 20%, black 20%, transparent 75%)",
        }}
      />
      <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_8%,transparent),transparent_68%)]" />
    </div>
  );
}
