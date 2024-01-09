import type { IBot } from '@bot/typings';
import type { IBotPlugin } from '@plugins/typings';
import type { ChosenInlineResult } from '@typings/ChosenInlineResult';
import type { InlineQuery } from '@typings/InlineQuery';

import type { IInlineQueryManagerOptions } from './typings';

export class InlineQueryManager implements IBotPlugin {
    public constructor(
        protected readonly options: IInlineQueryManagerOptions,
    ) {

    }

    protected async onInlineQuery(bot: IBot, query: InlineQuery): Promise<void> {
        const results = await this.options.onInlineQuery(query);

        await bot.client.answerInlineQuery({ inline_query_id: query.id, ...results });
    }

    protected onChosenResult(bot: IBot, query: ChosenInlineResult): void {
        this.options.onResultChosen?.(query);
    }

    public register(bot: IBot): void {
        bot.on('inline_query', this.onInlineQuery.bind(this, bot));
        bot.on('chosen_inline_result', this.onChosenResult.bind(this, bot));
    }
}
