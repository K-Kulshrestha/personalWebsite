import type { ReactNode } from "react";
import { Tape } from "./Scribbles";

const tones = {
  sticky: "bg-sticky",
  blue: "bg-sticky-blue",
  paper: "bg-paper-2",
  white: "bg-white",
} as const;

export function StickyNote({
  children,
  tone = "sticky",
  tilt = -1.5,
  tape = true,
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  tilt?: number;
  tape?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`paper-shadow relative ${tones[tone]} ${className}`}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {tape && <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-[-4deg]" />}
      {children}
    </div>
  );
}
