import type { IGitlabMergeRequestEvent } from '../types/gitlab/merge-request-event.js';
import bot from '../bot/index.js';
import eventMessageService from '../services/event-message.service.js';
import { logger } from '../config/winston.js';
import { type Api, InlineKeyboard, type RawApi } from 'grammy';

export async function mergeRequestEventHandler(
  event: IGitlabMergeRequestEvent,
  chatId: string,
  threadId?: string
) {
  try {
    const item = event.object_attributes;
    const user = event.user;

    let inlineKeyboard = new InlineKeyboard().url('🍒 Opened', item.url);

    if (Object.prototype.hasOwnProperty.call(item, 'action')) {
      let msg = '';
      switch (item.action) {
        case 'open':
          msg += `🍒 <b>Opened new merge request opened</b>\n\n`;
          inlineKeyboard = new InlineKeyboard().url('🍒 Opened', item.url);
          break;
        case 'reopen':
          msg += `🔄 <b>Reopened Merge request</b>`;
          inlineKeyboard = new InlineKeyboard().url('🔄 Reopened', item.url);
          break;
        case 'merge':
          msg += `✅ <b>Merge request merged successfully!</b>\n`;
          inlineKeyboard = new InlineKeyboard().url('✅ Merged', item.url);
          break;
        case 'close':
          msg += `🚫 <b>Merge request closed.</b>\n`;
          inlineKeyboard = new InlineKeyboard().url('🚫 Closed', item.url);
          break;
      }
      msg += `📦 <b>Project:</b> <a href="${event.project.web_url}">${event.project.path_with_namespace}</a>\n`;
      msg += `🔀 <b>Branches:</b> ${item.source_branch} → ${item.target_branch}\n`;

      if (event.assignees?.length) {
        msg += `👥 <b>Assignees:</b> ${event.assignees.map((a) => a.name).join(', ')}\n`;
      }

      if (event.reviewers?.length) {
        msg += `👀 <b>Reviewers:</b> ${event.reviewers.map((r) => r.name).join(', ')}\n`;
      }

      msg += `👤 <b>Opened by:</b> ${item.last_commit?.author?.name || user.name}\n`;
      if (user && item.action === 'merge') {
        msg += `🤝 <b>Merged by:</b> ${user.name}\n`;
      } else if (user && item.action === 'reopen') {
        msg += `🤝 <b>Reopened by:</b> ${user.name}\n`;
      } else if (user && item.action === 'close') {
        msg += `🤝 <b>Closed by:</b> ${user.name}\n`;
      }
      const shortId = event.object_attributes.last_commit.id.slice(0, 8);
      msg += `<a href="${event.object_attributes.last_commit.url}">${shortId}</a> — ${event.object_attributes.last_commit.message}\n`;

      const excitingEvent = await eventMessageService.getMessageByEvent(
        String(event.object_attributes.id)
      );

      let options: Parameters<Api<RawApi>['sendMessage']>[2] = {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard,
      };
      if (threadId) {
        options.message_thread_id = Number(threadId);
      }

      if (excitingEvent) {
        await bot.api.editMessageText(chatId, Number(excitingEvent.messageId), msg, {
          parse_mode: 'HTML',
          reply_markup: inlineKeyboard,
        });
        await eventMessageService.saveEventMessage(
          excitingEvent.eventId,
          excitingEvent.eventType,
          chatId,
          excitingEvent.messageId,
          threadId,
          excitingEvent.eventSha
        );
      } else {
        const message = await bot.api.sendMessage(chatId, msg, options);
        await eventMessageService.saveEventMessage(
          String(event.object_attributes.id),
          event.object_kind,
          chatId,
          String(message.message_id),
          threadId,
          event.object_attributes.merge_commit_sha ?? undefined
        );
      }
    }
  } catch (e: any) {
    logger.error(e.stack);
  }
}
