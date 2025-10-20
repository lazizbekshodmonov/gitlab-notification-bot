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

function isEmptyObject(obj: Object) {
  return !Object.keys(obj).length;
}

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
        const item = event.object_attributes;
        const user = event.user;

        if (Object.prototype.hasOwnProperty.call(item, 'action')) {
          let msg = '';
          switch (item.action) {
            case 'open':
              msg += `🍒 <b>New merge request opened by:</b> ${user.name}\n`;
              break;
            case 'reopen':
              msg += `🔄 <b>Merge request reopened by:</b> ${user.name}\n`;
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
          if (user) {
            msg += `🤝 <b>Merged by:</b> ${user.name}\n`;
          }

          sendMessage(chatId, msg, threadId);
        }
        break;
      }

      // ========== PIPELINE EVENT ==========
      case 'pipeline': {
        const event = body as unknown as IGitlabPipelineEvent;
        const item = event.object_attributes;
        const user = event.user;
        const commit = event.commit;

        if (Object.prototype.hasOwnProperty.call(item, 'status')) {
          let msg = '';
          switch (item.status) {
            case 'failed':
              msg += `❌ <b>Pipeline Failed!</b>\n`;
              break;
            case 'success':
              msg += `✅ <b>Pipeline Succeeded!</b>\n`;
              break;
            case 'running':
              msg += `🚀 <b>Pipeline Running...</b>\n`;
              break;
            default:
              msg += `ℹ️ <b>Pipeline Status:</b> ${item.status}\n`;
          }

          msg += `📦 <b>Project:</b> <a href="${body.project.web_url}">${body.project.path_with_namespace}</a>\n`;
          msg += `🔗 <a href="${item.url}">Pipeline #${item.id}</a>\n`;
          msg += `🌿 <b>Branch:</b> ${item.ref}\n`;
          msg += `👤 <b>Triggered by:</b> ${user.name}\n`;
          msg += `💬 <b>Commit:</b> ${commit.title}\n`;

          if (event.merge_request && !isEmptyObject(event.merge_request)) {
            msg += `📦 <b>Related MR:</b> <a href="${event.merge_request.url}">#${event.merge_request.iid}</a>\n`;
          }

          sendMessage(chatId, msg, threadId);
        }
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
