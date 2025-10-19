import bot from './bot/index.js';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import getEnvVariable from './config/env.js';
import { PrismaClient } from '@prisma/client';
import webhookRouter from './webhook/webhook.router.js';

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(webhookRouter);

const prisma = new PrismaClient();

const port = Number(getEnvVariable('PORT'));
app.listen(port, async (error) => {
  if (error) return console.log(error);
  prisma.$connect();
  console.log(`🚀 Server running on port ${port}`);
  await bot.start({
    onStart: (botInfo) => {
      console.log('🤖 Telegram bot ready', { botInfo });
    },
  });
});
