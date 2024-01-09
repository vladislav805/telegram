import type { User } from './User';

export type MessageEntityType =
    | 'mention'
    | 'hashtag'
    | 'cashtag'
    | 'bot_command'
    | 'url'
    | 'email'
    | 'phone_number'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'spoiler'
    | 'code'
    | 'pre'
    | 'text_link'
    | 'text_mention'
    | 'custom_emoji';

interface MessageEntityBase {
    /**
     * Offset in UTF-16 code units to the start of the entity
     */
    offset: number;

    /**
     * Length of the entity in UTF-16 code units
     */
    length: number;
}

/**
 * This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.
 */
export interface MessageEntityText extends MessageEntityBase {
    type: Omit<MessageEntityType, 'text_link' | 'text_mention' | 'pre' | 'custom_emoji'>;
}

export interface MessageEntityTextLink extends MessageEntityBase {
    type: 'text_link';
    url: string;
}

export interface MessageEntityTextMention extends MessageEntityBase {
    type: 'text_mention';
    user: User;
}

export interface MessageEntityCode extends MessageEntityBase {
    type: 'pre';
    language?: string;
}

export interface MessageEntityCustomEmoji extends MessageEntityBase {
    type: 'custom_emoji';
    custom_emoji_id?: string;
}

/**
 * This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.
 */
export type MessageEntity =
    | MessageEntityText
    | MessageEntityTextLink
    | MessageEntityTextMention
    | MessageEntityCode
    | MessageEntityCustomEmoji;
