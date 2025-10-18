import type { Bot } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import { loggerMiddleware } from './logger.middleware.js';

export default function registerMiddlewares(bot: Bot<CustomContext>) {
  bot.use(loggerMiddleware);
}
