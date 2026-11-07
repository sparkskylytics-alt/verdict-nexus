# Verdict Nexus - Sanity Studio

Project `urj7gol0`, dataset `production`.

- `npm run dev` - run the Studio locally (log in with your Sanity account)
- `npm run deploy` - host it at https://verdict-nexus.sanity.studio
- `SANITY_TOKEN=... npm run seed` - re-import the default content from `scripts/seed-data.json` (overwrites edits!)

The website reads content via `/sanity-api/*` (proxied to the Sanity CDN, see `vercel.json`).
