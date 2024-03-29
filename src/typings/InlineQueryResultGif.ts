import type { MessageEntity } from './MessageEntity';
import type { InlineKeyboardMarkup } from './InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';
import type { ParseMode } from './ParseMode';

/**
 * Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation.
 */
export interface InlineQueryResultGif {
    /**
     * Type of the result, must be gif
     */
    type: string;

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * A valid URL for the GIF file. File size must not exceed 1MB
     */
    gif_url: string;

    /**
     * Width of the GIF
     */
    gif_width?: number;

    /**
     * Height of the GIF
     */
    gif_height?: number;

    /**
     * Duration of the GIF in seconds
     */
    gif_duration?: number;

    /**
     * URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result
     */
    thumb_url: string;

    /**
     * MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”
     */
    thumb_mime_type?: 'image/jpeg' | 'image/gif' | 'video/mp4';

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
