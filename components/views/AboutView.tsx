"use client";

import { useState } from "react";
import { about } from "@/data/about";
import { profile } from "@/data/profile";
import { Arrow, Star, Underline } from "../sketch/Scribbles";
import { StickyNote } from "../sketch/StickyNote";
import { Print } from "../Evidence";

function Hello() {
  return (
    <>
      <h2 className="font-serif leading-none" style={{ fontSize: "clamp(32px, 4.6vw, 68px)" }}>
        <span className="relative inline-block">
          {about.hello}
          <Underline className="absolute -bottom-1.5 left-0 h-3.5 w-full text-hat" animate />
        </span>
      </h2>
      <div className="mt-[clamp(14px,3vh,28px)] max-w-[56ch] space-y-3">
        {about.paragraphs.map((p) => (
          <p key={p} className="font-serif leading-snug text-ink-soft" style={{ fontSize: "clamp(16px, 1.35vw, 21px)" }}>
            {p}
          </p>
        ))}
      </div>
    </>
  );
}

function Beliefs() {
  return (
    <div>
      <p className="font-hand text-pencil" style={{ fontSize: "clamp(20px, 1.6vw, 24px)" }}>
        things I believe (some after learning the hard way):
      </p>
      <ul className="mt-2 space-y-[clamp(4px,1vh,10px)]">
        {about.beliefs.map((b) => (
          <li key={b.text} className="flex items-baseline gap-2 font-serif" style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}>
            <Star className="h-4 w-4 shrink-0 translate-y-0.5 text-hat" />
            <span>
              {b.crossed && <span className="crossed mr-2">{b.crossed}</span>}
              <span className={b.crossed ? "font-hand text-[1.35em] leading-none text-hat-deep" : ""}>{b.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SayHi() {
  return (
    <div>
      <p className="label text-pencil">Say hi</p>
      <a
        href={`mailto:${profile.email}`}
        className="group mt-1 inline-flex items-center gap-2 break-all font-hand leading-none text-ink hover:text-hat-deep"
        style={{ fontSize: "clamp(24px, 2.2vw, 34px)" }}
      >
        {profile.email}
        <Arrow className="h-5 w-8 shrink-0 text-hat transition-transform group-hover:translate-x-1" />
      </a>
      <ul className="mt-3 flex flex-wrap gap-2">
        {profile.links.map((l, i) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={`${i % 2 ? "rough-2" : "rough"} inline-block px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] hover:bg-sticky-blue`}
            >
              {l.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const tabs = ["me", "beliefs", "say hi"] as const;

export function AboutView() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("me");

  return (
    <div className="h-full w-full px-[var(--gutter)] pb-3 pt-[clamp(14px,3vh,36px)]">
      {/* desktop: one spread */}
      <div className="hidden h-full grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-x-[clamp(28px,5vw,96px)] md:grid short:hidden">
        <div className="flex min-h-0 flex-col justify-center gap-[clamp(20px,7vh,72px)]">
          <div>
            <p className="label mb-2 text-pencil">05 / About</p>
            <Hello />
          </div>
          <Beliefs />
        </div>

        <div className="flex min-h-0 flex-col justify-center gap-[clamp(16px,4.5vh,56px)]">
          <div className="grid gap-[clamp(12px,2.6vh,26px)]">
            {about.notes.slice(0, 2).map((n, i) => (
              <StickyNote
                key={n.label}
                tone={i === 1 ? "blue" : i === 2 ? "white" : "sticky"}
                tilt={[-1.6, 1.4, -0.6][i % 3]}
                tape={i !== 1}
                className={`px-5 pb-4 pt-5 ${i === 1 ? "ml-[8%]" : i === 2 ? "mr-[10%]" : ""}`}
              >
                <p className="label text-ink-soft">{n.label}</p>
                <p className="mt-1 font-hand leading-[1.05]" style={{ fontSize: "clamp(20px, 1.7vw, 26px)" }}>
                  {n.text}
                </p>
              </StickyNote>
            ))}
            {/* the real-world photo, with the last note clipped to its corner (over the ceiling, not the crowd) */}
            <div className="relative mt-1 pr-[14%]">
              <Print figure={about.photo} height="min(clamp(130px, 27vh, 300px), 22vw)" tilt={-1} tape={false} />
              <div className="absolute -top-4 right-0 w-[40%]">
                <StickyNote tone="white" tilt={3} className="px-3 pb-2.5 pt-3.5">
                  <p className="label text-ink-soft">{about.notes[2].label}</p>
                  <p className="mt-0.5 font-hand leading-[1.05]" style={{ fontSize: "clamp(17px, 1.4vw, 22px)" }}>
                    {about.notes[2].text}
                  </p>
                </StickyNote>
              </div>
            </div>
          </div>
          <SayHi />
        </div>
      </div>

      {/* mobile: the same spread, one page at a time */}
      <div className="flex h-full flex-col md:hidden short:flex">
        <p className="label text-pencil">05 / About</p>
        <div className="mt-2 flex gap-1" role="group" aria-label="About pages">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${tab === t ? "rough bg-sticky-blue" : "text-pencil"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div key={tab} className="view-in panel-scroll mt-4 min-h-0 flex-1">
          {tab === "me" && (
            <>
              <Hello />
              <Print figure={about.photo} height="auto" tape={false} className="mt-5" />
            </>
          )}
          {tab === "beliefs" && (
            <div className="space-y-6">
              <Beliefs />
              <StickyNote className="px-4 pb-3 pt-4">
                <p className="label text-ink-soft">{about.notes[0].label}</p>
                <p className="mt-1 font-hand text-[22px] leading-[1.05]">{about.notes[0].text}</p>
              </StickyNote>
            </div>
          )}
          {tab === "say hi" && (
            <div className="space-y-6">
              <SayHi />
              {about.notes.slice(1).map((n, i) => (
                <StickyNote key={n.label} tone={i ? "white" : "blue"} tilt={i ? 1.2 : -1.2} className="px-4 pb-3 pt-4">
                  <p className="label text-ink-soft">{n.label}</p>
                  <p className="mt-1 font-hand text-[22px] leading-[1.05]">{n.text}</p>
                </StickyNote>
              ))}
            </div>
          )}
        </div>
        {tab !== "say hi" && (
          <button onClick={() => setTab(tab === "me" ? "beliefs" : "say hi")} className="mt-2 self-end font-hand text-xl text-hat-deep">
            {tab === "me" ? "what I believe" : "say hi"} →
          </button>
        )}
      </div>
    </div>
  );
}
