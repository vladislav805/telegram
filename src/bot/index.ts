import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';

import type { Update } from '@typings/Update';
import type { Message } from '@typings/Message';
import type { IBotPlugin } from '@plugins/typings';
import { BotClient } from '@client';
import { sendMessageUniversal } from '@utils/sendMessageUniversal';
import type { SendMessageUniversalFunction } from '@utils/sendMessageUniversal';
import { delay } from '@utils/delay';

import type { EventListener, EventType, IBot } from './typings';

interface BotConfig {
    secret: string;
    apiUrl?: string;
    maxFailuresInRow?: number;
}

export class Bot implements IBot {
    protected static readonly defaultConfig: Required<BotConfig> = {
        secret: 'never_used',
        apiUrl: 'https://api.telegram.org',
        maxFailuresInRow: 3,
    };

    public readonly config: Required<BotConfig>;
    public readonly client: BotClient;

    protected readonly LONGPOLL_TIMEOUT = 25;

    public readonly sendMessageUniversal: SendMessageUniversalFunction;

    public constructor(config: BotConfig) {
        if (!config.secret) {
            throw new Error('secret not specified');
        }

        this.client = new BotClient(this.request.bind(this));
        this.config = { ...Bot.defaultConfig, ...config };

        this.sendMessageUniversal = sendMessageUniversal.bind(null, this);
    }

    public use(plugin: IBotPlugin): this {
        plugin.register(this);
        return this;
    }

    protected getApiEndpoint(method: string): string {
        return `${this.config.apiUrl}/bot${this.config.secret}/${method}`;
    }

    protected createFormDataFromParams(params: Record<string, unknown>): FormData {
        return Object.entries(params).reduce((form, [key, value]) => {
            // Нет значения - пропускаем параметр
            if (value === undefined || value === null) {
                return form;
            }

            // Передана строка, в поле, где может быть файл и не URL на удалённый ресурс, да ещё и файл существует
            if (
                typeof value === 'string' &&
                ['photo', 'video', 'audio', 'document'].includes(key) &&
                !value.startsWith('http') &&
                fs.existsSync(value)
            ) {
                value = fs.createReadStream(value);
            }

            if (value instanceof Buffer || value instanceof fs.ReadStream) {
                let filename = 'filename'; // fallback

                if ('__filename' in params) {
                    filename = params.__filename as string; // user-specified name
                } else if (value instanceof fs.ReadStream && typeof value.path === 'string') {
                    filename = path.basename(value.path); // file stream path
                }

                form.append(key, value, { filename });
                return form;
            }

            switch (typeof value) {
                case 'number':
                case 'boolean': {
                    value = String(value);
                    break;
                }

                case 'object': {
                    value = JSON.stringify(value);
                    break;
                }
            }

            form.append(key, value);

            return form;
        }, new FormData());
    }

    protected async request<T>(apiMethod: string, params: Record<string, unknown> = {}): Promise<T> {
        let attempt = Number(params.__attempt__) || 0;

        type ResultOk = {
            ok: true;
            result: T;
        };

        type ResultError = {
            ok: false;
            error_code: number;
            description: string;
        };

        type Result = ResultOk | ResultError;

        const url = this.getApiEndpoint(apiMethod);
        const form = this.createFormDataFromParams(params);

        const timeout = apiMethod === 'getUpdates' ? (this.LONGPOLL_TIMEOUT + 4) * 1000 : 5000;

        try {
            const { data, status, statusText } = await axios.request<Result>({
                method: 'POST',
                url,
                data: form,
                headers: form.getHeaders(),
                timeout,
                responseType: 'json',
            });

            if (data?.ok) {
                return data.result;
            }

            throw new Error(`Error HTTP ${status} ${statusText}: ${(data as ResultError)?.description}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('axios error:', error);

                if ((params.__attempt__ = ++attempt) <= this.config.maxFailuresInRow) {
                    return this.request(apiMethod, params);
                }
            }

            throw error;
        }
    }

    protected readonly listeners: Partial<Record<EventType, Set<(obj: any) => unknown>>> = {};

    public on<Event extends EventType>(event: Event, listener: EventListener<Required<Update>[Event]>): this {
        (this.listeners[event] ?? (this.listeners[event] = new Set())).add(listener);

        return this;
    }

    protected fire<Event extends EventType>(event: Event, object: Required<Update>[Event]): this {
        const listenersOfEvent = this.listeners[event];

        if (listenersOfEvent) {
            for (const listener of listenersOfEvent.values()) {
                const result = listener(object);

                if (result === true) {
                    break;
                }
            }
        }

        return this;
    }

    private isPollingActive: boolean = false;

    private pollingOffset: number | undefined;

    public startPolling(): void {
        if (this.isPollingActive) return;

        this.isPollingActive = true;

        let errorCountInRow = 0;

        (async() => {
            while (this.isPollingActive) {
                try {
                    // eslint-disable-next-line no-await-in-loop
                    await this.poll();

                    errorCountInRow = 0;
                } catch (e) {
                    ++errorCountInRow;

                    await delay(5000);

                    if (errorCountInRow > this.config.maxFailuresInRow) {
                        console.error(`${this.config.maxFailuresInRow} requests in a row failed. The bot has stopped.`);
                        process.exit(5);
                    }
                }
            }
        })();
    };

    public stopPolling(): void {
        this.isPollingActive = false;
    }

    private async poll(): Promise<void> {
        const response = await this.client.getUpdates({ offset: this.pollingOffset, timeout: this.LONGPOLL_TIMEOUT });

        if (response.length) {
            this.pollingOffset = response[response.length - 1].update_id + 1;
        }

        try {
            response.forEach(update => this.handleUpdate(update));
        } catch (e) {}
    }

    protected static readonly updateKeys: EventType[] = [
        'message',
        'edited_message',
        'channel_post',
        'edited_channel_post',
        'inline_query',
        'chosen_inline_result',
        'chat_member',
        'chat_join_request',
        'my_chat_member',
        'poll',
        'poll_answer',
        'callback_query',
        'shipping_query',
        'pre_checkout_query',
    ];

    protected handleUpdate(update: Update): void {
        const key = Bot.updateKeys.find(key => key in update);

        if (key) {
            this.fire(key, update[key] as unknown as Message); // по факту, здесь будет правильный тип/объект
        }
    }
}
