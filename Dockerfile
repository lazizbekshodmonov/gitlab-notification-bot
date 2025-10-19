FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate reset --force
RUN npx prisma generate

RUN npm run build

COPY .env .env

EXPOSE 4000

CMD npx prisma migrate deploy && npm run start
