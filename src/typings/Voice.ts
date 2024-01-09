import type { FileCommon } from './FileCommon';

/**
 * This object represents a voice note.
 */
export interface Voice extends FileCommon {
    /**
     * Duration of the audio in seconds as defined by sender
     */
    duration: number;

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string;
}
