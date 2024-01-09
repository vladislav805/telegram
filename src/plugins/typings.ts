import type { IBot } from '@bot/typings';

export interface IBotPlugin {
    register(bot: IBot): void;
    // unregister(bot: Bot): void;
}
