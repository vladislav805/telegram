import type { MessageEntity } from './MessageEntity';
import type { InlineKeyboardMarkup } from './markup/InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';
import type { ParseMode } from './ParseMode';

/**
 * Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video.
 */
export interface InlineQueryResultVideo {
    /**
     * Type of the result, must be video
     */
    type: 'video';

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * A valid URL for the embedded video player or video file
     */
    video_url: string;

    /**
     * Mime type of the content of video url, “text/html” or “video/mp4”
     */
    mime_type: string;

    /**
     * URL of the thumbnail (JPEG only) for the video
     */
    thumb_url: string;

    /**
     * Title for the result
     */
    title: string;

    /**
     * Caption of the video to be sent, 0-1024 characters after entities parsing
     */
    caption?: string;

    /**
     * Mode for parsing entities in the video caption. See formatting options for more details.
     */
    parse_mode?: ParseMode;

    /**
     * List of special entities that appear in the caption, which can be specified instead of parse_mode
     */
    caption_entities?: MessageEntity[];

    /**
     * Video width
     */
    video_width?: number;

    /**
     * Video height
     */
    video_height?: number;

    /**
     * Video duration in seconds
     */
    video_duration?: number;

    /**
     * Short description of the result
     */
    description?: string;

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;

    /**
     * Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video).
     */
    input_message_content?: InputMessageContent;
}
