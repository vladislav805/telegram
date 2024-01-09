import type { MessageEntity } from './MessageEntity';
import type { InlineKeyboardMarkup } from './InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';
import type { ParseMode } from './ParseMode';

/**
 * Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo.
 */
export interface InlineQueryResultCachedPhoto {
    /**
     * Type of the result, must be photo
     */
    type: 'photo';

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * A valid file identifier of the photo
     */
    photo_file_id: string;

    /**
     * Title for the result
     */
    title?: string;

    /**
     * Short description of the result
     */
    description?: string;

    /**
     * Caption of the photo to be sent, 0-1024 characters after entities parsing
     */
    caption?: string;

    /**
     * Mode for parsing entities in the photo caption. See formatting options for more details.
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
     * Content of the message to be sent instead of the photo
     */
    input_message_content?: InputMessageContent;
}
