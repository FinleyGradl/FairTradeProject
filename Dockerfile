# Production Dockerfile for FairFind Next.js App
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manifests and Prisma schema
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Prisma generate only needs the schema — not a live DB connection.
# We supply a dummy URL so the Prisma CLI doesn't complain.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN npx prisma generate

# next build also runs `prisma generate` via the build script.
# Override to skip that and just run next build directly so we don't
# hit the DB twice — and more importantly, never open a real connection.
RUN npx next build

# Production image — copy standalone output
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Leverage Next.js standalone output for a minimal image
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Include Prisma schema + generated client (custom output path) + engine
# so db push / migrations and the app itself work at runtime.
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# DATABASE_URL must be supplied at runtime via docker-compose or -e flag
CMD ["node", "server.js"]
