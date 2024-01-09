import axios from 'axios';
import type { Stream } from 'stream';

import type { Bot } from '@bot';

type DownloadFileFunction<T> = (this: Bot, file_id: string) => Promise<T>;

async function downloadFile(
    this: Bot | null,
    responseType: 'blob' | 'stream' | 'arraybuffer',
    file_id: string,
): Promise<Blob | Stream | ArrayBuffer> {
    if (this === null) throw new Error('Use `downloadFile` as `downloadFile.call(bot, fileId)`');

    const file = await this.client.getFile({ file_id });

    const { data } = await axios({
        method: 'GET',
        url: `https://api.telegram.org/file/bot${this.config.secret}/${file.file_path}`,
        responseType,
    });

    return data;
}

export const downloadFileAsBlob = downloadFile.bind(null, 'blob') as DownloadFileFunction<Blob>;
export const downloadFileAsStream = downloadFile.bind(null, 'stream') as DownloadFileFunction<Stream>;
export const downloadFileAsArrayBuffer = downloadFile.bind(null, 'arraybuffer') as DownloadFileFunction<ArrayBuffer>;
