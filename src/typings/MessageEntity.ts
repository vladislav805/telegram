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

export interface MessageEntityText {
    type: Omit<MessageEntityType, 'text_link' | 'text_mention' | 'pre' | 'custom_emoji'>;
    offset: number;
    length: number;
}

export interface MessageEntityTextLink extends MessageEntityText {
    type: 'text_link';
    url: string;
}

export interface MessageEntityTextMention extends MessageEntityText {
    type: 'text_mention';
    user: User;
}

export interface MessageEntityCode extends MessageEntityText {
    type: 'pre';
    language?: string;
}

export interface MessageEntityCustomEmoji extends MessageEntityText {
    type: 'custom_emoji';
    custom_emoji_id?: string;
}

export type MessageEntity =
    | MessageEntityText
    | MessageEntityTextLink
    | MessageEntityTextMention
    | MessageEntityCode
    | MessageEntityCustomEmoji;
