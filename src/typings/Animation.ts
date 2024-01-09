import type { PhotoSize } from './PhotoSize';
import type { FileCommon } from './FileCommon';

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 */
export interface Animation extends FileCommon {

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
     * Animation thumbnail as defined by sender
     */
    thumb?: PhotoSize;

    /**
     * Original animation filename as defined by sender
     */
    file_name?: string;

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string;
}
