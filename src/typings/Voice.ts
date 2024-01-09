import type { FileCommon } from './FileCommon';

export interface Voice extends FileCommon {
    duration: number;
    mime_type?: string;
}
