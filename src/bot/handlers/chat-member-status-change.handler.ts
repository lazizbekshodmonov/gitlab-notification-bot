import type { CustomContext } from '../../types/context.js';
import notifyAdminService from '../services/notify-admin.service.js';
import type { MyChatMemberUpdate } from '../../types/chat.js';

export default async function chatMemberStatusChangeHandler(ctx: CustomContext) {
  const chatMemberUpdated = ctx.myChatMember as MyChatMemberUpdate;
  if (!chatMemberUpdated) return;

  const { chat, old_chat_member, new_chat_member } = chatMemberUpdated;
  const botId = new_chat_member.user.id;
  if (
    new_chat_member.user.id === botId &&
    (old_chat_member.status === 'left' || old_chat_member.status === 'kicked') &&
    (new_chat_member.status === 'member' || new_chat_member.status === 'administrator')
  ) {
    // await ctx.api.sendMessage(chat.id, groupWelcomeMessage(), {
    //   parse_mode: 'HTML',
    //   link_preview_options: { is_disabled: true },
    // });

    let ownerId: number | undefined;
    try {
      const admins = await ctx.api.getChatAdministrators(chat.id);
      const owner = admins.find((a) => a.status === 'creator');
      ownerId = owner?.user.id;
    } catch (err) {
      throw new Error(`${err}`);
    }

    if (ownerId) {
      // await ctx.api.sendMessage(chat.id, adminPermissionMessage(undefined, ownerId), {
      //   parse_mode: 'HTML',
      //   link_preview_options: { is_disabled: true },
      // });
    }
  }

  if (
    new_chat_member.user.id === botId &&
    old_chat_member.status === 'member' &&
    new_chat_member.status === 'administrator'
  ) {
    // await ctx.api.sendMessage(chat.id, adminGrantedMessage(), { parse_mode: 'HTML' });
  }

  await notifyAdminService.notifyAdminOnChangeChatMemberStatus(ctx, chatMemberUpdated);
}
