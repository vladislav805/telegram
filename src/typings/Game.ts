import type { PhotoSize } from './Photo';
import type { MessageEntity } from './MessageEntity';
import type { Animation } from './Animation';

export interface Game {
    title: string;
    description: string;
    photo: PhotoSize[];
    text?: string;
    text_entities?: MessageEntity[];
    animation?: Animation;
}
