import type { MessageEntity } from './MessageEntity';
import type { InlineKeyboardMarkup } from './markup/InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';
import type { ParseMode } from './ParseMode';

/**
 * Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method.
 *
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 */
export interface InlineQueryResultDocument {
    /**
     * Type of the result, must be document
     */
    type: 'document';

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * Title for the result
     */
    title: string;

    /**
     * Caption of the document to be sent, 0-1024 characters after entities parsing
     */
    caption?: string;

    /**
     * Mode for parsing entities in the document caption. See formatting options for more details.
     */
    parse_mode?: ParseMode;

    /**
     * List of special entities that appear in the caption, which can be specified instead of parse_mode
     */
    caption_entities?: MessageEntity[];

    /**
     * A valid URL for the file
     */
    document_url: string;

    /**
     * Mime type of the content of the file, either “application/pdf” or “application/zip”
     */
    mime_type: string;

    /**
     * Short description of the result
     */
    description?: string;

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;

    /**
     * Content of the message to be sent instead of the file
     */
    input_message_content?: InputMessageContent;

    /**
     * URL of the thumbnail (JPEG only) for the file
     */
    thumb_url?: string;

    /**
     * Thumbnail width
     */
    thumb_width?: number;

    /**
     * Thumbnail height
     */
    thumb_height?: number;
}
