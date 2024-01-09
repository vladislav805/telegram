import type { WebAppInfo } from '../WebAppInfo';
import type { QuizType } from '../Poll';

/**
 * This object represents a custom keyboard with reply options (see Introduction to bots for details and examples).
 */
export interface ReplyKeyboardMarkup {
    /** Array of button rows, each represented by an Array of KeyboardButton objects */
    keyboard: ReplyKeyboardButton[][];

    /**
     * Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller
     * if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always
     * of the same height as the app's standard keyboard.
     */
    resize_keyboard?: boolean;

    /**
     * Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available,
     * but clients will automatically display the usual letter-keyboard in the chat – the user can press
     * a special button in the input field to see the custom keyboard again. Defaults to false.
     */
    one_time_keyboard?: boolean;

    /** The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
    input_field_placeholder?: string;

    /**
     * Use this parameter if you want to show the keyboard to specific users only. Targets:
     *   1) users that are @mentioned in the text of the Message object;
     *   2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
     *
     * Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select
     * the new language. Other users in the group don't see the keyboard.
     */
    selective?: boolean;
}

/**
 * This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this
 * object to specify text of the button. Optional fields web_app, request_contact, request_location, and request_poll
 * are mutually exclusive.
 *
 * - Note: request_contact and request_location options will only work in Telegram versions released after 9 April, 2016.
 *   Older clients will display unsupported message.
 * - Note: request_poll option will only work in Telegram versions released after 23 January, 2020. Older clients will
 *   display unsupported message.
 * - Note: web_app option will only work in Telegram versions released after 16 April, 2022. Older clients will display
 *   unsupported message.
 */
export interface ReplyKeyboardButton {
    /**
     * Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed.
     */
    text: string;

    /**
     * If True, the user's phone number will be sent as a contact when the button is pressed.
     * Available in private chats only.
     */
    request_contact?: boolean;

    /**
     * If True, the user's current location will be sent when the button is pressed.
     * Available in private chats only.
     */
    request_location?: boolean;

    /**
     * If specified, the user will be asked to create a poll and send it to the bot when the button is pressed.
     * Available in private chats only.
     */
    request_poll?: KeyboardButtonPollType;

    /**
     * If specified, the described Web App will be launched when the button is pressed. The Web App will be able
     * to send a “web_app_data” service message.
     * Available in private chats only.
     */
    web_app?: WebAppInfo;
}

/**
 * Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display
 * the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot.
 * An exception is made for one-time keyboards that are hidden immediately after the user presses
 * a button (see ReplyKeyboardMarkup).
 */
export interface ReplyKeyboardRemove {
    /**
     * Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want
     * to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup)
     */
    remove_keyboard: true;

    /**
     * Use this parameter if you want to remove the keyboard for specific users only. Targets:
     *   1) users that are `@mentioned` in the text of the Message object;
     *   2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
     */
    selective?: boolean;
}

/**
 * This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed.
 */
export interface KeyboardButtonPollType {
    /**
     * If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only
     * regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type.
     */
    type?: QuizType;
}
