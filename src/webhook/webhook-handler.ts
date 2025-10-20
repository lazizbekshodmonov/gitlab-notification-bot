import type { GitlabEvent } from '../types/gitlab/index.js';
import bot from '../bot/index.js';
import type { IGitlabMergeRequestEvent } from '../types/gitlab/merge-request-event.js';
import type { IGitlabNoteEvent } from '../types/gitlab/note-event.js';
import type { IGitlabPipelineEvent } from '../types/gitlab/pipeline-event.js';
import type { IGitlabDeploymentEvent } from '../types/gitlab/deployment-event.js';
import { logger } from '../config/winston.js';
import type { IGitlabReleaseEvent } from '../types/gitlab/release-event.js';
import type { Request, Response } from 'express';
import type { IGitlabPushEvent } from '../types/gitlab/push-event.js';
import { pushEventHandler } from '../event-handler/push-event.handler.js';
import { pipelineEventHandler } from '../event-handler/pipeline-event.handler.js';
import { mergeRequestEventHandler } from '../event-handler/merge-request-event.handler.js';

function sendMessage(chatId: string, msg: string, threadId?: string): void {
  bot.api.sendMessage(chatId, msg, {
    parse_mode: 'HTML',
    message_thread_id: Number(threadId),
  });
}

export async function webhookHandler(req: Request, res: Response): Promise<void> {
  try {
    const chatId = req.params.chatId as string;
    const threadId = req.params.threadId;
    const body: GitlabEvent = req.body as GitlabEvent;
    const object_kind = body.object_kind;

    switch (object_kind) {
      // ========== PUSH EVENT ==========
      case 'push': {
        pushEventHandler(body as IGitlabPushEvent, chatId, threadId);
        break;
      }

      // ========== NOTE EVENT ==========
      case 'note': {
        const event = body as unknown as IGitlabNoteEvent;
        const item = event.object_attributes;
        const user = event.user;

        if (Object.prototype.hasOwnProperty.call(item, 'action')) {
          let msg = '';
          switch (item.action) {
            case 'open':
              msg += `🐞 <b>New issue created by:</b> ${user.name}\n`;
              msg += `💬 <a href="${item.url}">${item.note}</a>`;
              break;
            case 'reopen':
              msg += `🔄 <b>Issue re-opened by:</b> ${user.name}\n`;
              msg += `💬 <a href="${item.url}">${item.note}</a>`;
              break;
            case 'close':
              msg += `✅ <b>Issue closed by:</b> ${user.name}\n`;
              msg += `💬 <a href="${item.url}">${item.note}</a>`;
              break;
          }
          sendMessage(chatId, msg, threadId);
        }
        break;
      }

      // ========== MERGE REQUEST EVENT ==========
      case 'merge_request': {
        const event = body as unknown as IGitlabMergeRequestEvent;
        mergeRequestEventHandler(event, chatId, threadId);
        break;
      }

      // ========== PIPELINE EVENT ==========
      case 'pipeline': {
        const event = body as unknown as IGitlabPipelineEvent;
        pipelineEventHandler(event, chatId, threadId);
        break;
      }

      // ========== DEPLOYMENT EVENT ==========
      case 'deployment': {
        const event = body as unknown as IGitlabDeploymentEvent;
        if (event.status === 'success') {
          const msg =
            `🚀📦 <b>Deployment Successful!</b>\n` +
            `🌍 <b>Environment:</b> ${event.environment}\n` +
            `🔗 <a href="${event.environment_external_url}">${event.environment_external_url}</a>`;
          sendMessage(chatId, msg, threadId);
        }
        break;
      }

      // ========== RELEASE EVENT ==========
      case 'release': {
        const event = body as unknown as IGitlabReleaseEvent;
        if (event.action === 'create') {
          const msg =
            `📢🎉 <b>New Release Published!</b>\n` +
            `📦 <b>Project:</b> <a href="${event.project.web_url}">${event.project.path_with_namespace}</a>\n` +
            `🏷️ <b>Version:</b> ${event.tag}\n` +
            `🔗 <a href="${event.url}">View Release</a>`;
          sendMessage(chatId, msg, threadId);
        }
        break;
      }
    }

    res.status(200).send('OK');
  } catch (error) {
    logger.error(error);
    res.status(400).send(error);
  }
}
