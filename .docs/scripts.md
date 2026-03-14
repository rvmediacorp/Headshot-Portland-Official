# Scripts

All scripts use `pnpm`. Defined in `package.json`.

## Installing dependencies

```bash
npm install --legacy-peer-deps
```

`--legacy-peer-deps` is required because `react-day-picker@8` does not declare React 19 as a supported peer, even though it works fine with it. Without the flag, npm will abort the install.

- `pnpm dev` — Next.js dev server with hot reload at `localhost:3000`
- `pnpm build` — Production build (outputs to `.next/`)
- `pnpm start` — Runs the production server (requires `pnpm build` first)
- `pnpm lint` — Runs Next.js ESLint config across `app/`, `components/`, `hooks/`, `lib/`

## Notes

- `pnpm build` ignores ESLint errors and TypeScript errors (suppressed in `next.config.mjs`). Always run `pnpm lint` separately.
- There are no test scripts. No test framework is configured.
- There are no database migration or seed scripts — the site has no backend.
- `scripts/` directory at the repo root is empty.

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add <component-name>
```

This writes to `components/ui/`. Do not manually edit files there.
