import type { BotClient } from '@client';
import type { ChosenInlineResult } from '@typings/ChosenInlineResult';
import type { InlineQuery } from '@typings/InlineQuery';

type AnswerInlineQueryFunction = BotClient['answerInlineQuery'];
type AnswerInlineQueryParameters = Parameters<AnswerInlineQueryFunction>[0];
type AnswerInlineQueryShortcut = Omit<AnswerInlineQueryParameters, 'inline_query_id'>;

export interface IInlineQueryManagerOptions {
    onInlineQuery: (query: InlineQuery) => Promise<AnswerInlineQueryShortcut>;

    onResultChosen?: (query: ChosenInlineResult) => void | Promise<void>;
}
