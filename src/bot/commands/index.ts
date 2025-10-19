import { Bot } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import { webhookUrlCommand } from './webhook-url.command.js';

export default function registerCommands(bot: Bot<CustomContext>) {
  bot.command('webhook', webhookUrlCommand);
}
