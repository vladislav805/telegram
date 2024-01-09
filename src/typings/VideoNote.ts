import type { FileCommon } from './FileCommon';
import type { PhotoSize } from './PhotoSize';

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 */
export interface VideoNote extends FileCommon {
    /**
     * Video width and height (diameter of the video message) as defined by sender
     */
    length: number;

    /**
     * Duration of the video in seconds as defined by sender
     */
    duration: number;

    /**
     * Video thumbnail
     */
    thumb?: PhotoSize;
}
