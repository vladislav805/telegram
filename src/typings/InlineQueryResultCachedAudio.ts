import type { MessageEntity } from './MessageEntity';
import type { InlineKeyboardMarkup } from './InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';
import type { ParseMode } from './ParseMode';

/**
 * Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio.
 *
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 */
export interface InlineQueryResultCachedAudio {
    /**
     * Type of the result, must be audio
     */
    type: 'audio';

    /**
     * Unique identifier for this result, 1-64 bytes
     */
    id: string;

    /**
     * A valid file identifier for the audio file
     */
    audio_file_id: string;

    /**
     * Caption, 0-1024 characters after entities parsing
     */
    caption?: string;

    /**
     * Mode for parsing entities in the audio caption. See formatting options for more details.
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
     * Content of the message to be sent instead of the audio
     */
    input_message_content?: InputMessageContent;
}
