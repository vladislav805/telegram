import type { PhotoSize } from './Photo';
import type { FileCommon } from './FileCommon';

export interface Audio extends FileCommon {
    duration: number;
    performer?: string;
    title?: string;
    mime_type?: string;
    thumb?: PhotoSize;
}
