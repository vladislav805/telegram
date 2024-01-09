import type { FileCommon } from './FileCommon';

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 */
export interface PhotoSize extends FileCommon {
    /**
     * Photo width
     */
    width: number;

    /**
     * Photo height
     */
    height: number;
}
