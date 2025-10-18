import type { CustomContext } from '../../types/context.js';
import type { MyChatMemberUpdate } from '../../types/chat.js';
import getBotChatMemberMessage from '../messages/chat-member-status-change.message.js';
import getEnvVariable from '../../config/env.js';

export class NotifyAdminService {
  async notifyAdminOnChangeChatMemberStatus(ctx: CustomContext, chatMember: MyChatMemberUpdate) {
    const chatId = getEnvVariable('BOT_ADMIN_ID');

    const message = getBotChatMemberMessage(chatMember);

    if (!message) return;
    await ctx.api.sendMessage(chatId, message, {
      parse_mode: 'HTML',
      link_preview_options: {
        is_disabled: true,
      },
    });
  }
}

export default new NotifyAdminService();
