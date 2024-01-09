import type { Message } from '@typings/Message';
import type { MessageEntity } from '@typings/MessageEntity';

export type MessageEntityWithText = MessageEntity & {
    text: string;
};

export function parseMessage({ text, caption, entities, caption_entities }: Message): MessageEntityWithText[] {
    const items = entities ?? caption_entities ?? [];
    const str = text ?? caption ?? '';

    return items.map(entry => ({
        ...entry,
        text: str.substring(entry.offset, entry.offset + entry.length),
    }));
}
