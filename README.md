# ClentIndustries

Terminal-style website built with React, Vite and TypeScript.

## Run
    npm install
    npm run dev        # local dev server
    npm run build      # typecheck + production build in /dist
    npm run preview    # preview the production build

## Maintenance mode
Set `VITE_MAINTENANCE_MODE=true` in `.env.local` to show the maintenance page instead of the site. Set it to `false` to restore the site; restart the dev server after changing the value.

## Where to edit
| What | File |
| --- | --- |
| Site name, tagline, mission, nav, contact links | `src/config/site.ts` |
| Downloads (add new software here) | `src/data/downloads.ts` |
| Software and web portfolio | `src/data/projects.ts` |
| Colors, sizes | `src/styles/tokens.css` |
| Terminal commands | `src/components/terminal/commands.ts` |

## Adding a download
1. Copy the file to `public/downloads/` (e.g. `EduAutomata-Setup.exe`).
2. Add or edit an entry in `src/data/downloads.ts`. Home and Downloads update automatically.
3. The download endpoint and counts use the entry's `id` and `fileUrl`; no per-software counter code is needed.

## Download counts (Cloudflare Pages)
Download starts are counted atomically per software in Cloudflare D1 immediately before the site starts an installer download. This records requests, not confirmed completed downloads or unique people. The Home page shows the featured software's total, and the Downloads page shows each software's total.

1. Create a D1 database named `clent-industries-download-counts` with `npx wrangler d1 create clent-industries-download-counts`.
2. Replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.toml` with the database ID returned by Wrangler.
3. Apply the schema with `npx wrangler d1 migrations apply clent-industries-download-counts --remote`.
4. Deploy the Pages project using this Wrangler configuration, or add a Cloudflare Pages D1 binding named `DOWNLOAD_COUNTS` pointing to this database. The binding name must match exactly.

The migration is in `migrations/`, so it can also be applied locally with `npx wrangler d1 migrations apply clent-industries-download-counts --local`. To inspect totals in the Cloudflare D1 console, run:

```sql
SELECT software_id, download_count, last_download_at
FROM download_counts
ORDER BY download_count DESC;
```

If the D1 binding is not configured, installer downloads still proceed, while the pages show that totals are unavailable and the function logs the tracking configuration error.

## Adding a project
Add an entry in `src/data/projects.ts` with `discipline: 'software'` or `discipline: 'web'`. Web projects include `websiteUrl` and `currentPage` fields for the live site and the page to feature.

## Deploying (Cloudflare Pages)
Build command `npm run build`, output directory `dist`. Single-page-app routing works by default.
Files over 25 MB cannot be hosted on Cloudflare Pages; use R2 or GitHub Releases and set `fileUrl` to that link.
