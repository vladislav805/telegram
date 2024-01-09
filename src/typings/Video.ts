import type { FileCommon } from './FileCommon';
import type { PhotoSize } from './PhotoSize';

/**
 * This object represents a video file.
 */
export interface Video extends FileCommon {
    /**
     * Video width as defined by sender
     */
    width: number;

    /**
     * Video height as defined by sender
     */
    height: number;

    /**
     * Duration of the video in seconds as defined by sender
     */
    duration: number;

    /**
     * Video thumbnail
     */
    thumb?: PhotoSize;

    /**
     * Mime type of a file as defined by sender
     */
    mime_type?: string;
}
