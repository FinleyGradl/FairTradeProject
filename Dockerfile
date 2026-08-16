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
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js public directory
COPY --from=builder /app/public ./public

# Standalone Next.js application
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder /app/node_modules/dotenv ./node_modules/dotenv
COPY --from=builder /app/node_modules/tsx ./node_modules/tsx

# Upload directory
RUN mkdir -p /app/public/uploads/avatars

EXPOSE 3000

CMD ["sh", "-c", "mkdir -p /app/public/uploads/avatars && node server.js"]