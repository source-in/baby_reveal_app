# Our Little Star

A mobile-first, story-style gender reveal web app for Mom & Dad.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · [Motion](https://motion.dev) for animations.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Dev shortcuts: `?screen=3` jumps straight to a screen (0-based), `?message=0` opens a star message.
Arrow keys and horizontal swipes also move between screens.

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | **All copy**: letter, star messages, the 8 prediction questions and their answers, survival kit |
| `lib/assets.ts` | Every image the app uses: screen backgrounds, star portraits, message portraits, interview cards and icons (the Mom / Dad quiz tiles are still emoji) |
| `public/images/` | The painted artwork. `cutouts/` holds the Survival Kit icons with their background removed |
| `scripts/cutout-icons.mjs` | Regenerates the Survival Kit icons in `cutouts/` — run after changing one |
| `scripts/cutout-stars.mjs` | Cuts the painted star portraits (`star_3`, `star_4`) out of their backgrounds into `cutouts/` — run after changing one |
| `components/screens/index.ts` | Screen order, background image, theme, and whether each shows dots / next arrow |
| `components/screens/*.tsx` | One file per screen |
| `components/MessageModal.tsx` | The "A message from…" card opened from the stars screen |
| `components/Story.tsx` | Navigation state, page transitions, background preloading |
| `components/motion.tsx` | Reusable animations: `FadeUp`, `Float`, `Pulse`, `Glow`, `HeartBurst`, `FloatingHearts` |
| `components/art.tsx` | SVG bits: stars, twinkles, shooting stars, hearts, envelopes |
| `components/ui.tsx` | Screen shell, painted background (slow zoom), titles, buttons, page dots |
| `app/globals.css` | Colour palette, fonts, twinkle / shooting-star keyframes |

Animations respect the device's "reduce motion" setting.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — no configuration needed.
