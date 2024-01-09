import type { File } from './File';
import type { MaskPosition } from './MaskPosition';
import type { PhotoSize } from './Photo';

export type StickerType =
    | 'regular'
    | 'mask'
    | 'custom_emoji';

export interface Sticker {
    file_id: string;
    file_unique_id: string;
    type: StickerType;
    width: number;
    height: number;
    is_animated?: boolean;
    is_video?: boolean;
    thumb?: PhotoSize;
    emoji?: string;
    set_name?: string;
    premium_animation?: File;
    mask_position?: MaskPosition;
    custom_emoji_id?: string;
    file_size?: number;
}
