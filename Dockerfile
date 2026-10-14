# Multi-stage Dockerfile for Next.js Portfolio v2
FROM oven/bun:1.4.2-alpine AS base
WORKDIR /app

# Dependencies Stage
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
COPY prisma ./prisma/
RUN bun install --frozen-lockfile

# Builder Stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN bunx prisma generate
RUN bun run build

# Runner Stage
FROM oven/bun:1.4.2-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "bunx prisma db push && bun run start"]
