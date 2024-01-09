import type { IBotPlugin } from '@plugins/typings';
import type { Update } from '@typings/Update';
import type { BotClient } from '@client';

export type EventType = Exclude<keyof Update, 'update_id'>;
export type EventListener<T> = (obj: T) => void;

export interface IBot {
    client: BotClient;

    use(middleware: IBotPlugin): this;

    on<Event extends EventType>(event: Event, object: EventListener<Required<Update>[Event]>): this;
}
