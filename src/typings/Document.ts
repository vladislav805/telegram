import type { PhotoSize } from './PhotoSize';
import type { FileCommon } from './FileCommon';

/**
 * This object represents a general file (as opposed to photos, voice messages and audio files).
 */
export interface Document extends FileCommon {

    /**
     * Document thumbnail as defined by sender
     */
    thumb?: PhotoSize;

    /**
     * Original filename as defined by sender
     */
    file_name?: string;

    /**
     * MIME type of the file as defined by sender
     */
    mime_type?: string;
}
