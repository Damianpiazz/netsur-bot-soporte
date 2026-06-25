FROM node:21-alpine3.18 AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
RUN npx tsc

FROM node:21-alpine3.18 AS deploy

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY src/database/schema.sql ./dist/database/
COPY src/database/seed.sql ./dist/database/
COPY src/views ./dist/views
COPY src/admin ./dist/admin

EXPOSE 3001

CMD ["node", "dist/index.js"]
