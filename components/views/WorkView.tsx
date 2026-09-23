"use client";

import { Fragment, useState } from "react";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import type { Route } from "@/lib/route";
import type { Navigate } from "../Notebook";
import { Arrow, Circle, Underline } from "../sketch/Scribbles";
import { StickyNote } from "../sketch/StickyNote";
import { CaseStudyReader } from "./CaseStudyReader";

const pad = (n: number) => String(n).padStart(2, "0");

export function WorkView({ route, navigate }: { route: Route; navigate: Navigate }) {
  const study = route.study ? getCaseStudy(route.study) : undefined;
  if (study) return <CaseStudyReader study={study} section={route.section ?? "overview"} navigate={navigate} />;
  return <WorkIndex navigate={navigate} />;
}

/**
 * The contents page of the notebook. Rows are the projects; hovering or
 * focusing one pins a preview card beside the list.
 */
function WorkIndex({ navigate }: { navigate: Navigate }) {
  const [focus, setFocus] = useState(0);
  const cs = caseStudies[focus];
  const open = (slug: string) => navigate({ view: "work", study: slug, section: "overview" });

  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr] gap-[var(--gap)] px-[var(--gutter)] pb-1 pt-[clamp(14px,3vh,36px)] md:pb-3 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-[clamp(24px,4vw,72px)] short:grid-cols-1 short:pt-2">
      <header className="md:col-span-2">
        <p className="label text-pencil">02 / Work</p>
        <h2 className="mt-1 flex flex-wrap items-baseline gap-x-3 font-serif leading-none" style={{ fontSize: "clamp(28px, 4.2vw, 60px)" }}>
          <span className="relative">
            Case studies
            <Underline className="absolute -bottom-1 left-0 h-3 w-full text-hat" animate />
          </span>
          <span className="font-hand text-pencil" style={{ fontSize: "clamp(18px, 1.8vw, 26px)" }}>
            four times I owned something from idea → shipped
          </span>
        </h2>
      </header>

      <ol className="no-scrollbar flex min-h-0 flex-col justify-start overflow-y-auto pt-[clamp(2px,1.5dvh,14px)] md:justify-center md:overflow-visible md:pt-0" aria-label="Case studies">
        {caseStudies.map((c, i) => {
          const on = i === focus;
          return (
            <li key={c.slug} className="flex max-h-[clamp(84px,15dvh,132px)] min-h-fit grow border-t-[1.5px] border-ink/80 last:border-b-[1.5px] [&:nth-last-child(2)]:border-b-[1.5px] md:block md:max-h-none md:grow-0 md:[&:nth-last-child(2)]:border-b-0">
              <button
                onClick={() => open(c.slug)}
                onMouseEnter={() => setFocus(i)}
                onFocus={() => setFocus(i)}
                className="group grid w-full grid-cols-[auto_1fr_auto] content-center items-baseline gap-x-[clamp(10px,1.6vw,24px)] py-[clamp(8px,1.8dvh,18px)] text-left md:items-center md:py-[clamp(8px,2.1vh,22px)]"
              >
                <span className={`font-mono text-sm ${on ? "text-hat-deep" : "text-pencil"}`}>{pad(i + 1)}</span>
                <span className="min-w-0">
                  <span className="relative inline-block font-serif leading-[1.05]" style={{ fontSize: "clamp(20px, 2.35vw, 36px)" }}>
                    <span className={on ? "hl" : ""}>{c.label}</span>
                  </span>
                  <span className="label mt-1 block leading-snug tracking-[0.1em] text-pencil md:truncate md:leading-[inherit] md:tracking-[0.16em]">
                    {/* phones: each piece stays whole and lines wrap only between pieces */}
                    <span className="md:hidden">
                      {metaParts(c).map((t, j, all) => (
                        <Fragment key={t}>
                          <span className="whitespace-nowrap">
                            {t}
                            {j < all.length - 1 && " ·"}
                          </span>
                          {j < all.length - 1 && " "}
                        </Fragment>
                      ))}
                    </span>
                    <span className="hidden md:inline">
                      {c.org} · {c.role} · {c.when}
                    </span>
                  </span>
                </span>
                <span className="relative hidden shrink-0 px-3 py-1 text-right sm:block">
                  <span className="font-hand leading-none" style={{ fontSize: "clamp(20px, 2vw, 30px)" }}>
                    {c.metrics[0].value}
                  </span>
                  {on && <Circle className="pointer-events-none absolute -inset-x-1 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+8px)] text-hat" animate />}
                </span>
              </button>
            </li>
          );
        })}
        <li className="shrink-0 pt-[clamp(6px,1.5dvh,12px)] font-hand text-lg text-pencil md:hidden short:hidden">tap one to open it →</li>
      </ol>

      {/* preview: only where there's room for it */}
      <aside className="relative hidden min-h-0 items-center md:flex short:hidden" aria-live="polite">
        <div className="relative w-full">
        <StickyNote key={cs.slug} tone="white" tilt={1.2} className="drawer-in w-full px-[clamp(18px,2vw,32px)] pb-[clamp(16px,2vw,28px)] pt-[clamp(20px,2.4vw,34px)]">
          <p className="label text-hat-deep">
            {pad(focus + 1)} · {tagLine(cs.tags)}
          </p>
          <h3 className="mt-2 font-serif leading-tight" style={{ fontSize: "clamp(18px, 1.7vw, 26px)" }}>
            {cs.title}
          </h3>
          <p className="mt-3 font-serif text-ink-soft" style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}>
            {cs.hook}
          </p>
          <ul className="mt-4 grid grid-cols-3 gap-3 border-t border-dashed border-ink/40 pt-3">
            {cs.metrics.map((m) => (
              <li key={m.label}>
                <p className="font-hand leading-none" style={{ fontSize: "clamp(22px, 2vw, 32px)" }}>
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-[11px] leading-snug text-ink-soft">{m.label}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => open(cs.slug)}
            className="mt-5 inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-hat-deep"
          >
            Open case study
            <Arrow className="h-4 w-7 text-paper" />
          </button>
        </StickyNote>
        <p className="pointer-events-none absolute -top-9 right-3 rotate-[-3deg] font-hand text-xl text-hat-deep">{cs.scribble}</p>
        </div>
      </aside>
    </div>
  );
}

const tagLine = (tags: string[]) => tags.slice(0, 2).join(" · ");
const metaParts = (c: { org: string; role: string; when: string }) => [c.org, ...c.role.split(" · "), c.when];
