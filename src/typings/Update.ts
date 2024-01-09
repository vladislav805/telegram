import type { Message } from './Message';
import type { InlineQuery } from './InlineQuery';
import type { ChosenInlineResult } from './ChosenInlineResult';
import type { CallbackQuery } from './CallbackQuery';
import type { Poll, PollAnswer } from './Poll';
import type { ChatMemberUpdated } from './ChatMemberUpdated';
import type { ChatJoinRequest } from './ChatJoinRequest';
import type { PreCheckoutQuery } from './PreCheckoutQuery';
import type { ShippingQuery } from './ShippingQuery';

/**
 * This object represents an incoming update.
 * At most one of the optional parameters can be present in any given update.
 */
export interface Update {
    /**
     * The update's unique identifier. Update identifiers start from a certain positive number and
     * increase sequentially. This ID becomes especially handy if you're using Webhooks, since it allows you
     * to ignore repeated updates or to restore the correct update sequence, should they get out of order.
     * If there are no new updates for at least a week, then identifier of the next update will be chosen
     * randomly instead of sequentially.
     */
    update_id: number;

    /** New incoming message of any kind — text, photo, sticker, etc. */
    message?: Message;

    /** New version of a message that is known to the bot and was edited */
    edited_message?: Message;

    /** New incoming channel post of any kind — text, photo, sticker, etc */
    channel_post?: Message;

    /** New version of a channel post that is known to the bot and was edited */
    edited_channel_post?: Message;

    /** New incoming inline query */
    inline_query?: InlineQuery;

    /**
     * The result of an inline query that was chosen by a user and sent to their chat partner.
     * @see https://core.telegram.org/bots/inline#collecting-feedback
     */
    chosen_inline_result?: ChosenInlineResult;

    /** New incoming callback query */
    callback_query?: CallbackQuery;

    /** New incoming shipping query. Only for invoices with flexible price */
    shipping_query?: ShippingQuery;

    /** New incoming pre-checkout query. Contains full information about checkout */
    pre_checkout_query?: PreCheckoutQuery;

    /** New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot */
    poll?: Poll;

    /**
     * A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by
     * the bot itself.
     */
    poll_answer?: PollAnswer;

    /**
     * The bot's chat member status was updated in a chat. For private chats, this update is received only when
     * the bot is blocked or unblocked by the user.
     */
    my_chat_member?: ChatMemberUpdated;

    /**
     * A chat member's status was updated in a chat. The bot must be an administrator in the chat and must
     * explicitly specify “chat_member” in the list of allowed_updates to receive these updates.
     */
    chat_member?: ChatMemberUpdated;

    /**
     * A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates.
     */
    chat_join_request?: ChatJoinRequest;
}
