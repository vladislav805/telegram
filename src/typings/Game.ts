import type { PhotoSize } from './PhotoSize';
import type { MessageEntity } from './MessageEntity';
import type { Animation } from './Animation';

/**
 * This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.
 */
export interface Game {
    /**
     * Title of the game
     */
    title: string;

    /**
     * Description of the game
     */
    description: string;

    /**
     * Photo that will be displayed in the game message in chats.
     */
    photo: PhotoSize[];

    /**
     * Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters.
     */
    text?: string;

    /**
     * Special entities that appear in text, such as usernames, URLs, bot commands, etc.
     */
    text_entities?: MessageEntity[];

    /**
     * Animation that will be displayed in the game message in chats. Upload via BotFather
     */
    animation?: Animation;
}
