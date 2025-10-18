import type { BotError, NextFunction } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import { logger } from '../../config/winston.js';

export async function loggerMiddleware(ctx: CustomContext, next: NextFunction): Promise<void> {
  const from =
    ctx.from?.username ||
    `${ctx.from?.first_name ?? ''} ${ctx.from?.last_name ?? ''}` ||
    'Unknown User';
  const chatId = ctx.chat?.id || 'Unknown Chat';
  let contentDescription = 'Unknown content';

  if (ctx.message) {
    if ('text' in ctx.message) {
      contentDescription = `Text: ${ctx.message.text}`;
    } else if ('photo' in ctx.message) {
      contentDescription = `Photo: ${ctx.message.caption || '[no caption]'}`;
    } else if ('video' in ctx.message) {
      contentDescription = `Video: ${ctx.message.caption || '[no caption]'}`;
    } else if ('voice' in ctx.message) {
      contentDescription = `Voice message`;
    } else if ('audio' in ctx.message) {
      contentDescription = `Audio: ${ctx.message.caption || '[no caption]'}`;
    } else if ('document' in ctx.message) {
      contentDescription = `Document: ${ctx.message.document.file_name}`;
    } else if ('sticker' in ctx.message) {
      contentDescription = `Sticker: ${ctx.message.sticker.emoji}`;
    } else if ('contact' in ctx.message) {
      contentDescription = `Contact: ${ctx.message.contact.phone_number}`;
    } else if ('location' in ctx.message) {
      contentDescription = `Location: lat ${ctx.message.location.latitude}, lon ${ctx.message.location.longitude}`;
    } else {
      contentDescription = 'Other message type received';
    }
  }

  logger.info(`From: ${from} | Chat: ${chatId} | ${contentDescription}`);

  await next();
}

export async function logBotError(error: BotError) {
  const ctx = error.ctx;
  const from =
    ctx.from?.username ||
    `${ctx.from?.first_name ?? ''} ${ctx.from?.last_name ?? ''}` ||
    'Unknown User';
  const chatId = ctx.chat?.id || 'Unknown Chat';
  await ctx.reply("Ma'lumot olishda xatolik yuz berdi!");
  logger.error(`From: ${from} | Chat: ${chatId} | Error: ${error?.stack}`);
}
