import type { IGitlabPipelineEvent } from '../types/gitlab/pipeline-event.js';
import bot from '../bot/index.js';
import { type Api, InlineKeyboard, type RawApi } from 'grammy';
import eventMessageService from '../services/event-message.service.js';
import { logger } from '../config/winston.js';

export async function pipelineEventHandler(
  event: IGitlabPipelineEvent,
  chatId: string,
  threadId?: string
) {
  try {
    const item = event.object_attributes;
    const user = event.user;
    const commit = event.commit;

    let inlineKeyboard = new InlineKeyboard().url('⌛️ Pending', item.url);

    if (Object.prototype.hasOwnProperty.call(item, 'status')) {
      let msg = '';
      switch (item.status) {
        case 'failed':
          msg += `❌ <b>Pipeline Failed!</b>\n\n`;
          inlineKeyboard = new InlineKeyboard().url('❌ Failed', item.url);
          break;
        case 'success':
          msg += `✅ <b>Pipeline Succeeded!</b>\n\n`;
          inlineKeyboard = new InlineKeyboard().url('✅ Succeeded', item.url);
          break;
        case 'running':
          msg += `🏃‍♂️ <b>Pipeline Running...</b>\n\n`;
          inlineKeyboard = new InlineKeyboard().url('🏃‍♂️ Running', item.url);
          break;
        case 'pending':
          msg += `⌛️ <b>Pipeline Pending...</b>\n\n`;
          inlineKeyboard = new InlineKeyboard().url('⌛️ Pending', item.url);
          break;
        default:
          msg += `ℹ️ <b>Pipeline Status:</b> ${item.status}\n\n`;
          inlineKeyboard = new InlineKeyboard().url(`ℹ️ ${item.status}`, item.url);
      }

      msg += `📦 <b>Project:</b> <a href="${event.project.web_url}">${event.project.path_with_namespace}</a>\n`;
      msg += `🌿 <b>Branch:</b> ${item.ref}\n`;
      msg += `👤 <b>Triggered by:</b> ${user.name}\n`;
      msg += `💬 <b>Commit:</b> ${commit.title}\n`;

      if (event.merge_request && !isEmptyObject(event.merge_request)) {
        msg += `📦 <b>Related MR:</b> <a href="${event.merge_request.url}">#${event.merge_request.iid}</a>\n`;
      }

      let options: Parameters<Api<RawApi>['sendMessage']>[2] = {
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard,
      };
      if (threadId) {
        options.message_thread_id = Number(threadId);
      }
      const pushEvent = await eventMessageService.getMessageByEvent(event.object_attributes.sha);
      if (pushEvent) {
        options = {
          ...options,
          reply_parameters: {
            message_id: Number(pushEvent.messageId),
          },
        };
      }

      const excitingEvent = await eventMessageService.getMessageByEvent(
        String(event.object_attributes.id)
      );

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
          event.object_attributes.sha
        );
      }
    }
  } catch (error: any) {
    logger.error(error.stack);
  }
}

function isEmptyObject(obj: Object) {
  return !Object.keys(obj).length;
}
