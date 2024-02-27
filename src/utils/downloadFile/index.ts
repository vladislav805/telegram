import { ReadableStream } from 'stream/web';
import type { Bot } from '@bot';

type DownloadFileFunction<T> = (bot: Bot, file_id: string) => Promise<T>;

async function downloadFile(
    responseType: 'blob' | 'stream' | 'arraybuffer',
    bot: Bot,
    file_id: string,
): Promise<Blob | ReadableStream | ArrayBuffer> {
    const file = await bot.client.getFile({ file_id });

    const request = await fetch(`https://api.telegram.org/file/bot${bot.config.secret}/${file.file_path}`, {
        method: 'GET',
    });

    switch (responseType) {
        case 'arraybuffer': return request.arrayBuffer();
        case 'blob': return request.blob();
        case 'stream': return request.body as ReadableStream;
    }
}

export const downloadFileAsBlob = downloadFile.bind(null, 'blob') as DownloadFileFunction<Blob>;
export const downloadFileAsStream = downloadFile.bind(null, 'stream') as DownloadFileFunction<ReadableStream>;
export const downloadFileAsArrayBuffer = downloadFile.bind(null, 'arraybuffer') as DownloadFileFunction<ArrayBuffer>;
