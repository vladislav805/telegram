import type { Stream } from 'stream';

/**
 * This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser.
 *
 *  There are three ways to send files (photos, stickers, audio, media, etc.):
 *
 * Sending by file_id
 *
 * Sending by URL
 *
 * Objects and methods used in the inline mode are described in the Inline mode section.
 */
export type InputFile = string | Buffer | Stream;
