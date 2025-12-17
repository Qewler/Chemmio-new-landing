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
- Expected variable: `GEMINI_API_KEY`
## Findings (Important)
1. **Client-side secret exposure risk**
   - `vite.config.ts` inlines `env.GEMINI_API_KEY` into the client bundle via `define` as `process.env.API_KEY` / `process.env.GEMINI_API_KEY`.
   - `components/ParallaxShowcase.tsx` reads `process.env.API_KEY` and calls Gemini from the browser.
   - Any API key shipped to the browser is effectively public; treat it as compromised for production. Prefer a server-side proxy (or remove the feature for static deployments).
2. **Dependency/version mismatch risk**
   - `index.html` includes an `importmap` pointing to React `18.2.0`, while `package.json` depends on React `^19.2.3`. This can create confusing runtime behavior depending on how modules are resolved.
3. **Runtime Tailwind**
   - Tailwind is loaded from `https://cdn.tailwindcss.com` (no local Tailwind build). This is fine for prototypes, but adds a runtime dependency and can complicate CSP / offline builds.
See `AGENTS.md`.