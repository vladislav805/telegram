import type { FileCommon } from './FileCommon';
import type { PhotoSize } from './Photo';

export interface Video extends FileCommon {
    width: number;
    height: number;
    duration: number;
    thumb?: PhotoSize;
    mime_type?: string;
}
