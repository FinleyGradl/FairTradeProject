# FairFind — Fair Trade Store Finder

A location-aware directory of fair-trade stores. Discover shops and products, save favorites, and explore on an interactive map.

**Prototype status:** Phases 0–2 implemented (scaffold, read-only directory, map & location). Auth, add-store wizard, claims, and moderation are stubbed for future phases.

## Quick start

```bash
# Install dependencies
pnpm install   # or: npm install

# Set up database and seed 10 Berlin stores
cp .env.example .env
pnpm db:push
pnpm db:seed

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's included

| Feature | Status |
|---------|--------|
| Landing page with hero search | ✅ |
| Explore page (list + map split view) | ✅ |
| Store detail pages (hours, reviews, products) | ✅ |
| Unified search (stores + products) | ✅ |
| Geolocation + distance filtering | ✅ |
| Interactive map (Leaflet + OpenStreetMap) | ✅ |
| Category & fair-trade badge filters | ✅ |
| Save stores (localStorage prototype) | ✅ |
| Share buttons (Web Share API) | ✅ |
| SEO JSON-LD on store pages | ✅ |
| Add store wizard | 🔲 stub |
| Auth (Google / email) | 🔲 Phase 3 |
| Claim store flow | 🔲 stub |
| Image upload | 🔲 Phase 4 |

## Tech stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** — sage green / cream design system
- **Prisma** + SQLite (local) / PostgreSQL + PostGIS (production via Docker)
- **Leaflet** + OpenStreetMap — no API key required
- **Zod** — request validation

## Project structure

```
src/
├── app/
│   ├── page.tsx              # Landing
│   ├── explore/              # List + map
│   ├── search/               # Unified search
│   ├── stores/[slug]/        # Store detail
│   ├── add-store/            # Stub wizard
│   ├── claim/[storeSlug]/    # Stub claim flow
│   ├── me/saved/             # Saved stores
│   └── api/v1/               # REST API
├── components/
│   ├── store/                # StoreCard, RatingStars, etc.
│   ├── map/                  # Leaflet map
│   ├── search/               # SearchBar, FilterPanel
│   └── ui/                   # Button, Card, Badge, Input
└── lib/
    ├── stores.ts             # Data access layer
    ├── geo.ts                # Haversine distance
    └── hours.ts              # Open/closed logic
```

## API endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/stores?lat&lng&radius&category&badge&q` | List stores |
| GET | `/api/v1/stores/:slug` | Store detail |
| GET | `/api/v1/products?q&category&store_id` | Search products |

## Database

**Local (default):** SQLite via `DATABASE_URL="file:./dev.db"` — zero config.

**Production:** PostgreSQL + PostGIS:

```bash
docker compose up -d db
# Update DATABASE_URL in .env to postgresql://fairtrade:fairtrade@localhost:5432/fairtrade
# Switch prisma/schema.prisma provider to "postgresql"
pnpm db:push && pnpm db:seed
```

## Seed data

10 fair-trade stores across Berlin neighborhoods with products, reviews, and opening hours. Run `pnpm db:seed` to reset.

## Design

- **Colors:** Sage green `#4A7C59`, cream `#FAF7F2`, earth brown `#5C4033`
- **Font:** DM Sans
- **Mobile:** Bottom navigation bar

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

Private — prototype for FairTradeProject.
