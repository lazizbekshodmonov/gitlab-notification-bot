FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build


FROM node:20

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm install --legacy-peer-deps

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env

EXPOSE 4000

CMD ["node", "dist/main.js"]
