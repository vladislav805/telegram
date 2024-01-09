export interface FileCommon {
    /**
     * Identifier for this file, which can be used to download or reuse the file
     */
    file_id: string;

    /**
     * Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
     */
    file_unique_id: string;

    /**
     * File size in bytes
     */
    file_size?: number;
}
