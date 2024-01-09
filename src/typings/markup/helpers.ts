import type { ForceReply } from './ForceReplyMarkup';
import type { InlineKeyboardMarkup } from './InlineKeyboardMarkup';
import type { ReplyKeyboardMarkup, ReplyKeyboardRemove } from './ReplyKeyboardMarkup';

export type Markup =
    | ReplyKeyboardMarkup
    | InlineKeyboardMarkup
    | ReplyKeyboardRemove
    | ForceReply;
