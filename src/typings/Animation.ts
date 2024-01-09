import type { PhotoSize } from './Photo';
import type { FileCommon } from './FileCommon';

export interface Animation extends FileCommon {
    width: number;
    height: number;
    duration: number;
    thumb?: PhotoSize;
    file_name?: string;
    mime_type?: string;
}
