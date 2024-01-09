import type { FileCommon } from './FileCommon';

export type Photo = PhotoSize[];

export interface PhotoSize extends FileCommon {
    width: number;
    height: number;
}
