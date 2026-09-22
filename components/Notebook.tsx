"use client";

import { useCallback, useEffect, useState } from "react";
import { views } from "@/data/profile";
import type { ViewId } from "@/data/types";
import { formatHash, parseHash, type Route } from "@/lib/route";
import { TopTabs, BottomTabs, FooterLinks } from "./Nav";
import { HomeView } from "./views/HomeView";
import { WorkView } from "./views/WorkView";
import { LabView } from "./views/LabView";
import { ExperienceView } from "./views/ExperienceView";
import { AboutView } from "./views/AboutView";

export type Navigate = (r: Route) => void;

/**
 * The whole site is one fixed canvas. Views are states, not pages:
 * the URL hash mirrors the state so links, refresh and the back button still work.
 */
export function Notebook() {
  const [route, setRoute] = useState<Route>({ view: "home" });

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const navigate = useCallback<Navigate>((r) => {
    const hash = formatHash(r);
    if (window.location.hash !== hash) window.location.hash = hash;
    else setRoute(r);
  }, []);

  // 1–5 jump between views (ignored while typing or with modifiers).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [contenteditable]")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= views.length) navigate({ view: views[n - 1].id });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const go = (view: ViewId) => navigate({ view });

  // Key per view so each state change re-runs the entry animation.
  const viewKey = route.view === "work" ? `work-${route.study ?? "index"}` : route.view;

  return (
    <div className="fixed inset-0 flex h-[100dvh] w-screen flex-col overflow-hidden">
      <a
        href="#main"
        className="label sr-only z-50 bg-paper px-3 py-2 focus:not-sr-only focus:absolute focus:left-2 focus:top-2"
      >
        Skip to content
      </a>
      <TopTabs active={route.view} onSelect={go} />

      <main id="main" className="relative min-h-0 flex-1" aria-live="polite">
        <div key={viewKey} className="view-in absolute inset-0" role="tabpanel" aria-label={route.view}>
          {route.view === "home" && <HomeView onGo={go} />}
          {route.view === "work" && <WorkView route={route} navigate={navigate} />}
          {route.view === "lab" && <LabView navigate={navigate} />}
          {route.view === "experience" && <ExperienceView navigate={navigate} />}
          {route.view === "about" && <AboutView />}
        </div>
      </main>

      <FooterLinks />
      <BottomTabs active={route.view} onSelect={go} />
    </div>
  );
}
