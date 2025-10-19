import { Bot, BotError, MemorySessionStorage, session } from 'grammy';
import { Redis } from 'ioredis';
import { RedisAdapter } from '@grammyjs/storage-redis';

import getEnvVariable from '../config/env.js';
import { logBotError } from './middlewares/logger.middleware.js';

import type { SessionData } from '../types/session.js';
import type { CustomContext } from '../types/context.js';
import registerMiddlewares from './middlewares/index.js';
import registerHandlers from './handlers/index.js';
import registerCommands from './commands/index.js';

const store =
  getEnvVariable('NODE_ENV') === 'production'
    ? new RedisAdapter<SessionData>({ instance: new Redis(getEnvVariable('REDIS_URL')) })
    : new MemorySessionStorage<SessionData>();

const bot = new Bot<CustomContext>(getEnvVariable('TELEGRAM_BOT_TOKEN'), {});

function initialSession(): SessionData {
  return {
    step: null,
  };
}

bot.use(session({ initial: initialSession, storage: store }));

registerMiddlewares(bot);
registerHandlers(bot);
registerCommands(bot);

bot.catch(async (err: BotError<CustomContext>) => {
  await logBotError(err);
});

export default bot;
