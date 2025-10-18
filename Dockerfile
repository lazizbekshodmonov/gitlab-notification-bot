FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy

RUN npm run build

COPY .env .env

EXPOSE "4000"

CMD ["npm", "run", "start"]
