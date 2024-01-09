import type { PhotoSize } from './Photo';
import type { Sticker } from './Sticker';

export type StickerSetType =
    | 'regular'
    | 'mask'
    | 'custom_emoji';

export interface StickerSet {
    name: string;
    title: string;
    sticker_type: StickerSetType;
    is_animated: boolean;
    is_video: boolean;
    /** @deprecated since Bot API v6.2 */
    contains_masks: boolean;
    stickers: Sticker[];
    thumb?: PhotoSize;
}
