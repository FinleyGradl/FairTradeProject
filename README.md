# FairFind — Fair Trade Store Finder

A location-aware directory of fair-trade stores. Discover shops and products,
save favorites, explore on an interactive map, and — if you run a store —
claim, manage, and promote it.

**Status:** Feature-complete beyond the original prototype scope. Auth,
store management (claim/edit/transfer), community moderation, sponsoring
(paid placement via Mollie), and admin tooling are all implemented and wired
up end to end — this is well past "read-only directory."

## Quick start

```bash
# Install dependencies
pnpm install   # or: npm install

# Set up database and seed 10 Berlin stores
cp .env.example .env   # see "Environment variables" below for what to fill in
pnpm db:push
pnpm db:seed

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

| Area | Feature | Status |
|---|---|---|
| **Discovery** | Landing page, explore (list + map split view), unified search | ✅ |
| | Geolocation + distance filtering, category & fair-trade badge filters | ✅ |
| | Interactive map (Leaflet + OpenStreetMap, no API key needed) | ✅ |
| | Category landing pages (`/kategorie/*`), SEO JSON-LD, sitemap/robots | ✅ |
| **Accounts** | Auth: email/password (Credentials) + Google OAuth | ✅ |
| | Email verification, forgot/reset password, profile & avatar management | ✅ |
| | Account deletion (with email confirmation) | ✅ |
| **Stores** | Add-store wizard, claim flow, suggest-edit flow with community voting | ✅ |
| | Store editing, photo gallery uploads, opening hours, products | ✅ |
| | Ownership transfer between users (invite → accept/decline) | ✅ |
| | Community attestation (confirm/dispute → verification level) | ✅ |
| **Engagement** | Reviews with owner replies, ratings, report/flag flow | ✅ |
| | Save stores (server-side, per-account) | ✅ |
| | Save individual products | 🔲 schema exists (`SavedProduct`), no API/UI yet |
| **Monetization** | Sponsoring tiers via Mollie (subscriptions, webhooks, promo codes) | ✅ |
| | Owner insights dashboard (page views, search impressions) | ✅ |
| **Trust & Safety** | Moderation queues (stores, claims, reviews, photos, suggested edits) | ✅ |
| | Trust score system, audit log | ✅ |
| **Admin** | User management (roles), promo codes, audit log viewer, bulk store import | ✅ |
| **Notifications** | Owner notified of new reviews / claim decisions / suggestion outcomes | 🔲 not built (see "Known gaps") |
| **i18n / a11y** | Multi-language support, dark mode | 🔲 not built |
| **Ops** | Automated tests, CI pipeline, error tracking (Sentry etc.) | 🔲 not built |

## Tech stack

- **Next.js 15** (App Router) + TypeScript, React 19
- **Tailwind CSS** — sage green / cream design system
- **Prisma 7** + SQLite (local) / PostgreSQL (production, via Docker)
- **NextAuth 5 (beta)** — Credentials + Google OAuth, JWT sessions
- **Leaflet** + OpenStreetMap — no API key required
- **Mollie** — subscription billing for store sponsoring
- **Zod** — request validation
- **Nodemailer** — transactional email (verification, password reset, transfers)

No test runner, CI config, or error-tracking SDK is set up yet — see "Known
gaps" below.

## Project structure

```
src/
├── app/
│   ├── page.tsx                    # Landing
│   ├── explore/                    # List + map
│   ├── search/                     # Unified search
│   ├── kategorie/[slug]/           # Category landing pages
│   ├── stores/[slug]/              # Store detail, edit, suggest-edit
│   ├── add-store/                  # Add-store wizard
│   ├── claim/[storeSlug]/          # Claim flow
│   ├── transfers/[token]/          # Ownership transfer accept/decline
│   ├── me/                         # Account area: saved, own stores, settings,
│   │                                # per-store insights & sponsoring
│   ├── admin/                      # Users, moderation, promo codes, audit log
│   └── api/
│       ├── auth/                   # Register, verify-email, forgot/reset password
│       ├── v1/                     # REST API (stores, reviews, photos, claims, ...)
│       ├── admin/                  # Admin-only endpoints
│       └── webhooks/mollie/        # Sponsorship payment webhooks
├── components/
│   ├── store/                      # StoreCard, forms, galleries, badges, ...
│   ├── moderation/                 # Moderation queues
│   ├── admin/                      # Admin dashboards
│   ├── map/, search/, auth/, profile/, insights/, sponsoring/, claim/
│   └── ui/                         # Button, Card, Badge, Input, Skeleton, ...
└── lib/
    ├── stores.ts, edit-suggestions.ts, ownership-transfer.ts, sponsorship.ts
    ├── trust.ts, audit.ts, promo-codes.ts
    ├── auth/, email/, validators/
    ├── geo.ts, hours.ts, uploads.ts, rate-limit.ts
    └── db.ts, utils.ts, constants.ts
```

## Environment variables

There is no `.env.example` checked in yet — these are the variables the app
reads (`grep -rhoE "process\.env\.[A-Z_]+" src/` is the source of truth if
this list drifts):

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | ✅ | Postgres (prod) or SQLite (`file:./dev.db`, local) connection string |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public base URL, used in emails, OG tags, sitemap |
| `AUTH_SECRET` | ✅ | NextAuth session encryption secret (`npx auth secret`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | for Google login | OAuth app credentials |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` | for outgoing email | Verification, password reset, transfer emails |
| `MOLLIE_API_KEY` | for sponsoring | Mollie payments/subscriptions |
| `IMPORT_API_TOKEN` | for bulk import | Protects `/api/v1/admin/import/stores` |
| `ENABLE_PROMO_CODES` | optional | Enables the hardcoded dev promo code at checkout |
| `DISABLE_EXTERNAL_GEOIP` | optional | Skips the external GeoIP lookup in `lib/geo-ip.ts` |

## Database

**Local (default):** SQLite via `DATABASE_URL="file:./dev.db"` — zero config.

**Production:** PostgreSQL:

```bash
docker compose up -d db
# Update DATABASE_URL in .env to postgresql://fairtrade:fairtrade@localhost:5432/fairtrade
# Switch prisma/schema.prisma provider to "postgresql"
pnpm db:push && pnpm db:seed
```

## Seed data

10 fair-trade stores across Berlin neighborhoods with products, reviews, and
opening hours. Run `pnpm db:seed` to reset.

## Rate limiting

Auth endpoints (register, login, forgot-password, resend-verification,
reset-password) are rate-limited via an in-memory fixed-window limiter —
see `src/lib/rate-limit.ts`. This works for the current single-instance
Docker deployment; if the app is ever scaled to multiple instances, swap it
for a shared store (Redis / Upstash Ratelimit) since in-memory state doesn't
sync across processes.

## Loading & error states

Routes that do server-side data fetching (store detail, category pages,
saved stores, my stores, public profile) have route-level `loading.tsx`
skeletons and `error.tsx` boundaries; everything else falls back to the
global ones in `src/app/loading.tsx` / `src/app/error.tsx`.

## Design

- **Colors:** Sage green `#4A7C59`, cream `#FAF7F2`, earth brown `#5C4033`
- **Font:** DM Sans
- **Mobile:** Bottom navigation bar
- No dark mode yet — `globals.css` only defines the light-mode tokens.

## Known gaps

Things that are either half-built or not started, roughly in the order
they're worth tackling:

- **Notifications** — no `Notification` model and no emails for "new review
  on your store", "your claim was approved/rejected", or "your suggested
  edit was approved/rejected". Owners currently have to check the dashboard
  manually to find out anything happened.
- **Saved products** — `SavedProduct` exists in the Prisma schema but has no
  API route or UI; only whole stores can be saved right now. Either finish
  the feature or drop the model.
- **Tests** — no Jest/Vitest/Playwright setup, despite non-trivial business
  logic in `sponsorship.ts`, `ownership-transfer.ts`, `edit-suggestions.ts`,
  and `trust.ts` that would benefit from regression coverage.
- **CI** — no `.github/workflows`; lint/typecheck/build only run locally.
- **Error tracking** — no Sentry (or equivalent); `console.error` is the
  only signal today, including in the new global `error.tsx`.
- **Accessibility** — sparse `aria-*` coverage outside a handful of
  components; worth an audit pass.
- **i18n / dark mode** — German-only UI, light-mode-only design tokens.

## Production Deployment & Hosting

### Option A: Hosting on Vercel (Recommended for Next.js)

1. **Database Setup**: Provision a PostgreSQL database (e.g. [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres).
2. **Environment Variables**:
   ```env
   DATABASE_URL="postgresql://user:pass@ep-host.region.aws.neon.tech/fairtrade?sslmode=require"
   NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
   ```
3. **Prisma Provider**: In `prisma/schema.prisma`, update `datasource db` provider to `"postgresql"`.
4. **Deploy**:
   ```bash
   npx vercel
   ```
5. **Database Migration & Seeding**:
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

### Option B: Container Deployment (Docker / Railway / Fly.io / GCP Cloud Run)

Build and run using the included multi-stage `Dockerfile`:

```bash
# Build production Docker image
docker build -t fairfind:latest .

# Run container
docker run -p 3000:3000 -e DATABASE_URL="file:./dev.db" fairfind:latest
```

### Health Check Endpoint

Monitor deployment status and database connectivity via `/api/health`:
- `GET /api/health` -> Returns `200 OK` with status `ok` and `database: connected`.

## License

Private — FairTradeProject.