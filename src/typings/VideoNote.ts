import type { PhotoSize } from './Photo';
import type { FileCommon } from './FileCommon';

export interface VideoNote extends FileCommon {
    length: number;
    duration: number;
    thumb?: PhotoSize;
}
