import { Bot } from 'grammy';
import type { CustomContext } from '../../types/context.js';
import chatMemberStatusChangeHandler from './chat-member-status-change.handler.js';

export default function registerHandlers(bot: Bot<CustomContext>) {
  bot.on('my_chat_member', chatMemberStatusChangeHandler);
}
