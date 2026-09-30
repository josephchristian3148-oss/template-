import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as PLAN_HORIZONS } from "./types-CEZnEvng.mjs";
import { a as object, o as string, t as _enum } from "../_libs/zod.mjs";
import { a as Flame, c as Compass, i as Shield, n as Users, o as Earth, t as Workflow, u as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { r as cn } from "./router-CADFR88Q.mjs";
import { a as Card, c as PLAN_HORIZON_META, f as useArchive, i as Button, n as AGENT_ORDER, r as AppShell, t as AGENTS, u as SAMPLE_CARDS } from "./card-BVPfxBeb.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CItpO7wq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var briefingSchema = object({
	initiative: string().min(8).max(1200),
	context: string().max(2e3),
	planHorizon: _enum([
		"90d",
		"12m",
		"3y"
	]),
	nonNegotiable: string().max(600)
});
var generateRoadmap = createServerFn({ method: "POST" }).validator((input) => briefingSchema.parse(input)).handler(createSsrRpc("ec76cd140158eff312066f945baec55cb5c0269f48cc0ee17eacfd9d0dff9b72"));
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-[0.8125rem] font-medium tracking-wide text-muted", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-28 w-full rounded-lg bg-surface-2 px-3 py-3 text-sm text-foreground shadow-border", "placeholder:text-subtle", "transition-[box-shadow] duration-150 ease-out", "focus-visible:outline-none focus-visible:shadow-border-hover focus-visible:ring-2 focus-visible:ring-ring/40", "disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function BriefingForm({ busy, onSubmit }) {
	const [initiative, setInitiative] = (0, import_react.useState)("");
	const [context, setContext] = (0, import_react.useState)("");
	const [nonNegotiable, setNonNegotiable] = (0, import_react.useState)("");
	const [planHorizon, setPlanHorizon] = (0, import_react.useState)("12m");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "flex flex-col gap-5",
		onSubmit: (e) => {
			e.preventDefault();
			if (initiative.trim().length < 8 || busy) return;
			onSubmit({
				initiative: initiative.trim(),
				context: context.trim(),
				nonNegotiable: nonNegotiable.trim(),
				planHorizon
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "initiative",
					children: "The move"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "initiative",
					required: true,
					minLength: 8,
					value: initiative,
					onChange: (e) => setInitiative(e.target.value),
					placeholder: "What are you actually trying to do? Name the decision, not the slogan.",
					className: "min-h-28"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "context",
					children: "Context"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "context",
					value: context,
					onChange: (e) => setContext(e.target.value),
					placeholder: "Company, customers, constraints, the last time this failed.",
					className: "min-h-24"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "hold",
					children: "What you will not sacrifice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "hold",
					value: nonNegotiable,
					onChange: (e) => setNonNegotiable(e.target.value),
					placeholder: "A number, a promise, a relationship, a legal line.",
					className: "min-h-20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "mb-2 text-[0.8125rem] font-medium tracking-wide text-muted",
				children: "Horizon"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-1 rounded-lg bg-surface p-1 shadow-border",
				children: PLAN_HORIZONS.map((h) => {
					const meta = PLAN_HORIZON_META[h];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setPlanHorizon(h),
						className: cn("h-11 rounded-md text-[0.8125rem] font-medium transition-[background-color,color] duration-150", planHorizon === h ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground"),
						children: meta.label
					}, h);
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				disabled: busy || initiative.trim().length < 8,
				children: busy ? "Convening…" : "Convene the council"
			})
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
function CouncilOverlay({ activeIndex, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-background/92 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-subtle",
					children: "Council in session"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-center font-display text-3xl font-medium tracking-tight text-balance",
					children: "Six lenses. One map."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md text-center text-sm text-muted text-pretty",
					children: status
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3",
					children: AGENT_ORDER.map((id, i) => {
						const agent = AGENTS[id];
						const Icon = ICONS[id];
						const on = i <= activeIndex;
						const current = i === activeIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("rounded-lg bg-surface p-3 shadow-border transition-[opacity,box-shadow] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]", on ? "opacity-100" : "opacity-40", current && "shadow-border-hover"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 items-center justify-center rounded-sm bg-surface-2 text-primary",
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[0.75rem] leading-snug text-muted",
								children: current ? agent.watching : agent.lens
							})]
						}, id);
					})
				})
			]
		})
	});
}
function LatticeBg() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-[0.35]",
			style: {
				backgroundImage: `
            linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 7%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in oklab, var(--color-foreground) 7%, transparent) 1px, transparent 1px)
          `,
				backgroundSize: "56px 56px",
				maskImage: "radial-gradient(ellipse 80% 70% at 50% 20%, black 20%, transparent 75%)"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-primary)_8%,transparent),transparent_68%)]" })]
	});
}
function Home() {
	const navigate = useNavigate();
	const save = useArchive((s) => s.save);
	const order = useArchive((s) => s.order);
	const saved = useArchive((s) => s.saved);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!busy) return;
		setActive(0);
		const t = window.setInterval(() => {
			setActive((n) => (n + 1) % AGENT_ORDER.length);
		}, 720);
		return () => window.clearInterval(t);
	}, [busy]);
	const archive = (0, import_react.useMemo)(() => order.map((id) => saved[id]).filter(Boolean), [order, saved]);
	const status = AGENTS[AGENT_ORDER[active]].watching;
	async function openSample(id) {
		setError(null);
		setBusy(true);
		await minWait(Date.now(), 2100);
		setBusy(false);
		navigate({
			to: "/r/$id",
			params: { id }
		});
	}
	async function convene(briefing) {
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
			navigate({
				to: "/r/$id",
				params: { id: result.roadmap.id }
			});
		} catch {
			setError("The council could not assemble. Try a tighter briefing.");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "hidden text-[0.75rem] text-subtle sm:block",
			children: "Six agents · six dimensions"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LatticeBg, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "pt-4 sm:pt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-subtle",
								children: "Multidimensional impact roadmap"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-[2.6rem] font-medium leading-[1.08] tracking-tight text-balance sm:text-6xl",
								children: "See every dimension of the move."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base text-muted text-pretty sm:text-lg",
								children: "Brief an initiative. Atlas, Forge, Loom, Hearth, Sentinel, and Horizon score customer, revenue, operations, people, risk, and optionality — then sequence what is committed, what is a bet, and what is still a story."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Current vs projected radar" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Now / Next / Later board" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Agent tensions, on purpose" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Second-order ripples" })
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "relative z-10 rounded-xl p-5 sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "Brief the council"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-5 text-sm text-muted",
								children: "Specifics beat slogans. Name the decision and the constraint."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingForm, {
								busy,
								onSubmit: convene
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-clay",
								role: "alert",
								children: error
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl",
						children: "Reference briefings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Open a finished council session. No generation required."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 grid gap-3 md:grid-cols-3",
						children: SAMPLE_CARDS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openSample(s.id),
							disabled: busy,
							className: "h-full w-full rounded-xl bg-surface p-5 text-left shadow-border transition-[box-shadow,transform] duration-150 ease-out hover:shadow-border-hover active:scale-[0.99] disabled:opacity-50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.6875rem] uppercase tracking-[0.16em] text-subtle",
									children: PLAN_HORIZON_META[s.planHorizon].label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-xl leading-snug",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted text-pretty",
									children: s.thesis
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-4 inline-flex items-center gap-1 text-[0.8125rem] text-primary",
									children: ["Open map", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
								})
							]
						}) }, s.id))
					})
				]
			}),
			mounted && archive.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Your archive"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 flex flex-col gap-2",
					children: archive.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/r/$id",
						params: { id: r.id },
						className: "flex items-center justify-between gap-4 rounded-lg bg-surface px-4 py-3 shadow-border hover:shadow-border-hover",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.75rem] text-subtle",
							children: new Date(r.createdAt).toLocaleDateString()
						})]
					}) }, r.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-20 border-t border-border pt-6 text-[0.75rem] text-subtle",
				children: "Axial is a council skill: six agents, six dimensions, three horizons, and the effects nobody put on the slide."
			}),
			busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CouncilOverlay, {
				activeIndex: active,
				status
			})
		]
	});
}
function minWait(started, ms) {
	const wait = ms - (Date.now() - started);
	return wait > 0 ? new Promise((r) => setTimeout(r, wait)) : Promise.resolve();
}
//#endregion
export { Home as component };
