import type { CustomContext } from '../../types/context.js';
import getEnvVariable from '../../config/env.js';

export async function webhookUrlCommand(ctx: CustomContext) {
  const webhookBaseUrl = getEnvVariable('WEBHOOK_BASE_URL');
  const chat = ctx.chat;
  const message = ctx.message;

  const chatId = chat?.id;
  const threadId = message?.message_thread_id;

  const isGroup = chat?.type === 'group' || chat?.type === 'supergroup';

  let text = `\`\`\`\n${webhookBaseUrl}/gitlab/webhook/${chatId}\n\`\`\``;

  if (isGroup && threadId) {
    text = `\`\`\`\n${webhookBaseUrl}/gitlab/webhook/${chatId}/${threadId}\n\`\`\``;
  }

  const options: Parameters<typeof ctx.reply>[1] = {
    parse_mode: 'MarkdownV2',
  };

  if (message?.message_id) {
    options.reply_parameters = {
      message_id: message.message_id,
      allow_sending_without_reply: true,
    };
  }

  await ctx.reply(text, options);
}
