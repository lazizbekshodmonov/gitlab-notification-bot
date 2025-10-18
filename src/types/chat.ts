export interface MyChatMemberUpdate {
  chat: {
    id: number;
    title: string;
    type: 'group' | 'supergroup' | 'channel' | 'private';
    username?: string;
    all_members_are_administrators?: boolean;
    accepted_gift_types?: {
      unlimited_gifts: boolean;
      limited_gifts: boolean;
      unique_gifts: boolean;
      premium_subscription: boolean;
    };
  };
  from: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  };
  date: number;
  old_chat_member: ChatMember;
  new_chat_member: ChatMember;
}

export interface ChatMember {
  user: {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
  };
  status: 'creator' | 'administrator' | 'member' | 'restricted' | 'left' | 'kicked';
}
