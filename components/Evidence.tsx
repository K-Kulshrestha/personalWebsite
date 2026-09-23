"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ExtLink, Figure } from "@/data/types";
import { Tape } from "./sketch/Scribbles";

/**
 * A real photo or screenshot, shown as a small taped print. The print's height is
 * set by the caller (so it can fit the fixed canvas); width follows the aspect ratio.
 * Clicking opens the full image in a lightbox; the caption stays visible either way.
 */
export function Print({
  figure,
  height,
  tilt = 0,
  tape = true,
  className = "",
}: {
  figure: Figure;
  /** Any CSS length, e.g. "clamp(120px, 24vh, 260px)", or "auto" to fill the available width. */
  height: string;
  tilt?: number;
  tape?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const aspect = figure.crop ?? figure.width / figure.height;
  const fluid = height === "auto";

  return (
    <figure className={`relative max-w-full shrink-0 ${fluid ? "w-full" : "w-min"} ${className}`} style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Enlarge image: ${figure.alt}`}
        className={`paper-shadow group relative block max-w-full bg-white p-[5px] transition-transform duration-150 hover:-translate-y-0.5 ${fluid ? "w-full" : ""}`}
        style={{ height, aspectRatio: String(aspect) }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={figure.thumb ?? figure.src}
          alt=""
          width={figure.width}
          height={figure.height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-full w-full select-none object-cover"
          style={figure.position ? { objectPosition: figure.position } : undefined}
        />
        <span
          aria-hidden
          className="absolute bottom-2 right-2 bg-paper/90 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          enlarge ⤢
        </span>
      </button>
      {tape && <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-[-3deg]" />}
      {figure.caption && (
        <figcaption className="mt-1.5 min-w-[14ch] font-hand leading-[1.1] text-ink-soft" style={{ fontSize: "clamp(15px, 1.15vw, 19px)" }}>
          {figure.caption}
        </figcaption>
      )}
      {open && <Lightbox figure={figure} onClose={close} />}
    </figure>
  );
}

/** Full-size view. Captures keys while open so Esc/arrows don't also drive the page behind it. */
function Lightbox({ figure, onClose }: { figure: Figure; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // the close button is the only control, so focus stays on it
        e.preventDefault();
        closeBtn.current?.focus();
        return;
      }
      e.stopImmediatePropagation();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      prev?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={figure.caption ?? figure.alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-4"
    >
      <figure onClick={(e) => e.stopPropagation()} className="view-in flex max-h-full flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          className="paper-shadow h-auto max-h-[calc(100dvh-120px)] w-auto max-w-[min(92vw,1400px)] bg-white object-contain p-2"
        />
        {figure.caption && <figcaption className="mt-2 max-w-[60ch] text-center font-hand text-xl leading-tight text-paper">{figure.caption}</figcaption>}
      </figure>
      <button
        ref={closeBtn}
        onClick={onClose}
        className="rough absolute right-4 top-4 bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink hover:bg-sticky-blue"
      >
        close ✕
      </button>
    </div>,
    document.body,
  );
}

/** Optional rabbit holes: small outlined links, never big CTAs. */
export function ExtLinks({ links, className = "" }: { links: ExtLink[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map((l, i) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${i % 2 ? "rough-2" : "rough"} inline-block bg-paper px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink hover:bg-sticky-blue`}
          >
            {l.label} <span aria-hidden>↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
