import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as DIMENSION_IDS, r as HORIZONS } from "./types-CEZnEvng.mjs";
import { a as Flame, c as Compass, d as ArrowLeft, i as Shield, l as Check, n as Users, o as Earth, s as Copy, t as Workflow } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Route, r as cn } from "./router-CADFR88Q.mjs";
import { a as Card, d as STANCE_META, f as useArchive, i as Button, l as SAMPLES, n as AGENT_ORDER, o as DIMENSIONS, r as AppShell, s as HORIZON_META, t as AGENTS } from "./card-BVPfxBeb.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/r._id-_K7IONe5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function roadmapToMarkdown(r) {
	const dimLines = r.dimensions.map((d) => {
		const meta = DIMENSIONS[d.id];
		const delta = d.projected - d.current;
		const sign = delta > 0 ? "+" : "";
		return `- **${meta.label}** ${d.current.toFixed(1)} → ${d.projected.toFixed(1)} (${sign}${delta.toFixed(1)}): ${d.summary}`;
	}).join("\n");
	const agentLines = r.agents.map((a) => {
		const meta = AGENTS[a.agentId];
		const findings = a.findings.map((f) => `  - ${f}`).join("\n");
		const tensions = a.tensions.map((t) => `  - ${t}`).join("\n");
		return `### ${meta.name} — ${meta.role}\n\n${a.verdict}\n\nFindings:\n${findings}\n\nTensions:\n${tensions}\n`;
	}).join("\n");
	const moveLines = [
		"now",
		"next",
		"later"
	].map((h) => {
		const items = r.moves.filter((m) => m.horizon === h);
		if (!items.length) return "";
		const body = items.map((m) => `- **${m.title}** (${m.effort}, impact ${m.impact})\n  - Outcome: ${m.outcome}\n  - Metric: ${m.metric}`).join("\n");
		return `### ${HORIZON_META[h].label}\n\n${body}\n`;
	}).join("\n");
	const people = r.stakeholders.map((s) => `- **${s.name}** (${STANCE_META[s.stance].label}, influence ${s.influence}): ${s.need}`).join("\n");
	const ripples = r.secondOrder.map((s) => `- ${s.order === 2 ? "Second" : "Third"}-order ${s.valence}: **${s.trigger}** → ${s.consequence}`).join("\n");
	const trades = r.tradeoffs.map((t) => `- Keep **${t.keep}**. Give **${t.give}**.`).join("\n");
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
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-wide tabular-nums", {
	variants: { variant: {
		default: "bg-surface-2 text-muted shadow-border",
		solid: "bg-primary text-primary-fg",
		pos: "bg-sage/15 text-sage",
		mid: "bg-sand/15 text-sand",
		neg: "bg-clay/15 text-clay"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root.displayName;
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-surface p-1 shadow-border", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-[0.8125rem] font-medium text-muted", "transition-[color,background-color] duration-150 ease-out", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", "data-[state=active]:bg-surface-2 data-[state=active]:text-foreground", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-5 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function point(cx, cy, r, i, n, value) {
	const angle = -Math.PI / 2 + i * 2 * Math.PI / n;
	return {
		x: cx + r * (value / 10) * Math.cos(angle),
		y: cy + r * (value / 10) * Math.sin(angle)
	};
}
function toPath(pts) {
	return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";
}
function RadarChart({ dimensions, className }) {
	const ordered = DIMENSION_IDS.map((id) => dimensions.find((d) => d.id === id)).filter((d) => Boolean(d));
	const n = ordered.length || 6;
	const size = 420;
	const cx = size / 2;
	const cy = size / 2;
	const r = 132;
	const rings = [
		2,
		4,
		6,
		8,
		10
	];
	const current = ordered.map((d, i) => point(cx, cy, r, i, n, d.current));
	const projected = ordered.map((d, i) => point(cx, cy, r, i, n, d.projected));
	const axes = ordered.map((_, i) => point(cx, cy, r, i, n, 10));
	const labels = ordered.map((d, i) => {
		return {
			...point(cx, cy, 166, i, n, 10),
			label: DIMENSIONS[d.id].short,
			id: d.id
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${size} ${size}`,
		className,
		role: "img",
		"aria-label": "Impact radar: current versus projected across six dimensions",
		children: [
			rings.map((v) => {
				const pts = Array.from({ length: n }, (_, i) => point(cx, cy, r, i, n, v));
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: toPath(pts),
					fill: "none",
					stroke: "currentColor",
					className: "text-foreground/10",
					strokeWidth: 1
				}, v);
			}),
			axes.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: cx,
				y1: cy,
				x2: p.x,
				y2: p.y,
				stroke: "currentColor",
				className: "text-foreground/12",
				strokeWidth: 1
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: toPath(current),
				fill: "none",
				stroke: "currentColor",
				className: "text-muted",
				strokeWidth: 1.5,
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: toPath(projected),
				fill: "currentColor",
				fillOpacity: .18,
				stroke: "currentColor",
				className: "text-primary",
				strokeWidth: 1.75
			}),
			projected.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: p.x,
				cy: p.y,
				r: 3.2,
				className: "fill-primary"
			}, i)),
			labels.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: l.x,
				y: l.y,
				textAnchor: "middle",
				dominantBaseline: "middle",
				className: "fill-muted",
				fontSize: "13",
				fontFamily: "var(--font-sans)",
				children: l.label
			}, l.id))
		]
	});
}
var ICONS = {
	atlas: Earth,
	forge: Flame,
	loom: Workflow,
	hearth: Users,
	sentinel: Shield,
	horizon: Compass
};
function delta(current, projected) {
	const d = projected - current;
	return {
		d,
		label: `${d > 0 ? "+" : ""}${d.toFixed(1)}`,
		up: d > .05,
		down: d < -.05
	};
}
function RoadmapView({ roadmap }) {
	const avgNow = roadmap.dimensions.reduce((a, d) => a + d.current, 0) / roadmap.dimensions.length;
	const avgNext = roadmap.dimensions.reduce((a, d) => a + d.projected, 0) / roadmap.dimensions.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-subtle",
					children: roadmap.source === "sample" ? "Reference briefing" : "Council briefing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl",
					children: roadmap.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-base text-muted text-pretty",
					children: roadmap.thesis
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Current mean",
							value: avgNow.toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Projected mean",
							value: avgNext.toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Net shift",
							value: `${avgNext - avgNow >= 0 ? "+" : ""}${(avgNext - avgNow).toFixed(1)}`
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarChart, {
					dimensions: roadmap.dimensions,
					className: "w-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex justify-center gap-4 text-[0.6875rem] text-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-5 border-t border-dashed border-muted" }), "Current"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-5 bg-primary/80" }), "Projected"]
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "overview",
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full justify-start overflow-x-auto sm:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "overview",
							children: "Overview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "council",
							children: "Council"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "roadmap",
							children: "Roadmap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "ripples",
							children: "Ripples"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "overview",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, { roadmap })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "council",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouncilTab, { roadmap })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "roadmap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MovesTab, { roadmap })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "ripples",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RipplesTab, { roadmap })
				})
			]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[0.6875rem] uppercase tracking-[0.16em] text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 font-mono text-2xl tabular-nums tracking-tight",
		children: value
	})] });
}
function OverviewTab({ roadmap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: roadmap.dimensions.map((d) => {
			const meta = DIMENSIONS[d.id];
			const { label, up, down } = delta(d.current, d.projected);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: meta.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[0.75rem] text-subtle",
							children: meta.question
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: up ? "pos" : down ? "neg" : "mid",
							children: label
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-baseline gap-2 font-mono tabular-nums",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: d.current.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "→"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg",
								children: d.projected.toFixed(1)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						current: d.current,
						projected: d.projected
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted text-pretty",
						children: d.summary
					})
				]
			}, d.id);
		})
	});
}
function ScoreBar({ current, projected }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mt-3 h-1.5 rounded-full bg-surface-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-muted",
			style: { left: `calc(${current * 10}% - 4px)` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary",
			style: { left: `calc(${projected * 10}% - 4px)` }
		})]
	});
}
function CouncilTab({ roadmap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 lg:grid-cols-2",
		children: AGENT_ORDER.map((id) => {
			const report = roadmap.agents.find((a) => a.agentId === id);
			if (!report) return null;
			const agent = AGENTS[id];
			const Icon = ICONS[id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 items-center justify-center rounded-md bg-surface-2 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									strokeWidth: 1.75
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: agent.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.6875rem] text-subtle",
								children: agent.role
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[0.75rem] tabular-nums text-muted",
							children: [Math.round(report.confidence * 100), "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg leading-snug text-pretty",
						children: report.verdict
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2 text-sm text-muted",
						children: report.findings.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "pl-3 shadow-[inset_2px_0_0_0] shadow-border-strong",
							children: f
						}, f))
					}),
					report.tensions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-surface-2 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.6875rem] uppercase tracking-[0.16em] text-subtle",
							children: "Tension"
						}), report.tensions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[0.8125rem] text-muted",
							children: t
						}, t))]
					})
				]
			}, id);
		})
	});
}
function MovesTab({ roadmap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 lg:grid-cols-3",
		children: HORIZONS.map((h) => {
			const items = roadmap.moves.filter((m) => m.horizon === h);
			const meta = HORIZON_META[h];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: meta.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[0.75rem] text-subtle",
					children: meta.commitment
				})] }), items.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col gap-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium leading-snug",
								children: m.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: m.effort })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.8125rem] text-muted text-pretty",
							children: m.outcome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: m.dimensions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: DIMENSIONS[d].short }, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[0.6875rem] leading-relaxed text-subtle",
							children: m.metric
						})
					]
				}, m.id))]
			}, h);
		})
	});
}
function RipplesTab({ roadmap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl",
			children: "Stakeholders"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 flex flex-col gap-2",
			children: roadmap.stakeholders.map((s) => {
				const stance = STANCE_META[s.stance];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: s.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[0.8125rem] text-muted",
						children: s.need
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: stance.tone,
							children: stance.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[0.75rem] tabular-nums text-subtle",
							children: [s.influence, "/10"]
						})]
					})]
				}) }, s.name);
			})
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Second-order"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-2",
					children: roadmap.secondOrder.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: s.valence === "risk" ? "neg" : "pos",
									children: [
										s.order === 2 ? "2nd" : "3rd",
										" · ",
										s.valence
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-medium",
								children: s.trigger
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[0.8125rem] text-muted",
								children: s.consequence
							})
						]
					}) }, s.trigger))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Tradeoffs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-2",
					children: roadmap.tradeoffs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "Keep"
							}),
							" ",
							t.keep
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: "Give"
								}),
								" ",
								t.give
							]
						})]
					}) }, t.keep))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Kill criteria"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-col gap-2",
					children: roadmap.killCriteria.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-lg bg-surface px-4 py-3 text-sm text-muted shadow-border",
						children: k
					}, k))
				})] })
			]
		})]
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-surface-2", className),
		...props
	});
}
function RoadmapPage() {
	const { id } = Route.useParams();
	const persisted = useArchive((s) => s.saved[id]);
	const sample = SAMPLES.find((s) => s.id === id);
	const roadmap = sample ?? persisted;
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(Boolean(sample));
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	if (!ready && !roadmap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-2/3 max-w-md" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 w-full max-w-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full" })
		]
	}) });
	if (!roadmap) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "No map on this id"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "It may have been local to another browser. Brief the council again."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "New briefing"
				})
			})
		]
	}) });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Briefing"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: copy,
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadmapView, { roadmap })
	});
}
//#endregion
export { RoadmapPage as component };
