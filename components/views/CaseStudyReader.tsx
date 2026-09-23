"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/data/types";
import { sectionIds, type SectionId } from "@/lib/route";
import type { Navigate } from "../Notebook";
import { Arrow, Circle, Star, Underline } from "../sketch/Scribbles";
import { StickyNote } from "../sketch/StickyNote";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Case-study mode. The case study replaces the Work canvas and splits into
 * six states instead of one long page: ← → move between them, Esc goes back.
 */
export function CaseStudyReader({
  study,
  section,
  navigate,
}: {
  study: CaseStudy;
  section: SectionId;
  navigate: Navigate;
}) {
  const idx = sectionIds.indexOf(section);
  const go = (s: SectionId) => navigate({ view: "work", study: study.slug, section: s });
  const back = () => navigate({ view: "work" });
  const sIdx = caseStudies.findIndex((c) => c.slug === study.slug);
  const nextStudy = caseStudies[(sIdx + 1) % caseStudies.length];
  const chips = useRef<HTMLOListElement>(null);

  // On narrow screens the section index is a sideways row: keep the current one in view.
  // (Sets scrollLeft on the row only, so no ancestor of the fixed canvas ever scrolls.)
  useEffect(() => {
    const ol = chips.current;
    const li = ol?.children[idx] as HTMLElement | undefined;
    if (ol && li && ol.scrollWidth > ol.clientWidth) {
      ol.scrollTo({ left: li.offsetLeft - ol.clientWidth / 2 + li.clientWidth / 2, behavior: "smooth" });
    }
  }, [idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("[role=tablist][aria-label=Sections]")) return;
      if (e.key === "Escape") back();
      if (e.key === "ArrowRight" && idx < sectionIds.length - 1) go(sectionIds[idx + 1]);
      if (e.key === "ArrowLeft" && idx > 0) go(sectionIds[idx - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <article className="grid h-full w-full grid-cols-1 grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-x-[clamp(20px,3vw,56px)] px-[var(--gutter)] pb-3 pt-[clamp(10px,2.4vh,28px)] md:grid-cols-[clamp(170px,15vw,230px)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)_auto]">
      {/* header */}
      <header className="md:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <button onClick={back} className="group flex items-center gap-1 font-hand text-xl text-ink-soft hover:text-ink">
            <Arrow flip className="h-4 w-7 transition-transform group-hover:-translate-x-1" />
            all work
          </button>
          <p className="label hidden truncate text-pencil sm:block">
            {study.org} · {study.role} · {study.when}
          </p>
        </div>
        <h2 className="mt-1 font-serif leading-[1.05]" style={{ fontSize: "clamp(22px, 3vw, 46px)" }}>
          {study.title}
        </h2>
      </header>

      {/* section index: vertical on desktop, a chip row on mobile */}
      <nav aria-label="Case study sections" className="min-w-0 md:row-span-2 md:pt-[clamp(12px,3vh,32px)]">
        <ol ref={chips} className="no-scrollbar relative -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] py-2 md:mx-0 md:flex-col md:gap-[clamp(2px,0.8vh,8px)] md:overflow-visible md:px-0">
          {sectionIds.map((s, i) => {
            const on = s === section;
            return (
              <li key={s} className="shrink-0">
                <button
                  onClick={() => go(s)}
                  aria-current={on ? "step" : undefined}
                  className={`relative flex items-baseline gap-2 whitespace-nowrap px-2 py-1 font-mono text-[12px] uppercase tracking-[0.14em] md:px-3 md:py-1.5 ${
                    on ? "text-ink" : "text-pencil hover:text-ink"
                  }`}
                >
                  <span className={on ? "text-hat-deep" : ""}>{pad(i + 1)}</span>
                  {s}
                  {on && <Circle className="pointer-events-none absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] text-hat" animate />}
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-[clamp(12px,4vh,40px)] hidden md:block short:hidden">
          <p className="label text-pencil">Up next</p>
          <button
            onClick={() => navigate({ view: "work", study: nextStudy.slug, section: "overview" })}
            className="group mt-1 text-left font-serif text-lg leading-tight hover:text-hat-deep"
          >
            {nextStudy.label} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </nav>

      {/* the current section */}
      <section
        key={section}
        aria-label={section}
        className="view-in panel-scroll relative min-h-0 pt-[clamp(8px,3vh,32px)]"
      >
        <Section study={study} section={section} />
      </section>

      {/* pager */}
      <footer className="flex items-center justify-between border-t border-dashed border-ink/40 pt-2 md:col-start-2">
        <button
          onClick={() => idx > 0 && go(sectionIds[idx - 1])}
          disabled={idx === 0}
          className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft enabled:hover:text-ink disabled:opacity-30"
        >
          ← {idx > 0 ? sectionIds[idx - 1] : "start"}
        </button>
        <span className="font-mono text-xs text-pencil" aria-label={`Section ${idx + 1} of ${sectionIds.length}`}>
          {pad(idx + 1)} / {pad(sectionIds.length)}
          <span className="ml-3 hidden font-hand text-base lg:inline">(← → keys work too)</span>
        </span>
        {idx < sectionIds.length - 1 ? (
          <button
            onClick={() => go(sectionIds[idx + 1])}
            className="bg-ink px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-hat-deep"
          >
            {sectionIds[idx + 1]} →
          </button>
        ) : (
          <button
            onClick={() => navigate({ view: "work", study: nextStudy.slug, section: "overview" })}
            className="bg-ink px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-hat-deep"
          >
            next project →
          </button>
        )}
      </footer>
    </article>
  );
}

/* ------------------------------------------------------------------ */

const body = "font-serif text-ink-soft";
const bodySize = { fontSize: "clamp(15px, 1.2vw, 19px)" };
const lead = { fontSize: "clamp(18px, 1.75vw, 28px)" };

function Note({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="label mb-1.5 text-hat-deep">{label}</p>
      <div className={body} style={bodySize}>
        {children}
      </div>
    </div>
  );
}

function Metrics({ study, big }: { study: CaseStudy; big?: boolean }) {
  return (
    <ul className="grid grid-cols-3 gap-[clamp(10px,2vw,32px)]">
      {study.metrics.map((m, i) => (
        <li key={m.label} className="relative">
          <p className="relative inline-block min-w-[1.4em] text-center font-hand leading-none" style={{ fontSize: big ? "clamp(34px, 4.4vw, 72px)" : "clamp(28px, 3vw, 48px)" }}>
            {m.value}
            {i === 0 && <Circle className="pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+24px)] text-hat" animate />}
          </p>
          <p className="mt-1 font-mono text-[11px] leading-snug text-ink-soft md:text-xs">{m.label}</p>
        </li>
      ))}
    </ul>
  );
}

function Section({ study, section }: { study: CaseStudy; section: SectionId }) {
  switch (section) {
    case "overview":
      return (
        <div className="grid h-full content-start gap-[clamp(16px,3.5vh,40px)]">
          <p className="max-w-[46ch] font-serif italic leading-snug" style={lead}>
            {study.hook}
          </p>
          <div className="grid gap-[clamp(14px,2vw,32px)] md:grid-cols-3">
            <Note label="Context">{study.overview.context}</Note>
            <Note label="What I owned">
              <span className="hl">{study.overview.ownership}</span>
            </Note>
            <Note label="Who with">{study.overview.team}</Note>
          </div>
          <Metrics study={study} />
        </div>
      );

    case "problem":
      return (
        <div className="grid h-full content-start gap-[clamp(16px,3vh,36px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-x-12">
          <div className="grid content-start gap-[clamp(14px,3vh,32px)]">
            <p className="max-w-[48ch] font-serif leading-snug" style={lead}>
              {study.problem.statement}
            </p>
            <Note label="Who needed what">
              <ul className="space-y-1.5">
                {study.problem.needs.map((n) => (
                  <li key={n} className="flex gap-2">
                    <span className="text-hat-deep">→</span>
                    {n}
                  </li>
                ))}
              </ul>
            </Note>
          </div>
          <div className="grid content-start gap-6">
            <StickyNote tilt={-1.5} className="px-5 pb-5 pt-6">
              <p className="label text-ink-soft">the real question</p>
              <p className="mt-2 font-hand leading-[1.05]" style={{ fontSize: "clamp(24px, 2.2vw, 34px)" }}>
                {study.problem.question}
              </p>
            </StickyNote>
            <div>
              <p className="label mb-2 text-hat-deep">Constraints</p>
              <ul className="flex flex-wrap gap-2">
                {study.problem.constraints.map((c, i) => (
                  <li key={c} className={`${i % 2 ? "rough-2" : "rough"} px-3 py-1 font-mono text-xs text-ink-soft`}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    case "thinking":
      return (
        <div className="grid h-full content-start gap-4">
          <p className="font-hand text-pencil" style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}>
            {study.thinkingNote ?? "the calls I made, and what I didn't do instead:"}
          </p>
          <ol className="grid gap-x-[clamp(20px,3vw,48px)] gap-y-[clamp(14px,3vh,30px)] md:grid-cols-2">
            {study.thinking.map((d, i) => (
              <li key={d.choice} className="grid grid-cols-[auto_1fr] gap-3">
                <span className="font-hand text-3xl leading-none text-hat-deep">{i + 1}.</span>
                <div>
                  <p className="font-serif font-semibold leading-tight" style={{ fontSize: "clamp(17px, 1.4vw, 22px)" }}>
                    {d.choice}
                    {d.over && (
                      <span className="ml-2 font-normal">
                        <span className="font-mono text-xs uppercase tracking-wider text-pencil">over </span>
                        <span className="crossed">{d.over}</span>
                      </span>
                    )}
                  </p>
                  <p className={`mt-1 ${body}`} style={bodySize}>
                    {d.why}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );

    case "build":
      return (
        <div className="grid h-full content-start gap-[clamp(16px,4vh,44px)]">
          {study.build.team && <p className="label -mb-[clamp(8px,2.5vh,32px)] text-hat-deep">My work</p>}
          <ol className="grid gap-[clamp(10px,1.4vw,20px)] sm:grid-cols-2 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-fr">
            {study.build.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className={`${i % 2 ? "rough-2" : "rough"} h-full bg-paper px-4 pb-4 pt-3`}>
                  <p className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-hat-deep">{pad(i + 1)}</span>
                    <span className="font-hand text-2xl leading-none">{s.title}</span>
                  </p>
                  <p className={`mt-2 ${body}`} style={{ fontSize: "clamp(14px, 1.05vw, 17px)" }}>
                    {s.body}
                  </p>
                </div>
                {i < study.build.steps.length - 1 && (
                  <Arrow className="absolute -right-[clamp(14px,1.3vw,20px)] top-6 z-10 hidden h-4 w-6 text-hat lg:block" />
                )}
              </li>
            ))}
          </ol>
          {study.build.team && (
            <div className="rough-dashed px-4 pb-3 pt-2.5">
              <p className="label text-hat-deep">
                Team system <span className="ml-1 font-hand text-base normal-case tracking-normal text-pencil">what we built together</span>
              </p>
              <ul className="mt-2 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                {study.build.team.map((t) => (
                  <li key={t.title}>
                    <span className="font-hand text-xl leading-none">{t.title}</span>
                    <p className={body} style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                      {t.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {study.figures?.length ? (
            <div className="flex min-h-0 gap-4">
              {study.figures.map((f) => (
                <figure key={f.src} className="min-w-0 flex-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt={f.alt} className="rough max-h-[30vh] w-full object-contain" />
                  {f.caption && <figcaption className="mt-1 font-hand text-lg text-pencil">{f.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ) : null}
          {study.build.stack && (
            <p className="font-mono text-xs leading-relaxed text-pencil">
              <span className="mr-2 font-hand text-lg text-ink-soft">built with:</span>
              {study.build.stack.join(" · ")}
            </p>
          )}
        </div>
      );

    case "outcome":
      return (
        <div className="grid h-full content-start gap-[clamp(18px,4vh,44px)]">
          <p className="max-w-[40ch] font-serif leading-snug" style={lead}>
            {study.outcome.summary}
          </p>
          <Metrics study={study} big />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <ul className="space-y-2">
              {study.outcome.results.map((r) => (
                <li key={r} className={`flex gap-3 ${body}`} style={bodySize}>
                  <span className="font-hand text-xl leading-none text-hat-deep">✓</span>
                  {r}
                </li>
              ))}
            </ul>
            {study.outcome.alsoShipped && (
              <StickyNote tone="blue" tilt={1} className="px-5 pb-4 pt-5">
                <p className="label text-ink-soft">also shipped</p>
                <p className="mt-1 font-serif text-[15px] leading-snug">{study.outcome.alsoShipped}</p>
              </StickyNote>
            )}
          </div>
        </div>
      );

    case "learnings":
      return (
        <div className="grid h-full content-start gap-[clamp(18px,4vh,44px)] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-x-12">
          <ul className="grid content-start gap-[clamp(14px,3vh,28px)]">
            {study.learnings.lessons.map((l) => (
              <li key={l} className="flex gap-3">
                <Star className="mt-1 h-6 w-6 shrink-0 text-hat" />
                <p className="font-serif leading-snug" style={lead}>
                  {l}
                </p>
              </li>
            ))}
          </ul>
          <div className="relative self-start">
            <StickyNote tilt={-1.8} className="px-5 pb-5 pt-6">
              <p className="label text-ink-soft">what I&apos;d do differently</p>
              <p className="mt-2 font-hand leading-[1.08]" style={{ fontSize: "clamp(22px, 2vw, 30px)" }}>
                {study.learnings.differently}
              </p>
            </StickyNote>
            <Underline className="mx-auto mt-4 h-3 w-2/3 text-hat" />
          </div>
        </div>
      );
  }
}
