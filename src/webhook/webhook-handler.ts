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
    const event: GitlabEvent = req.body as GitlabEvent;
    const object_kind = event.object_kind;

    switch (object_kind) {
      // ========== PUSH EVENT ==========
      case 'push': {
        const body = event as IGitlabPushEvent;
        const user = body.user_name;
        const project = body.project;
        const commits = body.commits ?? [];
        const branch = body.ref?.split('/').pop() ?? 'unknown';
        const totalCommits = commits.length;

        let msg = `📤 <b>Push Event Detected!</b>\n\n`;
        msg += `📦 <b>Project:</b> <a href="${project.web_url}">${project.path_with_namespace}</a>\n`;
        msg += `🌿 <b>Branch:</b> ${branch}\n`;
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

        sendMessage(chatId, msg, threadId);
        break;
      }

      // ========== NOTE EVENT ==========
      case 'note': {
        const body = event as unknown as IGitlabNoteEvent;
        const item = body.object_attributes;
        const user = body.user;

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
        const body = event as unknown as IGitlabMergeRequestEvent;
        const item = body.object_attributes;
        const user = body.user;

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

          if (body.assignees?.length) {
            msg += `👥 <b>Assignees:</b> ${body.assignees.map((a) => a.name).join(', ')}\n`;
          }

          if (body.reviewers?.length) {
            msg += `👀 <b>Reviewers:</b> ${body.reviewers.map((r) => r.name).join(', ')}\n`;
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
        const body = event as unknown as IGitlabPipelineEvent;
        const item = body.object_attributes;
        const user = body.user;
        const commit = body.commit;

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

          if (body.merge_request && !isEmptyObject(body.merge_request)) {
            msg += `📦 <b>Related MR:</b> <a href="${body.merge_request.url}">#${body.merge_request.iid}</a>\n`;
          }

          sendMessage(chatId, msg, threadId);
        }
        break;
      }

      // ========== DEPLOYMENT EVENT ==========
      case 'deployment': {
        const body = event as unknown as IGitlabDeploymentEvent;
        if (body.status === 'success') {
          const msg =
            `🚀📦 <b>Deployment Successful!</b>\n` +
            `🌍 <b>Environment:</b> ${body.environment}\n` +
            `🔗 <a href="${body.environment_external_url}">${body.environment_external_url}</a>`;
          sendMessage(chatId, msg, threadId);
        }
        break;
      }

      // ========== RELEASE EVENT ==========
      case 'release': {
        const body = event as unknown as IGitlabReleaseEvent;
        if (body.action === 'create') {
          const msg =
            `📢🎉 <b>New Release Published!</b>\n` +
            `📦 <b>Project:</b> <a href="${body.project.web_url}">${body.project.path_with_namespace}</a>\n` +
            `🏷️ <b>Version:</b> ${body.tag}\n` +
            `🔗 <a href="${body.url}">View Release</a>`;
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
