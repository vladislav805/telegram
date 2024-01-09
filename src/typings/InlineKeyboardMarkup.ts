import type { InlineKeyboardButton } from './InlineKeyboardButton';

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 *
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will display unsupported message.
 */
export interface InlineKeyboardMarkup {
    /**
     * Array of button rows, each represented by an Array of InlineKeyboardButton objects
     */
    inline_keyboard: InlineKeyboardButton[][];
}
