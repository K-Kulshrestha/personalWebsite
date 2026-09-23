"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { experiments } from "@/data/experiments";
import { profile } from "@/data/profile";
import type { Experiment } from "@/data/types";
import type { Navigate } from "../Notebook";
import { Arrow, Squiggle, Tape, Underline } from "../sketch/Scribbles";

const tone: Record<Experiment["color"], string> = {
  sticky: "bg-sticky",
  blue: "bg-sticky-blue",
  paper: "bg-paper-2",
  white: "bg-white",
};

/** Loose, deterministic "someone tossed these on the desk" slots. */
function slot(i: number, n: number) {
  const cols = Math.min(4, Math.ceil(n / 2));
  const rows = Math.ceil(n / cols);
  const c = i % cols;
  const r = Math.floor(i / cols);
  const jx = (((i * 37) % 11) - 5) * 0.9;
  const jy = (((i * 23) % 7) - 3) * 1.6;
  const x = ((c + 0.5 + (r % 2 ? 0.28 : -0.08)) / cols) * 100 + jx;
  return {
    // keep notes clear of the board's edges
    x: 11 + (x / 100) * 78,
    y: ((r + 0.5) / rows) * 100 + jy,
    rot: (((i * 53) % 9) - 4) * 0.9,
  };
}

function Stamp({ status }: { status: Experiment["status"] }) {
  return (
    <span className="rough inline-block px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
      {status}
    </span>
  );
}

function NoteFace({ e }: { e: Experiment }) {
  const open = e.status === "open slot";
  return (
    <>
      <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-[3deg]" />
      <Stamp status={e.status} />
      <p className={`mt-2 font-hand leading-[0.95] ${open ? "text-hat-deep" : ""}`} style={{ fontSize: "clamp(24px, 2.1vw, 34px)" }}>
        {e.name}
      </p>
      <p className="mt-1.5 font-serif text-[14px] leading-snug text-ink-soft">
        <span className="italic">because</span> {e.because}
      </p>
      {e.metric && <p className="mt-2 font-hand text-2xl leading-none text-hat-deep">{e.metric}</p>}
    </>
  );
}

export function LabView({ navigate }: { navigate: Navigate }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [top, setTop] = useState<string[]>([]);
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const opened = experiments.find((e) => e.id === openId) ?? null;
  const close = useCallback(() => setOpenId(null), []);

  // Mobile deck: whichever note is nearest the center is the focused one.
  const deck = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const onDeckScroll = () => {
    const ul = deck.current;
    if (!ul) return;
    // li.offsetLeft is measured from the list (it's `relative`), in scroll coordinates
    const mid = ul.scrollLeft + ul.clientWidth / 2;
    const dist = (el: Element) => Math.abs((el as HTMLElement).offsetLeft + (el as HTMLElement).offsetWidth / 2 - mid);
    const items = Array.from(ul.children);
    const best = items.reduce((b, el, i) => (dist(el) < dist(items[b]) ? i : b), 0);
    if (best !== active) setActive(best);
  };

  const onDown = (e: RPointerEvent<HTMLButtonElement>, id: string) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const o = offsets[id] ?? { x: 0, y: 0 };
    drag.current = { id, sx: e.clientX, sy: e.clientY, ox: o.x, oy: o.y, moved: false };
    setTop((t) => [...t.filter((x) => x !== id), id]);
  };

  const onMove = (e: RPointerEvent<HTMLButtonElement>, i: number) => {
    const d = drag.current;
    if (!d || !board.current) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    d.moved = true;
    // keep the note's center on the board
    const { width, height } = board.current.getBoundingClientRect();
    const s = slot(i, experiments.length);
    const bx = (s.x / 100) * width;
    const by = (s.y / 100) * height;
    const x = Math.max(-bx + 40, Math.min(width - bx - 40, d.ox + dx));
    const y = Math.max(-by + 40, Math.min(height - by - 40, d.oy + dy));
    setOffsets((o) => ({ ...o, [d.id]: { x, y } }));
  };

  const onUp = (id: string) => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) setOpenId(id);
  };

  return (
    <div className="grid h-full w-full grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] px-[var(--gutter)] pb-3 pt-[clamp(14px,3vh,36px)]">
      <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <div>
          <p className="label text-pencil">03 / Lab</p>
          <h2 className="relative mt-1 max-w-[22ch] font-serif leading-[1.02]" style={{ fontSize: "clamp(26px, 3.6vw, 54px)" }}>
            Things I made because I thought they should{" "}
            <span className="relative inline-block">
              exist
              <Underline className="absolute -bottom-1 left-0 h-3 w-full text-hat" animate />
            </span>
            .
          </h2>
        </div>
        <div className="hidden items-center gap-4 md:flex short:hidden">
          <p className="font-hand text-xl text-pencil">drag them around · click one to read it</p>
          {Object.keys(offsets).length > 0 && (
            <button onClick={() => setOffsets({})} className="font-mono text-xs uppercase tracking-[0.14em] text-hat-deep hover:underline">
              tidy up
            </button>
          )}
        </div>
      </header>

      {/* desktop: a desk of loose notes */}
      <div ref={board} className="relative mt-2 hidden min-h-0 md:block short:hidden" aria-label="Experiments board">
        <Squiggle className="absolute bottom-[4%] left-[1%] h-14 w-14 text-hat/70" />
        {experiments.map((e, i) => {
          const s = slot(i, experiments.length);
          const o = offsets[e.id] ?? { x: 0, y: 0 };
          const z = top.indexOf(e.id) + 1;
          return (
            <button
              key={e.id}
              onPointerDown={(ev) => onDown(ev, e.id)}
              onPointerMove={(ev) => onMove(ev, i)}
              onPointerUp={() => onUp(e.id)}
              onPointerCancel={() => (drag.current = null)}
              onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), setOpenId(e.id))}
              aria-haspopup="dialog"
              aria-label={`${e.name}: ${e.what}`}
              className={`paper-shadow absolute w-[clamp(170px,15.5vw,250px)] cursor-grab touch-none select-none px-4 pb-4 pt-4 text-left transition-shadow hover:shadow-lg active:cursor-grabbing ${tone[e.color]} ${
                e.status === "open slot" ? "rough-dashed !bg-transparent shadow-none" : ""
              }`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                zIndex: z,
                transform: `translate(-50%, -50%) translate(${o.x}px, ${o.y}px) rotate(${s.rot}deg)`,
              }}
            >
              <NoteFace e={e} />
            </button>
          );
        })}
      </div>

      {/* mobile: the same notes as a swipeable deck, one focused card at a time */}
      <div className="flex min-h-0 flex-col md:hidden short:flex">
        <p className="mt-1 font-hand text-lg text-pencil">swipe → tap one to read it</p>
        {/* --card sets the focused note's width; --deck-gap leaves just a sliver of the next note visible.
            The ::before/::after spacers let the first and last notes snap to center. */}
        <ul
          ref={deck}
          onScroll={onDeckScroll}
          aria-label="Experiments"
          className="no-scrollbar relative -mx-[var(--gutter)] flex min-h-0 flex-1 snap-x snap-mandatory items-center gap-[var(--deck-gap)] overflow-x-auto overscroll-x-contain py-4 short:py-2 [--card:min(74vw,300px)] [--deck-gap:clamp(12px,4vw,20px)] before:w-[calc(50%-var(--card)/2-var(--deck-gap))] before:shrink-0 before:content-[''] after:w-[calc(50%-var(--card)/2-var(--deck-gap))] after:shrink-0 after:content-['']"
        >
          {experiments.map((e, i) => (
            <li key={e.id} className="w-[var(--card)] shrink-0 snap-center snap-always">
              <button
                onClick={() => setOpenId(e.id)}
                aria-haspopup="dialog"
                aria-label={`${e.name}: ${e.what}`}
                className={`paper-shadow relative w-full px-5 pb-5 pt-5 text-left transition-[transform,opacity] duration-200 ${tone[e.color]} ${
                  e.status === "open slot" ? "rough-dashed !bg-transparent shadow-none" : ""
                } ${i === active ? "" : "opacity-60"}`}
                style={{ transform: `rotate(${slot(i, experiments.length).rot}deg) scale(${i === active ? 1 : 0.92})` }}
              >
                <NoteFace e={e} />
                <p className="mt-3 font-serif text-[15px] leading-snug short:hidden">{e.what}</p>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center gap-3 pt-1" aria-hidden>
          <span className="font-mono text-[11px] text-pencil">
            {String(active + 1).padStart(2, "0")} / {String(experiments.length).padStart(2, "0")}
          </span>
          <span className="flex gap-1.5">
            {experiments.map((e, i) => (
              <span key={e.id} className={`h-1.5 rounded-full transition-all ${i === active ? "w-4 bg-hat" : "w-1.5 bg-ink/25"}`} />
            ))}
          </span>
        </div>
      </div>

      {opened && <Drawer e={opened} onClose={close} navigate={navigate} />}
    </div>
  );
}

function Drawer({ e, onClose, navigate }: { e: Experiment; onClose: () => void; navigate: Navigate }) {
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div className="absolute inset-0 z-40" role="dialog" aria-modal="true" aria-labelledby="lab-drawer-title">
      <button aria-label="Close" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default bg-ink/10" />
      <div className="drawer-in grid-paper absolute inset-x-0 bottom-0 flex max-h-[85%] flex-col border-t-[1.5px] border-ink px-6 pb-6 pt-5 md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[min(420px,40vw)] md:border-l-[1.5px] md:border-t-0">
        <div className="flex items-start justify-between gap-4">
          <Stamp status={e.status} />
          <button ref={closeBtn} onClick={onClose} className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-ink">
            close ✕
          </button>
        </div>
        <h3 id="lab-drawer-title" className="mt-3 font-hand leading-none" style={{ fontSize: "clamp(36px, 3.4vw, 52px)" }}>
          {e.name}
        </h3>
        <p className="mt-2 font-serif text-lg italic text-ink-soft">because {e.because}</p>
        <p className="mt-4 font-serif text-xl leading-snug">{e.what}</p>

        <div className="panel-scroll mt-4 min-h-0 flex-1">
          {e.details.length > 0 && (
            <ul className="space-y-2">
              {e.details.map((d) => (
                <li key={d} className="flex gap-2 font-serif text-[16px] leading-snug text-ink-soft">
                  <span className="text-hat-deep">→</span>
                  {d}
                </li>
              ))}
            </ul>
          )}
          {e.stack && (
            <p className="mt-5 font-mono text-xs leading-relaxed text-pencil">
              <span className="mr-2 font-hand text-lg text-ink-soft">made with:</span>
              {e.stack.join(" · ")}
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {e.caseStudy && (
            <button
              onClick={() => navigate({ view: "work", study: e.caseStudy, section: "overview" })}
              className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-hat-deep"
            >
              read the case study <Arrow className="h-4 w-6" />
            </button>
          )}
          {e.link && (
            <a href={e.link.href} target="_blank" rel="noreferrer" className="rough px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:bg-sticky-blue">
              {e.link.label} ↗
            </a>
          )}
          {e.status === "open slot" && (
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Something that should exist")}`}
              className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-paper hover:bg-hat-deep"
            >
              tell me about it <Arrow className="h-4 w-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
