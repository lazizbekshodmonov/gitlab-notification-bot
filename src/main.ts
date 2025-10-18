import bot from './bot/index.js';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import type { GitlabEvent } from './types/gitlab/index.js';
import getEnvVariable from './config/env.js';
import { PrismaClient } from '@prisma/client';
import { GrammyTelegramService } from './modules/telegram-bot-notification.service.js';

const app = express();

const chatId = getEnvVariable('TELEGRAM_GROUP_ID');

app.use(bodyParser.json());
app.use(morgan('dev'));

const prisma = new PrismaClient();
const telegramBotNotificationService = new GrammyTelegramService();

app.post('/gitlab/webhook', async (req, res) => {
  const event = req.body as GitlabEvent;
  try {
    switch (event.object_kind) {
      case 'push':
        await telegramBotNotificationService.handlePushEvent(event, chatId);
        break;
      case 'merge_request':
        await telegramBotNotificationService.handleMergeEvent(event, chatId);
        break;
      case 'pipeline':
        await telegramBotNotificationService.handlePipelineEvent(event);
        break;
      case 'build':
        await telegramBotNotificationService.handleBuildEvent(event);
        break;
      default:
        console.log('Unhandled event:', event.object_kind);
    }

    res.status(200).send('OK');
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
const port = Number(getEnvVariable('PORT'));
app.listen(port, async (error) => {
  if (error) return console.log(error);
  prisma.$connect();
  console.log(`🚀 Server running on port ${port}`);
  await bot.init();
  console.log('🤖 Telegram bot ready');
});
