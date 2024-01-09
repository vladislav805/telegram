import type { Chat } from './Chat';
import type { ChatInviteLink } from './ChatInviteLink';
import type { ChatMember } from './ChatMember';
import type { User } from './User';

/** This object represents changes in the status of a chat member. */
export interface ChatMemberUpdated {
    /** Chat the user belongs to */
    chat: Chat;

    /** Performer of the action, which resulted in the change */
    from: User;

    /** Date the change was done in Unix time */
    date: number;

    /** Previous information about the chat member */
    old_chat_member: ChatMember;

    /** New information about the chat member */
    new_chat_member: ChatMember;

    /** Chat invite link, which was used by the user to join the chat; for joining by invite link events only. */
    invite_link?: ChatInviteLink;
}