import type { IGitlabPushEvent } from '../types/gitlab/push-event.js';
import bot from '../bot/index.js';

export function pushEventHandler(event: IGitlabPushEvent, chatId: string, threadId?: string) {
  const user = event.user_name;
  const project = event.project;
  const commits = event.commits ?? [];
  const branch = event.ref?.split('/').pop() ?? 'unknown';
  const totalCommits = commits.length;

  const isCreate = event.before === '0000000000000000000000000000000000000000';
  const isDelete = event.after === '0000000000000000000000000000000000000000';

  let msg = `📤 <b>Push Event Detected!</b>\n\n`;

  if (isCreate) {
    msg = `🆕 <b>Yangi ${branch} branch yaratildi</b>`;
  } else if (isDelete) {
    msg = `🗑 <b>${branch} branch o‘chirildi</b>`;
  } else {
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
  }

  bot.api.sendMessage(chatId, msg, {
    parse_mode: 'HTML',
    message_thread_id: Number(threadId),
  });
}
