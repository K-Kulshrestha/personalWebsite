import { profile } from "@/data/profile";

/**
 * The hero illustration: /public/hero.svg, exactly as supplied.
 * Rendered as an <img> on purpose: the SVG runs its own CSS animations
 * (hat cycle, eye glances, blinking, reduced-motion fallback) and keeps its
 * ids and styles isolated from the page. Never edit the file; replace it.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  const { src, alt, width, height } = profile.hero;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={false}
      fetchPriority="high"
      className={`block h-auto w-full select-none ${className}`}
    />
  );
}
