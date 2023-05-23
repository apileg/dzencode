FROM node:18-alpine

# To be safe, install this package  
# See https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package* . 
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

CMD npm run migrate && npm run seed && npm run start
