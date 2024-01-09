import type { FileCommon } from './FileCommon';

/**
 * This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB.
 */
export interface PassportFile extends FileCommon {
    /**
     * Unix time when the file was uploaded
     */
    file_date: number;
}
