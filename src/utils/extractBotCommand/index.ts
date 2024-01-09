import type { Message } from '@typings/Message';

/**
 * Находит, вычленяет и возвращает команду для бота в начале текста сообщения
 * @param message Исходное сообщение
 * @returns Если команда есть, то команду и текст после команды, иначе undefined
 */
export function extractBotCommand(message: Message): [string, string] | undefined {
    const { entities, caption_entities, text, caption } = message;

    const entity = (entities ?? caption_entities ?? []).find(entity => entity.type === 'bot_command');

    if (!entity || entity.offset > 0) {
        return undefined;
    }

    const { offset, length } = entity;

    const messageText = (text ?? caption ?? '');
    const command = messageText.substring(offset, offset + length);
    const restText = messageText.substring(offset + length + 1);

    return [command, restText];
}
