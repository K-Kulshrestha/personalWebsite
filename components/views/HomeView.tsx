"use client";

import { profile } from "@/data/profile";
import type { ViewId } from "@/data/types";
import { HeroArt } from "../HeroArt";
import { Arrow, Wave } from "../sketch/Scribbles";
import { StickyNote } from "../sketch/StickyNote";

const { hero } = profile;
/** SVG-unit box → CSS percentages inside the 3:2 hero box. */
const place = (b: { x: number; y: number; w: number; h: number }) => ({
  left: `${(b.x / hero.width) * 100}%`,
  top: `${(b.y / hero.height) * 100}%`,
  width: `${(b.w / hero.width) * 100}%`,
  height: `${(b.h / hero.height) * 100}%`,
});

function Roles({ className = "" }: { className?: string }) {
  const r = profile.roles;
  return (
    <p className={`font-mono uppercase tracking-[0.1em] text-hat-deep ${className}`}>
      {r.slice(0, 2).join(" × ")} ×<br />
      {r.slice(2).join(" × ")}
    </p>
  );
}

export function HomeView({ onGo }: { onGo: (v: ViewId) => void }) {
  return (
    <div className="stage h-full w-full">
      {/* ---------- wide: text laid over the art's empty corners ---------- */}
      <div className="home-wide relative flex h-full w-full items-center justify-center">
        <div className="hero-box relative">
          <HeroArt />

          <div className="absolute flex flex-col" style={place(hero.nameBox)}>
            <h1 className="font-mono font-normal uppercase leading-[1.08] tracking-[0.04em] text-ink" style={{ fontSize: "3.3cqw" }}>
              {profile.name.split(" ").map((w) => (
                <span key={w} className="block">
                  {w}
                </span>
              ))}
            </h1>
            <Roles className="mt-[1.1cqw] leading-[1.45]" />
            <Wave className="mt-[1.2cqw] w-[8.5cqw] text-hat" strokeWidth={3} />
            <p className="hero-tagline mt-[1.3cqw] max-w-[27cqw] font-serif leading-snug text-ink-soft" style={{ fontSize: "1.3cqw" }}>
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Start anywhere" className="absolute flex flex-col" style={place(hero.pillarBox)}>
            <p className="font-hand leading-none text-pencil" style={{ fontSize: "1.45cqw" }}>
              start anywhere ↓
            </p>
            <ul className="mt-[0.9cqw] flex flex-col gap-[0.55cqw]">
              {profile.pillars.map((p) => (
                <li key={p.word}>
                  <button
                    onClick={() => onGo(p.view)}
                    className="group flex flex-col items-start text-left"
                    aria-label={`${p.word}: ${p.note}. Opens ${p.view}.`}
                  >
                    <span
                      className="font-mono uppercase tracking-[0.12em] text-ink-soft transition-colors group-hover:text-ink"
                      style={{ fontSize: "1.15cqw" }}
                    >
                      <span className="group-hover:hl group-focus-visible:hl">{p.word}</span>
                      <span className="ml-[0.5cqw] inline-block text-hat-deep opacity-0 transition-all group-hover:translate-x-[0.3cqw] group-hover:opacity-100 group-focus-visible:opacity-100">
                        →
                      </span>
                    </span>
                    <span className="font-hand leading-none text-pencil" style={{ fontSize: "1.25cqw" }}>
                      {p.note}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <span aria-hidden className="mt-[1cqw] block h-[2px] w-[2.2cqw] rounded bg-hat" />
          </nav>
        </div>

        {/* only on very wide stages, where there's room beside the art */}
        <div className="hero-aside absolute bottom-[6%] right-[var(--gutter)] w-[clamp(170px,14vw,230px)]">
          <StickyNote tilt={2} className="px-4 pb-4 pt-5">
            <p className="label text-ink-soft">Currently</p>
            <p className="mt-1 font-hand text-[22px] leading-[1.05]">{profile.currently}</p>
            <button onClick={() => onGo("work")} className="mt-3 flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-hat-deep hover:underline">
              see the work
              <Arrow className="h-4 w-7" />
            </button>
          </StickyNote>
        </div>
      </div>

      {/* ---------- tall (phones, portrait tablets): stacked, same pieces ---------- */}
      <div className="home-tall h-full w-full flex-col justify-between gap-2 px-[var(--gutter)] pb-3 pt-4">
        <div>
          <h1 className="font-mono uppercase leading-[1.05] tracking-[0.04em]" style={{ fontSize: "clamp(26px, 8.6vw, 44px)" }}>
            {profile.name.split(" ").map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </h1>
          <Roles className="mt-2 text-[clamp(11px,3.3vw,15px)] leading-[1.5]" />
          <Wave className="mt-2 w-20 text-hat" />
        </div>

        <div className="-mx-[var(--gutter)] min-h-0 flex-1">
          <div className="flex h-full items-center justify-center">
            <div className="w-full max-h-full" style={{ aspectRatio: "3 / 2", maxWidth: "calc((100dvh - 330px) * 1.5)" }}>
              <HeroArt />
            </div>
          </div>
        </div>

        <p className="font-serif text-[clamp(15px,4.2vw,19px)] leading-snug text-ink-soft">{profile.tagline}</p>

        <nav aria-label="Start anywhere" className="grid grid-cols-2 gap-2">
          {profile.pillars.map((p, i) => (
            <button
              key={p.word}
              onClick={() => onGo(p.view)}
              className={`${i % 2 ? "rough-2" : "rough"} flex flex-col items-start bg-paper px-3 py-2 text-left active:bg-sticky-blue`}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.12em]">
                {p.word} <span className="text-hat-deep">→</span>
              </span>
              <span className="font-hand text-[17px] leading-none text-pencil">{p.note}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
