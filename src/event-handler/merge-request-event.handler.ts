import type { IGitlabMergeRequestEvent } from '../types/gitlab/merge-request-event.js';
import bot from '../bot/index.js';
import eventMessageService from '../services/event-message.service.js';
import { logger } from '../config/winston.js';

export async function mergeRequestEventHandler(
  event: IGitlabMergeRequestEvent,
  chatId: string,
  threadId?: string
) {
  try {
    const item = event.object_attributes;
    const user = event.user;

    if (Object.prototype.hasOwnProperty.call(item, 'action')) {
      let msg = '';
      switch (item.action) {
        case 'open':
          msg += `🍒 <b>Opened new merge request opened</b>\n\n`;
          break;
        case 'reopen':
          msg += `🔄 <b>Reopened Merge request</b>`;
          break;
        case 'merge':
          msg += `✅ <b>Merge request merged successfully!</b>\n`;
          break;
        case 'close':
          msg += `🚫 <b>Merge request closed.</b>\n`;
          break;
      }

      msg += `📦 <a href="${item.url}">${item.title}</a>\n`;
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

      const excitingEvent = await eventMessageService.getMessageByEvent(
        String(event.object_attributes.id)
      );

      if (excitingEvent) {
        await bot.api.editMessageText(chatId, Number(excitingEvent.messageId), msg, {
          parse_mode: 'HTML',
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
        const message = await bot.api.sendMessage(chatId, msg, {
          parse_mode: 'HTML',
        });
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
