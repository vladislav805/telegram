import type { ChatPhoto } from './ChatPhoto';
import type { Message } from './Message';
import type { ChatPermissions } from './ChatPermissions';
import type { ChatLocation } from './ChatLocation';
import type { ChatType } from './ChatType';

/**
 * This object represents a chat.
 */
export interface Chat {
    /**
     * Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
     */
    id: number;

    /**
     * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
     */
    type: ChatType;

    /**
     * Title, for supergroups, channels and group chats
     */
    title?: string;

    /**
     * Username, for private chats, supergroups and channels if available
     */
    username?: string;

    /**
     * First name of the other party in a private chat
     */
    first_name?: string;

    /**
     * Last name of the other party in a private chat
     */
    last_name?: string;

    /**
     * Chat photo. Returned only in getChat.
     */
    photo?: ChatPhoto;

    /**
     * Bio of the other party in a private chat. Returned only in getChat.
     */
    bio?: string;

    /**
     * True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user. Returned only in getChat.
     */
    has_private_forwards?: boolean;

    /**
     * True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat. Returned only in getChat.
     */
    has_restricted_voice_and_video_messages?: boolean;

    /**
     * True, if users need to join the supergroup before they can send messages. Returned only in getChat.
     */
    join_to_send_messages?: boolean;

    /**
     * True, if all users directly joining the supergroup need to be approved by supergroup administrators. Returned only in getChat.
     */
    join_by_request?: boolean;

    /**
     * Description, for groups, supergroups and channel chats. Returned only in getChat.
     */
    description?: string;

    /**
     * Primary invite link, for groups, supergroups and channel chats. Returned only in getChat.
     */
    invite_link?: string;

    /**
     * The most recent pinned message (by sending date). Returned only in getChat.
     */
    pinned_message?: Message;

    /**
     * Default chat member permissions, for groups and supergroups. Returned only in getChat.
     */
    permissions?: ChatPermissions;

    /**
     * For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user; in seconds. Returned only in getChat.
     */
    slow_mode_delay?: number;

    /**
     * The time after which all messages sent to the chat will be automatically deleted; in seconds. Returned only in getChat.
     */
    message_auto_delete_time?: number;

    /**
     * True, if messages from the chat can't be forwarded to other chats. Returned only in getChat.
     */
    has_protected_content?: true;

    /**
     * For supergroups, name of group sticker set. Returned only in getChat.
     */
    sticker_set_name?: string;

    /**
     * True, if the bot can change the group sticker set. Returned only in getChat.
     */
    can_set_sticker_set?: true;

    /**
     * Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in getChat.
     */
    linked_chat_id?: number;

    /**
     * For supergroups, the location to which the supergroup is connected. Returned only in getChat.
     */
    location?: ChatLocation;
}
