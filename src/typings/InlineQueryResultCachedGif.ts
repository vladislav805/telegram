import type { MessageEntity } from './MessageEntity';
import type { InlineKeyboardMarkup } from './markup/InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';
import type { ParseMode } from './ParseMode';

/**
 * Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation.
 */
export interface InlineQueryResultCachedGif {
    /**
     * Type of the result, must be gif
     */
    type: 'gif';

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * A valid file identifier for the GIF file
     */
    gif_file_id: string;

    /**
     * Title for the result
     */
    title?: string;

    /**
     * Caption of the GIF file to be sent, 0-1024 characters after entities parsing
     */
    caption?: string;

    /**
     * Mode for parsing entities in the caption. See formatting options for more details.
     */
    parse_mode?: ParseMode;

    /**
     * List of special entities that appear in the caption, which can be specified instead of parse_mode
     */
    caption_entities?: MessageEntity[];

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;

    /**
     * Content of the message to be sent instead of the GIF animation
     */
    input_message_content?: InputMessageContent;
}
