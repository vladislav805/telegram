import type { FileCommon } from './FileCommon';

/**
 * This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile.
 */
export interface File extends FileCommon {
    /**
     * File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file.
     */
    file_path?: string;
}
