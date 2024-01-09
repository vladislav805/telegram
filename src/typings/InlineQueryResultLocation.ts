import type { InlineKeyboardMarkup } from './InlineKeyboardMarkup';
import type { InputMessageContent } from './InputMessageContent';

/**
 * Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location.
 *
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will ignore them.
 */
export interface InlineQueryResultLocation {
    /**
     * Type of the result, must be location
     */
    type: 'location';

    /**
     * Unique identifier for this result, 1-64 Bytes
     */
    id: string;

    /**
     * Location latitude in degrees
     */
    latitude: number;

    /**
     * Location longitude in degrees
     */
    longitude: number;

    /**
     * Location title
     */
    title: string;

    /**
     * The radius of uncertainty for the location, measured in meters; 0-1500
     */
    horizontal_accuracy?: number;

    /**
     * Period in seconds for which the location can be updated, should be between 60 and 86400.
     */
    live_period?: number;

    /**
     * For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
     */
    heading?: number;

    /**
     * For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified.
     */
    proximity_alert_radius?: number;

    /**
     * Inline keyboard attached to the message
     */
    reply_markup?: InlineKeyboardMarkup;

    /**
     * Content of the message to be sent instead of the location
     */
    input_message_content?: InputMessageContent;

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
