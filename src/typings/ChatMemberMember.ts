import type { User } from './User';

/**
 * Represents a chat member that has no additional privileges or restrictions.
 */
export interface ChatMemberMember {
    /**
     * The member's status in the chat, always “member”
     */
    status: 'member';

    /**
     * Information about the user
     */
    user: User;
}
