import type { PhotoSize } from './PhotoSize';
import type { MaskPosition } from './MaskPosition';
import type { File } from './File';
import type { FileCommon } from './FileCommon';

export type StickerType =
    | 'regular'
    | 'mask'
    | 'custom_emoji';

/**
 * This object represents a sticker.
 */
export interface Sticker extends FileCommon {
    /**
     * Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video.
     */
    type: StickerType;

    /**
     * Sticker width
     */
    width: number;

    /**
     * Sticker height
     */
    height: number;

    /**
     * True, if the sticker is animated
     */
    is_animated: boolean;

    /**
     * True, if the sticker is a video sticker
     */
    is_video: boolean;

    /**
     * Sticker thumbnail in the .WEBP or .JPG format
     */
    thumb?: PhotoSize;

    /**
     * Emoji associated with the sticker
     */
    emoji?: string;

    /**
     * Name of the sticker set to which the sticker belongs
     */
    set_name?: string;

    /**
     * For premium regular stickers, premium animation for the sticker
     */
    premium_animation?: File;

    /**
     * For mask stickers, the position where the mask should be placed
     */
    mask_position?: MaskPosition;

    /**
     * For custom emoji stickers, unique identifier of the custom emoji
     */
    custom_emoji_id?: string;
}
