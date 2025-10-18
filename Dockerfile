FROM node:20 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY .env .env

EXPOSE 4000
CMD ["node", "dist/main.js"]

CMD "npx prisma migrate deploy"
