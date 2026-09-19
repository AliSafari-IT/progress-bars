# Agent Guide — @asafarim/progress-bars

React + TypeScript progress-indicator component library. pnpm workspace: library at root,
Vite demo app in `demo/` (depends on the lib via `workspace:*`).

## Layout

- `src/components/<Name>/` — `<Name>.tsx`, `<Name>.module.css`, `index.ts`
- `src/components/index.ts` — barrel exports; add new components here
- `src/index.ts` — imports `@asafarim/design-tokens/css`, re-exports `./components`
- `demo/src/pages/` — demo pages; `demo/src/App.tsx` — routes (`basename="/progress-bars/"`)
- `scripts/release.js`, `scripts/update-readme-version.js` — release helpers

## Commands

- `pnpm run typecheck` — typecheck library (`tsc -p tsconfig.build.json --noEmit`)
- `pnpm run build` — build library to `dist/` (run this before demo builds)
- `pnpm -C demo run build` — build demo
- `pnpm run dev` — run demo dev server

## Conventions

- CSS modules + `@asafarim/design-tokens` custom properties (`--asm-*` vars with fallbacks)
- Shared `ProgressTone` union (`brand | success | warning | danger | neutral | info`)
  exported from `ProgressTrack`
- Zero runtime deps beyond `@asafarim/design-tokens`; React 18+ is a peer dep
- ARIA roles (`role="progressbar"`, `aria-valuenow/min/max`) and
  `prefers-reduced-motion` handling required on all components
- Keep `demo/src/pages/Roadmap.tsx` statuses and prop lists synced with the implementation
- Demo sections use `DemoCard` + `CodeSnippetDialog` + entries in the `codeSnippets` object

## Release

1. Bump `version` in `package.json` (semver)
2. `node scripts/update-readme-version.js`
3. Add a `CHANGELOG.md` entry (Keep a Changelog + compare link)
4. Update README docs and demo
5. `pnpm run build` and `pnpm -C demo run build` green
6. Commit → `git tag v{x.y.z}` → push `main` and the tag
7. `.github/workflows/publish.yml` publishes to npm on `v*` tags and deploys the demo
   to gh-pages on `main` and tags
8. `gh release create v{x.y.z} -R AliSafari-IT/progress-bars --latest` with release notes

## Gotchas

- Git dubious ownership on this machine: prefix commands with
  `git -c safe.directory=F:/repos/progress-bars` (do not modify git config)
- gh CLI authenticated as `AliSafari-IT` — pass `-R AliSafari-IT/progress-bars`
- npm website lags the registry — verify publishes with
  `npm view @asafarim/progress-bars dist-tags`, not npmjs.com
- npm scheduled maintenance can fail publishes with 503; rerun the failed workflow
  job after the window ends (`gh run rerun <id> --failed`)
- npm version history is nonlinear (1.x line predates current 0.x line) — check
  `npm view @asafarim/progress-bars versions` before picking a version number
