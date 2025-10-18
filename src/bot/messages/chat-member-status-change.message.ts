import type { MyChatMemberUpdate } from '../../types/chat.js';

export default function getBotChatMemberMessage(chatMember: MyChatMemberUpdate): string | null {
  const { chat, from, old_chat_member, new_chat_member } = chatMember;

  const actor = from.username
    ? `<a href="https://t.me/${from.username}">${from.first_name}${from.last_name ? ' ' + from.last_name : ''}</a>`
    : `<b>${from.first_name}${from.last_name ? ' ' + from.last_name : ''}</b>`;

  const group = chat.username
    ? `<a href="https://t.me/${chat.username}">${chat.title}</a>`
    : `<b>${chat.title}</b>`;

  const groupId = `<code>${chat.id}</code>`;

  if (
    (old_chat_member.status === 'left' || old_chat_member.status === 'kicked') &&
    (new_chat_member.status === 'member' || new_chat_member.status === 'administrator')
  ) {
    return `✅ ${actor} botni ${group} guruhiga <b>qo‘shdi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  if (old_chat_member.status === 'member' && new_chat_member.status === 'administrator') {
    return `🔑 ${actor} botga ${group} guruhida <b>admin huquqi berdi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  if (old_chat_member.status === 'administrator' && new_chat_member.status === 'member') {
    return `⚠️ ${actor} botning ${group} guruhidagi <b>admin huquqini olib tashladi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  if (new_chat_member.status === 'left') {
    return `🚫 ${actor} botni ${group} guruhdan <b>chiqarib tashladi</b>.\n🆔 Guruh ID: ${groupId}`;
  }

  return null;
}
