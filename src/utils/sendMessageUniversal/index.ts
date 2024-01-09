import type { CallbackQuery } from '@typings/CallbackQuery';
import type { Message } from '@typings/Message';
import type { BotClient } from '@client';
import type { IBot } from '@bot/typings';

/**
 * Объединение типов всех параметров функций отправки сообщения
 */
interface SendFunctionTypes {
    text: Parameters<BotClient['sendMessage']>[0];
    photo: Parameters<BotClient['sendPhoto']>[0];
    video: Parameters<BotClient['sendVideo']>[0];
    media: Parameters<BotClient['sendMediaGroup']>[0];
    audio: Parameters<BotClient['sendAudio']>[0];
    document: Parameters<BotClient['sendDocument']>[0];
    animation: Parameters<BotClient['sendAnimation']>[0];
    game: Parameters<BotClient['sendGame']>[0];
    sticker: Parameters<BotClient['sendSticker']>[0];
    contact: Parameters<BotClient['sendContact']>[0];
    dice: Parameters<BotClient['sendDice']>[0];
    poll: Parameters<BotClient['sendPoll']>[0];
    location: Parameters<BotClient['sendLocation']>[0];
    venue: Parameters<BotClient['sendVenue']>[0];
    video_note: Parameters<BotClient['sendVideoNote']>[0];
    voice: Parameters<BotClient['sendVoice']>[0];
}

/**
 * Ассоциация названий полей и названий методов
 * Пример: если в параметрах есть поле 'photo', то это отправка фотографии и метод sendPhoto
 */
const mediaMethods = {
    photo: 'sendPhoto',
    video: 'sendVideo',
    media: 'sendMediaGroup',
    audio: 'sendAudio',
    document: 'sendDocument',
    animation: 'sendAnimation',
    game: 'sendGame',
    sticker: 'sendSticker',
    contact: 'sendContact',
    dice: 'sendDice',
    poll: 'sendPoll',
    location: 'sendLocation',
    venue: 'sendVenue',
    video_note: 'sendVideoNote',
    voice: 'sendVoice',
    text: 'sendMessage',
} as const;

/**
 * Тип поля из параметров, по которому будет проводиться проверка объекта параметров
 */
type MediaKey = keyof typeof mediaMethods;

type Source = Message | CallbackQuery;

/**
 * Универсальная функция отправки сообщений, которая автоматически определяет метод для отправки по параметрам
 * @param bot Объект бота
 * @param type Тип медиа
 * @param params Параметры сообщения
 */
export function sendMessageUniversal<T extends MediaKey>(
    bot: IBot,
    source: Source,
    type: T,
    params: Omit<SendFunctionTypes[T], 'chat_id'>,
): Promise<Message> {
    const chat_id = 'chat_instance' in source ? source.from.id : source.chat.id;

    return type in mediaMethods && mediaMethods[type] in bot.client
        ? bot.client[mediaMethods[type]](Object.assign({ chat_id }, params) as any)
        : Promise.reject();
}

export type SendMessageUniversalFunction = <T extends MediaKey>(
    source: Source,
    type: T,
    params: Omit<SendFunctionTypes[T], 'chat_id'>,
) => Promise<Message>;
