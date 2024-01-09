import type { WebAppInfo } from '../WebAppInfo';

/**
 * This object represents an inline keyboard that appears right next to the message it belongs to.
 *
 * Note: This will only work in Telegram versions released after 9 April, 2016. Older clients will display unsupported message.
 */
export interface InlineKeyboardMarkup {
    /**
     * Array of button rows, each represented by an Array of InlineKeyboardButton objects
     */
    inline_keyboard: InlineKeyboardButton[][];
}

/**
 * This object represents one button of an inline keyboard. You must use exactly one of the optional fields.
 */
export interface InlineKeyboardButton {
    /** Label text on the button */
    text: string;

    /**
     * HTTP or tg:// url to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention
     * a user by their ID without using a username, if this is allowed by their privacy settings.
     */
    url?: string;

    /** Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes */
    callback_data?: string;

    /**
     * Description of the Web App that will be launched when the user presses the button. The Web App will be able
     * to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in
     * private chats between a user and the bot.
     * @see https://core.telegram.org/bots/webapps
     */
    web_app?: WebAppInfo;

    /**
     * An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget.
     * @see https://core.telegram.org/widgets/login
     */
    login_url?: LoginUrl;

    /**
     * If set, pressing the button will prompt the user to select one of their chats, open that chat and insert
     * the bot's username and the specified inline query in the input field. Can be empty, in which case just
     * the bot's username will be inserted.
     *
     * Note: This offers an easy way for users to start using your bot in inline mode when they are currently
     * in a private chat with it. Especially useful when combined with switch_pm… actions – in this case the user
     * will be automatically returned to the chat they switched from, skipping the chat selection screen.
     */
    switch_inline_query?: string;

    /**
     * If set, pressing the button will insert the bot's username and the specified inline query in the current
     * chat's input field. Can be empty, in which case only the bot's username will be inserted.
     *
     * This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting
     * something from multiple options.
     */
    switch_inline_query_current_chat?: string;

    /**
     * Description of the game that will be launched when the user presses the button.
     *
     * NOTE: This type of button must always be the first button in the first row.
     */
    callback_game?: CallbackGame;

    /**
     * Specify True, to send a Pay button.
     *
     * NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages.
     */
    pay?: boolean;
}

export interface LoginUrl {
    url: string;
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
}

export type CallbackGame = {};
