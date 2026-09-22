"use client";

import { useEffect, useState } from "react";
import { roles } from "@/data/experience";
import type { Role } from "@/data/types";
import type { Navigate } from "../Notebook";
import { Arrow, Underline } from "../sketch/Scribbles";
import { StickyNote } from "../sketch/StickyNote";

// Timeline bounds (decimal years). "Now" is marked so the future reads as future.
const FROM = 2022.5;
const TO = 2029;
const NOW = 2026.72;
const years = [2023, 2024, 2025, 2026, 2027, 2028];
const pct = (y: number) => ((y - FROM) / (TO - FROM)) * 100;

const lanes: Record<Role["kind"], number> = { work: 0, leadership: 1, teaching: 2, education: 2 };
const laneName = ["work", "leading", "teaching / school"];

export function ExperienceView({ navigate }: { navigate: Navigate }) {
  const latestPast = [...roles].reverse().find((r) => r.start < NOW) ?? roles[0];
  const [sel, setSel] = useState(roles.indexOf(latestPast));
  const r = roles[sel];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("[role=tablist]")) return;
      if (e.key === "ArrowRight") setSel((s) => Math.min(roles.length - 1, s + 1));
      if (e.key === "ArrowLeft") setSel((s) => Math.max(0, s - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="grid h-full w-full grid-rows-[auto_auto_minmax(0,1fr)] px-[var(--gutter)] pb-3 pt-[clamp(14px,3vh,36px)]">
      <header className="flex flex-wrap items-end justify-between gap-x-6">
        <div>
          <p className="label text-pencil">04 / Experience</p>
          <h2 className="mt-1 font-serif leading-none" style={{ fontSize: "clamp(26px, 3.6vw, 54px)" }}>
            Where I&apos;ve{" "}
            <span className="relative inline-block">
              owned things
              <Underline className="absolute -bottom-1 left-0 h-3 w-full text-hat" animate />
            </span>
          </h2>
        </div>
        <p className="hidden font-hand text-xl text-pencil md:block">pick a node · or use ← →</p>
      </header>

      {/* desktop timeline */}
      <div className="relative mt-[clamp(14px,3vh,34px)] hidden h-[clamp(118px,17vh,150px)] md:block" role="listbox" aria-label="Roles over time">
        {/* lane labels */}
        {laneName.map((n, i) => (
          <span key={n} className="absolute left-0 font-hand text-base leading-none text-pencil" style={{ top: `${10 + i * 27}%` }}>
            {n}
          </span>
        ))}
        <div className="absolute inset-y-0 left-[clamp(90px,9vw,130px)] right-0">
          {/* axis */}
          <span aria-hidden className="absolute bottom-5 left-0 right-0 h-[1.5px] bg-ink" />
          {years.map((y) => (
            <span key={y} aria-hidden className="absolute bottom-0 -translate-x-1/2 font-mono text-[11px] text-pencil" style={{ left: `${pct(y)}%` }}>
              <span className="absolute -top-2 left-1/2 h-2 w-px bg-ink" />
              {y}
            </span>
          ))}
          {/* now */}
          <span aria-hidden className="absolute bottom-5 top-0 border-l-[1.5px] border-dashed border-hat-deep" style={{ left: `${pct(NOW)}%` }}>
            <span className="absolute -top-1 left-1.5 whitespace-nowrap font-hand text-base leading-none text-hat-deep">you are here</span>
          </span>
          {/* roles */}
          {roles.map((role, i) => {
            const on = i === sel;
            const future = role.start > NOW;
            const width = Math.max(pct(role.end) - pct(role.start), 2.2);
            const narrow = width < 9; // label sits beside short stints
            const name = role.short;
            return (
              <button
                key={role.id}
                role="option"
                aria-selected={on}
                onClick={() => setSel(i)}
                title={`${role.org} · ${role.when}`}
                className={`group absolute flex h-[20%] items-center whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] ${
                  on ? "z-10" : ""
                }`}
                style={{ left: `${pct(role.start)}%`, width: `${width}%`, top: `${4 + lanes[role.kind] * 27}%` }}
              >
                <span
                  className={`flex h-full w-full items-center overflow-hidden px-2 transition-colors ${
                    future ? "rough-dashed" : i % 2 ? "rough-2" : "rough"
                  } ${on ? "bg-hat text-ink" : future ? "bg-paper text-pencil group-hover:bg-paper-2" : "bg-paper-2 text-ink-soft group-hover:bg-sticky-blue"}`}
                >
                  {!narrow && name}
                </span>
                {narrow && (
                  <span className={`absolute left-full ml-1.5 ${on ? "hl text-ink" : "text-ink-soft group-hover:text-ink"}`}>{name}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* mobile timeline: swipeable chips */}
      <ol className="no-scrollbar -mx-[var(--gutter)] mt-3 flex gap-2 overflow-x-auto px-[var(--gutter)] pb-1 md:hidden" aria-label="Roles over time">
        {roles.map((role, i) => (
          <li key={role.id} className="shrink-0">
            <button
              onClick={() => setSel(i)}
              aria-pressed={i === sel}
              className={`${i % 2 ? "rough-2" : "rough"} px-3 py-1.5 text-left ${i === sel ? "bg-hat" : "bg-paper"}`}
            >
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em]">{role.short}</span>
              <span className="block font-mono text-[10px] text-ink-soft">{role.when}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* details */}
      <section key={r.id} className="view-in panel-scroll mt-[clamp(12px,3vh,36px)] min-h-0" aria-live="polite">
        <div className="grid gap-x-[clamp(20px,3.5vw,64px)] gap-y-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <div>
            <p className="label text-hat-deep">
              {[r.when, r.where].filter(Boolean).join(" · ")}
            </p>
            <h3 className="mt-1 font-serif leading-tight" style={{ fontSize: "clamp(22px, 2.3vw, 36px)" }}>
              {r.role}
              <span className="block text-ink-soft">@ {r.org}</span>
            </h3>
            <p className="mt-3 font-hand leading-[1.05]" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>
              “{r.headline}”
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {r.caseStudy && (
                <button
                  onClick={() => navigate({ view: "work", study: r.caseStudy, section: "overview" })}
                  className="inline-flex items-center gap-2 bg-ink px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-hat-deep"
                >
                  the full story <Arrow className="h-4 w-6" />
                </button>
              )}
              <span className="font-mono text-xs text-pencil">
                {sel + 1}/{roles.length}
                <button onClick={() => setSel((s) => Math.max(0, s - 1))} disabled={sel === 0} className="ml-3 disabled:opacity-30" aria-label="Previous role">
                  ←
                </button>
                <button onClick={() => setSel((s) => Math.min(roles.length - 1, s + 1))} disabled={sel === roles.length - 1} className="ml-2 disabled:opacity-30" aria-label="Next role">
                  →
                </button>
              </span>
            </div>
          </div>

          <div className="grid content-start gap-x-8 gap-y-[clamp(12px,2.4vh,24px)] sm:grid-cols-2">
            <Field label="What I owned" items={r.owned} />
            <Field label="What I changed" items={r.changed} />
            <Field label="What I shipped" items={r.shipped} />
            <div className="sm:row-span-1">
              <StickyNote tilt={-1.2} tone="blue" className="px-4 pb-3 pt-4">
                <p className="label text-ink-soft">What I learned</p>
                <p className="mt-1 font-hand text-[22px] leading-[1.05]">{r.learned}</p>
              </StickyNote>
            </div>
            <p className="font-serif text-[15px] text-ink-soft sm:col-span-2">
              <span className="label mr-2 text-hat-deep">Who with</span>
              {r.people}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="label mb-1.5 text-hat-deep">{label}</p>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it} className="flex gap-2 font-serif leading-snug text-ink-soft" style={{ fontSize: "clamp(15px, 1.15vw, 18px)" }}>
            <span className="text-hat-deep">→</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
