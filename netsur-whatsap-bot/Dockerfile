FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS deploy

WORKDIR /app

ENV NODE_ENV=production

ARG PORT
ENV PORT $PORT
EXPOSE $PORT

RUN addgroup -g 1001 -S nodejs && adduser -S -u 1001 -G nodejs nodejs

COPY --from=builder --chown=nodejs:nodejs /app/assets ./assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/*.json /app/*-lock.yaml ./
COPY docker-entrypoint.sh ./docker-entrypoint.sh

RUN npm ci --production --ignore-scripts

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]
CMD ["npm", "start"]
