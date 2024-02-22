import axios from 'axios';
import type { Stream } from 'stream';

import type { Bot } from '@bot';

type DownloadFileFunction<T> = (bot: Bot, file_id: string) => Promise<T>;

async function downloadFile(
    responseType: 'blob' | 'stream' | 'arraybuffer',
    bot: Bot,
    file_id: string,
): Promise<Blob | Stream | ArrayBuffer> {
    const file = await bot.client.getFile({ file_id });

    const { data } = await axios({
        method: 'GET',
        url: `https://api.telegram.org/file/bot${bot.config.secret}/${file.file_path}`,
        responseType,
    });

    return data;
}

export const downloadFileAsBlob = downloadFile.bind(null, 'blob') as DownloadFileFunction<Blob>;
export const downloadFileAsStream = downloadFile.bind(null, 'stream') as DownloadFileFunction<Stream>;
export const downloadFileAsArrayBuffer = downloadFile.bind(null, 'arraybuffer') as DownloadFileFunction<ArrayBuffer>;
