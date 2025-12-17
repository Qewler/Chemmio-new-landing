# Chemmio New Landing — Agent Notes
## Tech Stack
- Vite 6 + React + TypeScript (ESM)
- UI: Tailwind via CDN (see `index.html`), animations via `framer-motion`, icons via `lucide-react`
- AI: `@google/genai` (Gemini) used client-side in `components/ParallaxShowcase.tsx`
## Project Layout
- Entry: `index.html`, `index.tsx`, `App.tsx`
- UI sections: `components/*.tsx`
## Local Dev
- Install: `npm install`
- Run: `npm run dev` (Vite dev server on `http://0.0.0.0:3000`)
- Build: `npm run build`
- Preview: `npm run preview`
## Environment / Secrets
- Local env file: `.env.local` (ignored by git via `*.local`)
- Optional variable (client-exposed): `VITE_GEMINI_API_KEY`
## Findings (Important)
1. **Client-side secret exposure risk**
   - `components/ParallaxShowcase.tsx` can read `import.meta.env.VITE_GEMINI_API_KEY` and call Gemini from the browser.
   - Any API key shipped to the browser is effectively public; treat it as compromised for production. Prefer a server-side proxy (or remove the feature for static deployments).
2. **Runtime Tailwind**
   - Tailwind is loaded from `https://cdn.tailwindcss.com` (no local Tailwind build). This is fine for prototypes, but adds a runtime dependency and can complicate CSP / offline builds.
See `AGENTS.md`.
