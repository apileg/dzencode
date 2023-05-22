FROM node:18-alpine

# To be safe, install this package  
# See https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

COPY package* . 
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

RUN chown -R nextjs:nodejs /app/.next

USER nextjs

ENV PORT 3000
CMD ["npm", "run", "start"]
