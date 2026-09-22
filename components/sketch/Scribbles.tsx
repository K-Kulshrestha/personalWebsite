// Hand-drawn marks, all in code. Each one scales to its container and
// uses currentColor, so color comes from the parent's text color.

type Props = { className?: string; strokeWidth?: number; animate?: boolean };

const base = (animate?: boolean, len = 400) =>
  animate ? { className: "draw", style: { ["--len" as string]: len } } : {};

export function Underline({ className = "", strokeWidth = 3, animate }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 14" preserveAspectRatio="none" fill="none" aria-hidden>
      <path
        d="M2 9 C 40 4, 80 11, 118 6 S 176 4, 198 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...base(animate, 220)}
      />
    </svg>
  );
}

export function Wave({ className = "", strokeWidth = 3 }: Props) {
  return (
    <svg className={className} viewBox="0 0 120 16" fill="none" aria-hidden>
      <path
        d="M2 10 C 12 2, 20 2, 30 9 S 48 16, 58 8 S 76 1, 88 9 S 106 15, 118 6"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Loose ellipse, drawn slightly past its start like a real pen circle. */
export function Circle({ className = "", strokeWidth = 2, animate }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 80" preserveAspectRatio="none" fill="none" aria-hidden>
      <path
        d="M30 14 C 70 2, 160 4, 190 26 C 206 44, 170 72, 100 75 C 40 78, 4 62, 8 40 C 11 22, 50 10, 110 8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...base(animate, 560)}
      />
    </svg>
  );
}

/** Curved arrow. `dir` rotates it; draw it pointing right by default. */
export function Arrow({
  className = "",
  strokeWidth = 2,
  flip,
  animate,
}: Props & { flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 60"
      fill="none"
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M4 48 C 22 18, 56 10, 90 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...base(animate, 120)}
      />
      <path d="M78 8 L 92 18 L 78 28" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Squiggle({ className = "", strokeWidth = 2 }: Props) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden>
      <path
        d="M8 30 C 8 12, 30 10, 30 26 C 30 38, 14 40, 18 28 C 22 16, 48 14, 50 32 C 52 46, 36 52, 30 44"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Star({ className = "", strokeWidth = 2 }: Props) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 4 L 23 16 L 36 18 L 25 24 L 28 36 L 20 28 L 11 36 L 14 24 L 4 18 L 17 16 Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A small strip of tape for pinning notes. */
export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute block h-4 w-14 bg-[rgba(46,196,214,0.28)] ${className}`}
      style={{ clipPath: "polygon(3% 0, 97% 6%, 100% 100%, 0 92%)" }}
    />
  );
}
