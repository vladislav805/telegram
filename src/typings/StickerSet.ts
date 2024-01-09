import type { Sticker } from './Sticker';
import type { PhotoSize } from './PhotoSize';

export type StickerSetType =
    | 'regular'
    | 'mask'
    | 'custom_emoji';

/**
 * This object represents a sticker set.
 */
export interface StickerSet {
    /**
     * Sticker set name
     */
    name: string;

    /**
     * Sticker set title
     */
    title: string;

    /**
     * Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji”
     */
    sticker_type: StickerSetType;

    /**
     * True, if the sticker set contains animated stickers
     */
    is_animated: boolean;

    /**
     * True, if the sticker set contains video stickers
     */
    is_video: boolean;

    /**
     * List of all set stickers
     */
    stickers: Sticker[];

    /**
     * Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format
     */
    thumb?: PhotoSize;
}
