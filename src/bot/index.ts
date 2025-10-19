import { Bot, BotError, session } from 'grammy';

import getEnvVariable from '../config/env.js';
import { logBotError } from './middlewares/logger.middleware.js';

import type { CustomContext } from '../types/context.js';
import registerMiddlewares from './middlewares/index.js';
import registerHandlers from './handlers/index.js';
import registerCommands from './commands/index.js';

const bot = new Bot<CustomContext>(getEnvVariable('TELEGRAM_BOT_TOKEN'), {});

registerMiddlewares(bot);
registerHandlers(bot);
registerCommands(bot);

bot.catch(async (err: BotError<CustomContext>) => {
  await logBotError(err);
});

export default bot;
