import { DIMENSIONS } from "@/lib/roadmap/agents";
import type { DimensionScore } from "@/lib/roadmap/types";
import { DIMENSION_IDS } from "@/lib/roadmap/types";

function point(cx: number, cy: number, r: number, i: number, n: number, value: number) {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return {
    x: cx + r * (value / 10) * Math.cos(angle),
    y: cy + r * (value / 10) * Math.sin(angle),
  };
}

function toPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
}

export function RadarChart({
  dimensions,
  className,
}: {
  dimensions: DimensionScore[];
  className?: string;
}) {
  const ordered = DIMENSION_IDS.map((id) => dimensions.find((d) => d.id === id)).filter(
    (d): d is DimensionScore => Boolean(d),
  );
  const n = ordered.length || 6;
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const r = 132;

  const rings = [2, 4, 6, 8, 10];
  const current = ordered.map((d, i) => point(cx, cy, r, i, n, d.current));
  const projected = ordered.map((d, i) => point(cx, cy, r, i, n, d.projected));
  const axes = ordered.map((_, i) => point(cx, cy, r, i, n, 10));
  const labels = ordered.map((d, i) => {
    const p = point(cx, cy, r + 34, i, n, 10);
    return { ...p, label: DIMENSIONS[d.id].short, id: d.id };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Impact radar: current versus projected across six dimensions"
    >
      {rings.map((v) => {
        const pts = Array.from({ length: n }, (_, i) => point(cx, cy, r, i, n, v));
        return (
          <path
            key={v}
            d={toPath(pts)}
            fill="none"
            stroke="currentColor"
            className="text-foreground/10"
            strokeWidth={1}
          />
        );
      })}
      {axes.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="currentColor"
          className="text-foreground/12"
          strokeWidth={1}
        />
      ))}
      <path
        d={toPath(current)}
        fill="none"
        stroke="currentColor"
        className="text-muted"
        strokeWidth={1.5}
        strokeDasharray="4 4"
      />
      <path
        d={toPath(projected)}
        fill="currentColor"
        fillOpacity={0.18}
        stroke="currentColor"
        className="text-primary"
        strokeWidth={1.75}
      />
      {projected.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.2} className="fill-primary" />
      ))}
      {labels.map((l) => (
        <text
          key={l.id}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted"
          fontSize="13"
          fontFamily="var(--font-sans)"
        >
          {l.label}
        </text>
      ))}
    </svg>
  );
}
