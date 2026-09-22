# personalWebsite

My portfolio, built as a **notebook with no scrolling**. Every view is one composed `100vw × 100dvh` canvas, and the page itself never scrolls. Views are states (Home, Work, Lab, Experience, About) that swap in place. The URL hash mirrors the state, so deep links and the back button still work (`#work/elmo/build`).

Built with Next.js 15 (static export), TypeScript and Tailwind CSS.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out, deployable anywhere (Vercel, Netlify, GitHub Pages…)
```

## Editing content

All copy lives in `/data`. Components only handle presentation.

| File | What it holds |
| --- | --- |
| `data/profile.ts` | name, tagline, links, the four pillars on Home, hero config |
| `data/caseStudies.ts` | case studies: Overview · Problem · Thinking · Build · Outcome · Learnings |
| `data/experiments.ts` | the Lab board ("things I made because I thought they should exist") |
| `data/experience.ts` | roles on the Experience timeline |
| `data/about.ts` | About page text, beliefs, sticky notes |

- **Add a case study:** push another object onto `caseStudies`. It shows up on the Work contents page and gets its own six-state reader. Optional `figures` (images in `/public`) render in the Build state, and `link` is also optional.
- **Add an experiment:** push onto `experiments`. The board places it automatically. Set `caseStudy` to link it to a case study.
- **Add a role:** add it to `roles` with decimal `start`/`end` years, and the timeline places it.

Each case-study section is designed to fit a laptop screen. If a section gets long, it scrolls inside its own panel as a fallback, but the best fix is to trim the copy.

## Hero illustration

`public/hero.svg` is the supplied artwork, byte for byte. Don't edit it: replace the file instead. It's rendered as an `<img>` (`components/HeroArt.tsx`), so its built-in CSS animations run untouched and its styles can't leak into the page. The name, roles and pillars on Home are HTML, laid over the areas of the art where its text was removed. If the art's composition changes, adjust `hero.nameBox` / `hero.pillarBox` in `data/profile.ts`, which are in SVG units.

## Layout system

- `html, body { overflow: hidden }`, and the app shell is `fixed inset-0`.
- Home uses CSS container queries (`.stage`, `.hero-box` in `app/globals.css`). Wide stages lay the text over the art, and tall stages (phones, portrait tablets) stack the pieces.
- Breakpoints: `md` switches to desktop compositions, and a custom `short` screen (`max-height: 520px`, e.g. landscape phones) falls back to the compact ones.
- Keyboard: `1`–`5` switch views, `← →` page through case studies and roles, `Esc` closes a case study or drawer, and arrow keys move within the tab bar.
- Motion is short and respects `prefers-reduced-motion`.
