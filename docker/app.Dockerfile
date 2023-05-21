FROM node:18-alpine AS base

# Cache dependencies installation - takes a while
FROM base as deps
WORKDIR /app

# To be safe, install this package  
# See https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

COPY package* ./
RUN npm ci

# Build the app and run it
FROM base as main

WORKDIR /
COPY --from=deps /app .

WORKDIR /app

COPY . .
COPY ./docker/.env .

RUN npx prisma generate
RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN chown -R nextjs:nodejs /app/.next

USER nextjs

ENV PORT 3000
CMD ["npm", "run", "start"]
