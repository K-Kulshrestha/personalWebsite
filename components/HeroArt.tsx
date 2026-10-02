"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

/**
 * The hero illustration: /public/hero.svg, byte for byte as supplied.
 *
 * It's embedded with <object> rather than <img> so the page can reach the two
 * vector `.iris` groups inside it (same origin), while the SVG stays its own
 * document: its ids, classes and keyframes can't leak into the page and its own
 * CSS animations (hat cycle, blinking, reduced-motion rules) run untouched.
 *
 * Eyes: both irises get a neutral correction so they sit centred in their eye
 * openings. On devices with a fine pointer they then follow the cursor. Only the
 * iris groups move; each is clipped by its eye shape inside the SVG, and the
 * travel is capped well within the opening. All movement uses the CSS
 * `translate` property, which composes with the SVG's own `transform` animations.
 */

const SVG_W = 1536; // viewBox width (height 1024, so 3:2 like the box it sits in)
// Midpoint between the two eyes, in SVG units: the point the gaze is measured from.
const FACE = { x: 816, y: 511 };
// Per-eye neutral correction (SVG units): moves each iris to the centre of its opening.
const NEUTRAL = [
  { x: -10, y: 0 }, // left eye: opening centre ≈ 757, iris drawn at 767
  { x: -7.75, y: 0 }, // right eye: opening centre ≈ 874, iris drawn at 882
];
// The far (right) eye is drawn smaller, so it travels a little less.
const TRAVEL = [1, 0.88];
const MAX_X = 7; // horizontal reach in SVG units (opening half-width minus iris radius ≈ 14)
const MAX_Y = 2.5; // vertical reach (the openings are shallow)
const REACH = 520; // cursor distance (SVG units) at which the eyes reach full travel
const TILT = (-10 * Math.PI) / 180; // the head is tilted; movement follows the eye line
const EASE_MS = 110; // smoothing time constant

export function HeroArt({ className = "" }: { className?: string }) {
  const { src, alt, width, height } = profile.hero;
  const obj = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    const el = obj.current;
    if (!el) return;
    let teardown: (() => void) | undefined;

    const setup = () => {
      teardown?.();
      const irises = Array.from(el.contentDocument?.querySelectorAll<SVGGElement>(".iris") ?? []);
      if (irises.length !== 2) return; // unexpected artwork: leave it exactly as drawn

      const place = (ox: number, oy: number) =>
        irises.forEach((g, i) => {
          g.style.translate = `${NEUTRAL[i].x + ox * TRAVEL[i]}px ${NEUTRAL[i].y + oy * TRAVEL[i]}px`;
        });
      place(0, 0);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (reduce.matches || !finePointer.matches) {
        // Static neutral gaze. (On touch the SVG's own hat-glance animation still plays around it.)
        teardown = () => irises.forEach((g) => (g.style.translate = ""));
        return;
      }

      // Cursor tracking replaces the built-in glance animation.
      irises.forEach((g) => (g.style.animation = "none"));
      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };
      let raf = 0;
      let last = 0;

      const tick = (t: number) => {
        const dt = last ? Math.min(t - last, 64) : 16;
        last = t;
        const k = 1 - Math.exp(-dt / EASE_MS);
        cur.x += (target.x - cur.x) * k;
        cur.y += (target.y - cur.y) * k;
        place(cur.x, cur.y);
        if (Math.abs(target.x - cur.x) > 0.01 || Math.abs(target.y - cur.y) > 0.01) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
          last = 0;
        }
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        const r = el.getBoundingClientRect();
        if (!r.width) return; // hidden layout variant
        const s = SVG_W / r.width;
        const dx = (e.clientX - r.left) * s - FACE.x;
        const dy = (e.clientY - r.top) * s - FACE.y;
        const d = Math.hypot(dx, dy);
        const f = d < 1 ? 0 : Math.min(d / REACH, 1) / d;
        const ex = dx * f * MAX_X; // direction × strength, squashed to the eye's ellipse
        const ey = dy * f * MAX_Y;
        target.x = ex * Math.cos(TILT) - ey * Math.sin(TILT);
        target.y = ex * Math.sin(TILT) + ey * Math.cos(TILT);
        kick();
      };
      const recenter = () => {
        target.x = 0;
        target.y = 0;
        kick();
      };
      const onOut = (e: MouseEvent) => {
        if (!e.relatedTarget) recenter(); // the cursor left the window
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("mouseout", onOut);
      window.addEventListener("blur", recenter);
      teardown = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("mouseout", onOut);
        window.removeEventListener("blur", recenter);
        irises.forEach((g) => {
          g.style.translate = "";
          g.style.animation = "";
        });
      };
    };

    // Re-run if the user flips reduced motion while the page is open.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduce.addEventListener("change", setup);
    el.addEventListener("load", setup);
    if (el.contentDocument?.readyState === "complete") setup();

    return () => {
      reduce.removeEventListener("change", setup);
      el.removeEventListener("load", setup);
      teardown?.();
    };
  }, []);

  return (
    <object
      ref={obj}
      data={src}
      type="image/svg+xml"
      role="img"
      aria-label={alt}
      width={width}
      height={height}
      className={`pointer-events-none block h-auto w-full select-none ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* fallback if <object> can't render it */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={width} height={height} className="block h-auto w-full" />
    </object>
  );
}
