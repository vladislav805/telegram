import type { FileCommon } from './FileCommon';
import type { PhotoSize } from './Photo';

export interface Document extends FileCommon {
    thumb?: PhotoSize;
    file_name?: string;
    mime_type?: string;
}
