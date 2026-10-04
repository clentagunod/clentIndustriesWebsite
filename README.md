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

## Adding a project
Add an entry in `src/data/projects.ts` with `discipline: 'software'` or `discipline: 'web'`. Web projects include `websiteUrl` and `currentPage` fields for the live site and the page to feature.

## Deploying (Cloudflare Pages)
Build command `npm run build`, output directory `dist`. Single-page-app routing works by default.
Files over 25 MB cannot be hosted on Cloudflare Pages; use R2 or GitHub Releases and set `fileUrl` to that link.
