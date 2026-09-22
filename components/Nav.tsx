"use client";

import type { KeyboardEvent } from "react";
import { profile, views } from "@/data/profile";
import type { ViewId } from "@/data/types";
import { Underline, Wave } from "./sketch/Scribbles";

type TabsProps = { active: ViewId; onSelect: (v: ViewId) => void };

/** Arrow keys move between tabs, like a real tablist. */
function onTabKeys(e: KeyboardEvent<HTMLDivElement>) {
  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
  const tabs = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]"));
  const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
  if (i < 0) return;
  e.preventDefault();
  e.stopPropagation();
  tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length].focus();
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Desktop: notebook index tabs sitting on the page edge. */
export function TopTabs({ active, onSelect }: TabsProps) {
  return (
    <header className="relative z-20 hidden shrink-0 items-end justify-between px-[var(--gutter)] pt-3 md:flex short:pt-1">
      <button
        onClick={() => onSelect("home")}
        className="group mb-2 flex items-center gap-3 text-left"
        aria-label="Kshitij Kulshrestha, home"
      >
        <span className="font-mono text-[15px] font-medium tracking-[0.14em]">K.KULSHRESTHA</span>
        <span className="hidden font-hand text-lg text-pencil lg:inline">— product notebook, vol. 1</span>
      </button>

      <div role="tablist" aria-label="Sections" className="flex items-end gap-1" onKeyDown={onTabKeys}>
        {views.map((v, i) => {
          const on = v.id === active;
          return (
            <button
              key={v.id}
              role="tab"
              aria-selected={on}
              aria-controls="main"
              tabIndex={on ? 0 : -1}
              onClick={() => onSelect(v.id)}
              title={`${v.hint} (press ${i + 1})`}
              className={`relative -mb-px flex items-baseline gap-1.5 rounded-t-[10px_14px] border-[1.5px] border-b-0 px-3 font-mono uppercase tracking-[0.14em] transition-[padding,background-color] duration-150 lg:px-4 ${
                on
                  ? "border-ink bg-sticky-blue pb-2.5 pt-2.5 text-ink"
                  : "border-transparent pb-1.5 pt-1.5 text-ink-soft hover:border-ink/30 hover:bg-paper-2"
              }`}
              style={{ fontSize: "clamp(11px, 0.82vw, 13px)" }}
            >
              <span className={on ? "text-hat-deep" : "text-pencil"}>{pad(i + 1)}</span>
              {v.label}
              {on && <Underline className="absolute -bottom-0.5 left-2 h-2 w-[calc(100%-1rem)] text-hat" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      {/* the page edge the tabs sit on */}
      <span aria-hidden className="absolute bottom-0 left-[var(--gutter)] right-[var(--gutter)] h-[1.5px] bg-ink" />
    </header>
  );
}

/** Mobile: a thumb-reachable tab bar. Same states, different shape. */
export function BottomTabs({ active, onSelect }: TabsProps) {
  return (
    <nav className="relative z-20 shrink-0 border-t-[1.5px] border-ink bg-paper pb-[env(safe-area-inset-bottom)] md:hidden">
      <div role="tablist" aria-label="Sections" className="grid grid-cols-5" onKeyDown={onTabKeys}>
        {views.map((v, i) => {
          const on = v.id === active;
          return (
            <button
              key={v.id}
              role="tab"
              aria-selected={on}
              aria-controls="main"
              tabIndex={on ? 0 : -1}
              onClick={() => onSelect(v.id)}
              className={`relative flex flex-col items-center gap-0.5 py-2 font-mono text-[10px] uppercase tracking-[0.12em] ${
                on ? "bg-sticky-blue text-ink" : "text-ink-soft"
              }`}
            >
              {on && <span aria-hidden className="absolute inset-x-3 -top-[1.5px] h-[3px] rounded bg-hat" />}
              <span className={on ? "text-hat-deep" : "text-pencil"}>{pad(i + 1)}</span>
              {v.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Desktop footer strip: the practical links, always one glance away. */
export function FooterLinks() {
  return (
    <footer className="relative z-10 hidden h-10 shrink-0 items-center justify-between px-[var(--gutter)] md:flex short:hidden">
      <ul className="flex gap-6">
        {profile.links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="label text-ink-soft underline-offset-4 hover:text-ink hover:underline"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a href={`mailto:${profile.email}`} className="group flex items-center gap-2 text-ink">
        <span className="font-hand text-xl leading-none">got something ambiguous? let&apos;s build it</span>
        <Wave className="h-3 w-10 text-hat transition-transform group-hover:translate-x-1" />
      </a>
    </footer>
  );
}
