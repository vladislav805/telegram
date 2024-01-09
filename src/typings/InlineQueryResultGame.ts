import type { InlineKeyboardMarkup } from './InlineKeyboardMarkup';

/**
 * Represents a Game.
 *
 * Note: This will only work in Telegram versions released after October 1, 2016. Older clients will not display any inline results if a game result is among them.
 */
export interface InlineQueryResultGame {
    /**
     * Type of the result, must be game
     */
    type: 'game';

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * Short name of the game
     */
    game_short_name: string;

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;
}
