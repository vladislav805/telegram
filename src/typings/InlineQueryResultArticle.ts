import type { InputMessageContent } from './InputMessageContent';
import type { InlineKeyboardMarkup } from './markup/InlineKeyboardMarkup';

/**
 * Represents a link to an article or web page.
 */
export interface InlineQueryResultArticle {
    /**
     * Type of the result, must be article
     */
    type: 'article';

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string;

    /**
     * Title of the result
     */
    title: string;

    /**
     * Content of the message to be sent
     */
    input_message_content: InputMessageContent;

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;

    /**
     * URL of the result
     */
    url?: string;

    /**
     * Pass True, if you don't want the URL to be shown in the message
     */
    hide_url?: boolean;

    /**
     * Short description of the result
     */
    description?: string;

    /**
     * Url of the thumbnail for the result
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
