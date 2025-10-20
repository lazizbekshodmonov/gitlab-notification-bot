import type { IGitlabPushEvent } from '../types/gitlab/push-event.js';
import bot from '../bot/index.js';
import eventMessageService from '../services/event-message.service.js';
import type { Api, RawApi } from 'grammy';
import { logger } from '../config/winston.js';

export async function pushEventHandler(event: IGitlabPushEvent, chatId: string, threadId?: string) {
  try {
    const user = event.user_name;
    const project = event.project;
    const commits = event.commits ?? [];
    const branch = event.ref?.split('/').pop() ?? 'unknown';
    const totalCommits = commits.length;

    const isCreate = event.before === '0000000000000000000000000000000000000000';
    const isDelete = event.after === '0000000000000000000000000000000000000000';

    let msg = '';
    let projectMsg = `📦 <b>Project:</b> <a href="${project.web_url}">${project.path_with_namespace}</a>\n`;
    let branchMsg = `🌿 <b>Branch:</b> ${branch}\n`;
    if (isCreate) {
      msg = `🆕 <b>Created new branch</b>\n\n`;
      msg += projectMsg;
      msg += branchMsg;
      msg += `👤 <b>Created by:</b> ${user}\n`;
    } else if (isDelete) {
      msg = `🗑 <b>Deleted branch</b>\n\n`;
      msg += projectMsg;
      msg += branchMsg;
      msg += `👤 <b>Deleted by:</b> ${user}\n`;
    } else {
      msg = `📤 <b>Push Event Detected!</b>\n\n`;
      msg += projectMsg;
      msg += branchMsg;
      msg += `👤 <b>Pushed by:</b> ${user}\n`;
      msg += `🧱 <b>Commits:</b> ${totalCommits}\n\n`;

      const displayCommits = commits.slice(-3);
      for (const commit of displayCommits) {
        const commitUrl = commit.url;
        const shortId = commit.id.slice(0, 8);
        msg += `• <a href="${commitUrl}">${shortId}</a> — ${commit.message}\n`;
      }

      if (totalCommits > 3) {
        msg += `\n<i>...and ${totalCommits - 3} more commits.</i>`;
      }
    }

    let options: Parameters<Api<RawApi>['sendMessage']>[2] = {
      parse_mode: 'HTML',
    };
    if (threadId) {
      options.message_thread_id = Number(threadId);
    }
    const excitingEvent = await eventMessageService.getMessageByEvent(event.checkout_sha);
    if (excitingEvent) {
      options = {
        ...options,
        reply_parameters: {
          message_id: Number(excitingEvent.messageId),
        },
      };
    }

    const message = await bot.api.sendMessage(chatId, msg, options);

    await eventMessageService.saveEventMessage(
      event.checkout_sha,
      event.object_kind,
      chatId,
      String(message.message_id),
      threadId
    );
  } catch (error: any) {
    logger.error(error.stack);
  }
}
