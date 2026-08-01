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

## Next steps (from build plan)

1. **Phase 3** — Auth.js (Google + magic link), persistent saved stores
2. **Phase 4** — Add-store wizard, product CRUD, image upload
3. **Phase 5** — Review submission, owner replies
4. **Phase 6** — Claim approval, owner dashboard
5. **Phase 7** — Moderation queue, "open now" polish, i18n
6. **Phase 8** — Deploy to Vercel + Neon, E2E tests

## License

Private — prototype for FairTradeProject.
