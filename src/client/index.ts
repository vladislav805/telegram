import type { MessageEntity } from '@typings/MessageEntity';
import type { Update } from '@typings/Update';
import type { InputFile } from '@typings/InputFile';
import type { InlineKeyboardMarkup } from '@typings/InlineKeyboardMarkup';
import type { ReplyKeyboardMarkup } from '@typings/ReplyKeyboardMarkup';
import type { ReplyKeyboardRemove } from '@typings/ReplyKeyboardRemove';
import type { ForceReply } from '@typings/ForceReply';
import type { Message } from '@typings/Message';
import type { WebhookInfo } from '@typings/WebhookInfo';
import type { User } from '@typings/User';
import type { BotCommand } from '@typings/BotCommand';
import type { MaskPosition } from '@typings/MaskPosition';
import type { File } from '@typings/File';
import type { UserProfilePhotos } from '@typings/UserProfilePhotos';
import type { Chat } from '@typings/Chat';
import type { ChatPermissions } from '@typings/ChatPermissions';
import type { ChatInviteLink } from '@typings/ChatInviteLink';
import type { ChatMember } from '@typings/ChatMember';
import type { BotCommandScope } from '@typings/BotCommandScope';
import type { MenuButton } from '@typings/MenuButton';
import type { ChatAdministratorRights } from '@typings/ChatAdministratorRights';
import type { InputMedia } from '@typings/InputMedia';
import type { Poll } from '@typings/Poll';
import type { StickerSet, StickerSetType } from '@typings/StickerSet';
import type { InlineQueryResult } from '@typings/InlineQueryResult';
import type { SentWebAppMessage } from '@typings/SentWebAppMessage';
import type { GameHighScore } from '@typings/GameHighScore';
import type { ShippingOption } from '@typings/ShippingOption';
import type { PassportElementError } from '@typings/PassportElementError';
import type { LabeledPrice } from '@typings/LabeledPrice';
import type { InputMediaAudio } from '@typings/InputMediaAudio';
import type { InputMediaDocument } from '@typings/InputMediaDocument';
import type { InputMediaPhoto } from '@typings/InputMediaPhoto';
import type { InputMediaVideo } from '@typings/InputMediaVideo';
import type { Sticker } from '@typings/Sticker';
import type { ParseMode } from '@typings/ParseMode';

export class BotClient {
    public constructor(
        protected readonly request: <T>(method: string, params?: Record<string, unknown>) => Promise<T>,
    ) {
    }

    /**
     * Use this method to receive incoming updates using long polling (wiki). An Array of Update objects is
     * returned.
     */
    public getUpdates(params: {
        /**
         * Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers
         * of previously received updates. By default, updates starting with the earliest unconfirmed update are
         * returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its
         * update_id. The negative offset can be specified to retrieve updates starting from -offset update from the
         * end of the updates queue. All previous updates will forgotten.
         */
        offset?: number;

        /**
         * Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
         */
        limit?: number;

        /**
         * Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short
         * polling should be used for testing purposes only.
         */
        timeout?: number;

        /**
         * A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”,
         * “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete
         * list of available update types. Specify an empty list to receive all update types except chat_member
         * (default). If not specified, the previous setting will be used.Please note that this parameter doesn't
         * affect updates created before the call to the getUpdates, so unwanted updates may be received for a short
         * period of time.
         */
        allowed_updates?: Array<Exclude<keyof Update, 'update_id'>>;
    }): Promise<Update[]> {
        return this.request('getUpdates', params);
    }

    /**
     * Use this method to specify a url and receive incoming updates via an outgoing webhook. Whenever there is an
     * update for the bot, we will send an HTTPS POST request to the specified url, containing a JSON-serialized
     * Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns
     * True on success.
     *
     * If you'd like to make sure that the Webhook request comes from Telegram, we recommend using a secret path in
     * the URL, e.g. https://www.example.com/<token>. Since nobody else knows your bot's token, you can be pretty
     * sure it's us.
     */
    public setWebhook(params: {
        /**
         * HTTPS url to send updates to. Use an empty string to remove webhook integration
         */
        url: string;

        /**
         * Upload your public key certificate so that the root certificate in use can be checked. See our self-signed
         * guide for details.
         */
        certificate?: InputFile;

        /**
         * The fixed IP address which will be used to send webhook requests instead of the IP address resolved through
         * DNS
         */
        ip_address?: string;

        /**
         * Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults
         * to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's
         * throughput.
         */
        max_connections?: number;

        /**
         * A JSON-serialized list of the update types you want your bot to receive. For example, specify [“message”,
         * “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a complete
         * list of available update types. Specify an empty list to receive all update types except chat_member
         * (default). If not specified, the previous setting will be used.Please note that this parameter doesn't
         * affect updates created before the call to the setWebhook, so unwanted updates may be received for a short
         * period of time.
         */
        allowed_updates?: String[];

        /**
         * Pass True to drop all pending updates
         */
        drop_pending_updates?: boolean;

        /**
         * A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request,
         * 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that
         * the request comes from a webhook set by you.
         */
        secret_token?: string;
    }): Promise<true> {
        return this.request('setWebhook', params);
    }

    /**
     * Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on
     * success.
     */
    public deleteWebhook(params: {
        /**
         * Pass True to drop all pending updates
         */
        drop_pending_updates?: boolean;
    }): Promise<true> {
        return this.request('deleteWebhook', params);
    }

    /**
     * Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo
     * object. If the bot is using getUpdates, will return an object with the url field empty.
     */
    public getWebhookInfo(): Promise<WebhookInfo> {
        return this.request('getWebhookInfo');
    }

    /**
     * A simple method for testing your bot's authentication token. Requires no parameters. Returns basic
     * information about the bot in form of a User object.
     */
    public getMe(): Promise<User> {
        return this.request('getMe');
    }

    /**
     * Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out
     * the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After
     * a successful call, you can immediately log in on a local server, but will not be able to log in back to the
     * cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters.
     */
    public logOut(): Promise<true> {
        return this.request('logOut');
    }

    /**
     * Use this method to close the bot instance before moving it from one local server to another. You need to
     * delete the webhook before calling this method to ensure that the bot isn't launched again after server
     * restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on
     * success. Requires no parameters.
     */
    public close(): Promise<true> {
        return this.request('close');
    }

    /**
     * Use this method to send text messages. On success, the sent Message is returned.
     *
     * The Bot API supports basic formatting for messages. You can use bold, italic, underlined, strikethrough, and
     * spoiler text, as well as inline links and pre-formatted code in your bots' messages. Telegram clients will
     * render them accordingly. You can use either markdown-style or HTML-style formatting.
     *
     * Note that Telegram clients will display an alert to the user before opening an inline link ('Open this
     * link?' together with the full URL).
     *
     * Message entities can be nested, providing following restrictions are met:- If two entities have common
     * characters then one of them is fully contained inside another.- bold, italic, underline, strikethrough, and
     * spoiler entities can contain and can be part of any other entities, except pre and code.- All other entities
     * can't contain each other.
     *
     * Links tg://user?id=<user_id> can be used to mention a user by their ID without using a username. Please
     * note:
     *
     * To use this mode, pass MarkdownV2 in the parse_mode field. Use the following syntax in your message:
     *
     * Please note:
     *
     * To use this mode, pass HTML in the parse_mode field. The following tags are currently supported:
     *
     * Please note:
     *
     * This is a legacy mode, retained for backward compatibility. To use this mode, pass Markdown in the
     * parse_mode field. Use the following syntax in your message:
     *
     * Please note:
     */
    public sendMessage(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Text of the message to be sent, 1-4096 characters after entities parsing
         */
        text: string;

        /**
         * Mode for parsing entities in the message text. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in message text, which can be specified instead of
         * parse_mode
         */
        entities?: MessageEntity[];

        /**
         * Disables link previews for links in this message
         */
        disable_web_page_preview?: boolean;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: ReplyKeyboardMarkup | InlineKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendMessage', params);
    }

    /**
     * Use this method to forward messages of any kind. Service messages can't be forwarded. On success, the sent
     * Message is returned.
     */
    public forwardMessage(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier for the chat where the original message was sent (or channel username in the format
         * @channelusername)
         */
        from_chat_id: number | string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the forwarded message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * Message identifier in the chat specified in from_chat_id
         */
        message_id: number;
    }): Promise<Message> {
        return this.request('forwardMessage', params);
    }

    /**
     * Use this method to copy messages of any kind. Service messages and invoice messages can't be copied. The
     * method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original
     * message. Returns the MessageId of the sent message on success.
     */
    public copyMessage(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier for the chat where the original message was sent (or channel username in the format
         * @channelusername)
         */
        from_chat_id: number | string;

        /**
         * Message identifier in the chat specified in from_chat_id
         */
        message_id: number;

        /**
         * New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is
         * kept
         */
        caption?: string;

        /**
         * Mode for parsing entities in the new caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('copyMessage', params);
    }

    /**
     * Use this method to send photos. On success, the sent Message is returned.
     */
    public sendPhoto(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended),
         * pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using
         * multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed
         * 10000 in total. Width and height ratio must be at most 20. More info on Sending Files »
         */
        photo: InputFile | string;

        /**
         * Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the photo caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendPhoto', params);
    }

    /**
     * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your
     * audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send
     * audio files of up to 50 MB in size, this limit may be changed in the future.
     *
     * For sending voice messages, use the sendVoice method instead.
     */
    public sendAudio(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers
         * (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a
         * new one using multipart/form-data. More info on Sending Files »
         */
        audio: InputFile | string;

        /**
         * Audio caption, 0-1024 characters after entities parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the audio caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Duration of the audio in seconds
         */
        duration?: number;

        /**
         * Performer
         */
        performer?: string;

        /**
         * Track name
         */
        title?: string;

        /**
         * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
         * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should
         * not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused
         * and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was
         * uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
         */
        thumb?: InputFile | string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendAudio', params);
    }

    /**
     * Use this method to send general files. On success, the sent Message is returned. Bots can currently send
     * files of any type of up to 50 MB in size, this limit may be changed in the future.
     */
    public sendDocument(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended),
         * pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using
         * multipart/form-data. More info on Sending Files »
         */
        document: InputFile | string;

        /**
         * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
         * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should
         * not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused
         * and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was
         * uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
         */
        thumb?: InputFile | string;

        /**
         * Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities
         * parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the document caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Disables automatic server-side content type detection for files uploaded using multipart/form-data
         */
        disable_content_type_detection?: boolean;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendDocument', params);
    }

    /**
     * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as
     * Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in
     * size, this limit may be changed in the future.
     */
    public sendVideo(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended),
         * pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using
         * multipart/form-data. More info on Sending Files »
         */
        video: InputFile | string;

        /**
         * Duration of sent video in seconds
         */
        duration?: number;

        /**
         * Video width
         */
        width?: number;

        /**
         * Video height
         */
        height?: number;

        /**
         * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
         * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should
         * not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused
         * and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was
         * uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
         */
        thumb?: InputFile | string;

        /**
         * Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the video caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Pass True, if the uploaded video is suitable for streaming
         */
        supports_streaming?: boolean;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendVideo', params);
    }

    /**
     * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent
     * Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be
     * changed in the future.
     */
    public sendAnimation(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers
         * (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a
         * new animation using multipart/form-data. More info on Sending Files »
         */
        animation: InputFile | string;

        /**
         * Duration of sent animation in seconds
         */
        duration?: number;

        /**
         * Animation width
         */
        width?: number;

        /**
         * Animation height
         */
        height?: number;

        /**
         * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
         * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should
         * not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused
         * and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was
         * uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
         */
        thumb?: InputFile | string;

        /**
         * Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities
         * parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the animation caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendAnimation', params);
    }

    /**
     * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice
     * message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent
     * as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of
     * up to 50 MB in size, this limit may be changed in the future.
     */
    public sendVoice(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers
         * (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new
         * one using multipart/form-data. More info on Sending Files »
         */
        voice: InputFile | string;

        /**
         * Voice message caption, 0-1024 characters after entities parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the voice message caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * Duration of the voice message in seconds
         */
        duration?: number;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendVoice', params);
    }

    /**
     * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to
     * send video messages. On success, the sent Message is returned.
     */
    public sendVideoNote(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers
         * (recommended) or upload a new video using multipart/form-data. More info on Sending Files ». Sending video
         * notes by a URL is currently unsupported
         */
        video_note: InputFile | string;

        /**
         * Duration of sent video in seconds
         */
        duration?: number;

        /**
         * Video width and height, i.e. diameter of the video message
         */
        length?: number;

        /**
         * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
         * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should
         * not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused
         * and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was
         * uploaded using multipart/form-data under <file_attach_name>. More info on Sending Files »
         */
        thumb?: InputFile | string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendVideoNote', params);
    }

    /**
     * Use this method to send a group of photos, videos, documents or audios as an album. Documents and audio
     * files can be only grouped in an album with messages of the same type. On success, an array of Messages that
     * were sent is returned.
     */
    public sendMediaGroup(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * A JSON-serialized array describing messages to be sent, must include 2-10 items
         */
        media: (InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo)[];

        /**
         * Sends messages silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent messages from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the messages are a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;
    }): Promise<Message> {
        return this.request('sendMediaGroup', params);
    }

    /**
     * Use this method to send point on the map. On success, the sent Message is returned.
     */
    public sendLocation(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Latitude of the location
         */
        latitude: number;

        /**
         * Longitude of the location
         */
        longitude: number;

        /**
         * The radius of uncertainty for the location, measured in meters; 0-1500
         */
        horizontal_accuracy?: number;

        /**
         * Period in seconds for which the location will be updated (see Live Locations, should be between 60 and
         * 86400.
         */
        live_period?: number;

        /**
         * For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if
         * specified.
         */
        heading?: number;

        /**
         * For live locations, a maximum distance for proximity alerts about approaching another chat member, in
         * meters. Must be between 1 and 100000 if specified.
         */
        proximity_alert_radius?: number;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendLocation', params);
    }

    /**
     * Use this method to edit live location messages. A location can be edited until its live_period expires or
     * editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is
     * not an inline message, the edited Message is returned, otherwise True is returned.
     */
    public editMessageLiveLocation(params: {
        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the
         * target channel (in the format @channelusername)
         */
        chat_id?: number | string;

        /**
         * Required if inline_message_id is not specified. Identifier of the message to edit
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;

        /**
         * Latitude of new location
         */
        latitude: number;

        /**
         * Longitude of new location
         */
        longitude: number;

        /**
         * The radius of uncertainty for the location, measured in meters; 0-1500
         */
        horizontal_accuracy?: number;

        /**
         * Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified.
         */
        heading?: number;

        /**
         * Maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1
         * and 100000 if specified.
         */
        proximity_alert_radius?: number;

        /**
         * A JSON-serialized object for a new inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message> {
        return this.request('editMessageLiveLocation', params);
    }

    /**
     * Use this method to stop updating a live location message before live_period expires. On success, if the
     * message is not an inline message, the edited Message is returned, otherwise True is returned.
     */
    public stopMessageLiveLocation(params: {
        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the
         * target channel (in the format @channelusername)
         */
        chat_id?: number | string;

        /**
         * Required if inline_message_id is not specified. Identifier of the message with live location to stop
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;

        /**
         * A JSON-serialized object for a new inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message> {
        return this.request('stopMessageLiveLocation', params);
    }

    /**
     * Use this method to send information about a venue. On success, the sent Message is returned.
     */
    public sendVenue(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Latitude of the venue
         */
        latitude: number;

        /**
         * Longitude of the venue
         */
        longitude: number;

        /**
         * Name of the venue
         */
        title: string;

        /**
         * Address of the venue
         */
        address: string;

        /**
         * Foursquare identifier of the venue
         */
        foursquare_id?: string;

        /**
         * Foursquare type of the venue, if known. (For example, “arts_entertainment/default”,
         * “arts_entertainment/aquarium” or “food/icecream”.)
         */
        foursquare_type?: string;

        /**
         * Google Places identifier of the venue
         */
        google_place_id?: string;

        /**
         * Google Places type of the venue. (See supported types.)
         */
        google_place_type?: string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendVenue', params);
    }

    /**
     * Use this method to send phone contacts. On success, the sent Message is returned.
     */
    public sendContact(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Contact's phone number
         */
        phone_number: string;

        /**
         * Contact's first name
         */
        first_name: string;

        /**
         * Contact's last name
         */
        last_name?: string;

        /**
         * Additional data about the contact in the form of a vCard, 0-2048 bytes
         */
        vcard?: string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendContact', params);
    }

    /**
     * Use this method to send a native poll. On success, the sent Message is returned.
     */
    public sendPoll(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Poll question, 1-300 characters
         */
        question: string;

        /**
         * A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
         */
        options: String[];

        /**
         * True, if the poll needs to be anonymous, defaults to True
         */
        is_anonymous?: boolean;

        /**
         * Poll type, “quiz” or “regular”, defaults to “regular”
         */
        type?: string;

        /**
         * True, if the poll allows multiple answers, ignored for polls in quiz mode, defaults to False
         */
        allows_multiple_answers?: boolean;

        /**
         * 0-based identifier of the correct answer option, required for polls in quiz mode
         */
        correct_option_id?: number;

        /**
         * Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll,
         * 0-200 characters with at most 2 line feeds after entities parsing
         */
        explanation?: string;

        /**
         * Mode for parsing entities in the explanation. See formatting options for more details.
         */
        explanation_parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the poll explanation, which can be specified
         * instead of parse_mode
         */
        explanation_entities?: MessageEntity[];

        /**
         * Amount of time in seconds the poll will be active after creation, 5-600. Can't be used together with
         * close_date.
         */
        open_period?: number;

        /**
         * Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more
         * than 600 seconds in the future. Can't be used together with open_period.
         */
        close_date?: number;

        /**
         * Pass True, if the poll needs to be immediately closed. This can be useful for poll preview.
         */
        is_closed?: boolean;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendPoll', params);
    }

    /**
     * Use this method to send an animated emoji that will display a random value. On success, the sent Message is
     * returned.
     */
    public sendDice(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Emoji on which the dice throw animation is based. Currently, must be one of “”, “”, “”, “”, “”, or “”. Dice
         * can have values 1-6 for “”, “” and “”, values 1-5 for “” and “”, and values 1-64 for “”. Defaults to “”
         */
        emoji?: string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendDice', params);
    }

    /**
     * Use this method when you need to tell the user that something is happening on the bot's side. The status is
     * set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
     * Returns True on success.
     *
     * We only recommend using this method when a response from the bot will take a noticeable amount of time to
     * arrive.
     */
    public sendChatAction(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text
         * messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for
         * voice notes, upload_document for general files, choose_sticker for stickers, find_location for location
         * data, record_video_note or upload_video_note for video notes.
         */
        action: string;
    }): Promise<true> {
        return this.request('sendChatAction', params);
    }

    /**
     * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
     */
    public getUserProfilePhotos(params: {
        /**
         * Unique identifier of the target user
         */
        user_id: number;

        /**
         * Sequential number of the first photo to be returned. By default, all photos are returned.
         */
        offset?: number;

        /**
         * Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100.
         */
        limit?: number;
    }): Promise<UserProfilePhotos> {
        return this.request('getUserProfilePhotos', params);
    }

    /**
     * Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can
     * download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded
     * via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the
     * response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one
     * can be requested by calling getFile again.
     *
     * Note: This function may not preserve the original file name and MIME type. You should save the file's MIME
     * type and name (if available) when the File object is received.
     */
    public getFile(params: {
        /**
         * File identifier to get info about
         */
        file_id: string;
    }): Promise<File> {
        return this.request('getFile', params);
    }

    /**
     * Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and
     * channels, the user will not be able to return to the chat on their own using invite links, etc., unless
     * unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate
     * administrator rights. Returns True on success.
     */
    public banChatMember(params: {
        /**
         * Unique identifier for the target group or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;

        /**
         * Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30
         * seconds from the current time they are considered to be banned forever. Applied for supergroups and channels
         * only.
         */
        until_date?: number;

        /**
         * Pass True to delete all messages from the chat for the user that is being removed. If False, the user will
         * be able to see messages in the group that were sent before the user was removed. Always True for supergroups
         * and channels.
         */
        revoke_messages?: boolean;
    }): Promise<true> {
        return this.request('banChatMember', params);
    }

    /**
     * Use this method to unban a previously banned user in a supergroup or channel. The user will not return to
     * the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator
     * for this to work. By default, this method guarantees that after the call the user is not a member of the
     * chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the
     * chat. If you don't want this, use the parameter only_if_banned. Returns True on success.
     */
    public unbanChatMember(params: {
        /**
         * Unique identifier for the target group or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;

        /**
         * Do nothing if the user is not banned
         */
        only_if_banned?: boolean;
    }): Promise<true> {
        return this.request('unbanChatMember', params);
    }

    /**
     * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for
     * this to work and must have the appropriate administrator rights. Pass True for all permissions to lift
     * restrictions from a user. Returns True on success.
     */
    public restrictChatMember(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup (in the format
         * @supergroupusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;

        /**
         * A JSON-serialized object for new user permissions
         */
        permissions: ChatPermissions;

        /**
         * Date when restrictions will be lifted for the user, unix time. If user is restricted for more than 366 days
         * or less than 30 seconds from the current time, they are considered to be restricted forever
         */
        until_date?: number;
    }): Promise<true> {
        return this.request('restrictChatMember', params);
    }

    /**
     * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator
     * in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean
     * parameters to demote a user. Returns True on success.
     */
    public promoteChatMember(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;

        /**
         * Pass True, if the administrator's presence in the chat is hidden
         */
        is_anonymous?: boolean;

        /**
         * Pass True, if the administrator can access the chat event log, chat statistics, message statistics in
         * channels, see channel members, see anonymous administrators in supergroups and ignore slow mode. Implied by
         * any other administrator privilege
         */
        can_manage_chat?: boolean;

        /**
         * Pass True, if the administrator can create channel posts, channels only
         */
        can_post_messages?: boolean;

        /**
         * Pass True, if the administrator can edit messages of other users and can pin messages, channels only
         */
        can_edit_messages?: boolean;

        /**
         * Pass True, if the administrator can delete messages of other users
         */
        can_delete_messages?: boolean;

        /**
         * Pass True, if the administrator can manage video chats
         */
        can_manage_video_chats?: boolean;

        /**
         * Pass True, if the administrator can restrict, ban or unban chat members
         */
        can_restrict_members?: boolean;

        /**
         * Pass True, if the administrator can add new administrators with a subset of their own privileges or demote
         * administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed
         * by him)
         */
        can_promote_members?: boolean;

        /**
         * Pass True, if the administrator can change chat title, photo and other settings
         */
        can_change_info?: boolean;

        /**
         * Pass True, if the administrator can invite new users to the chat
         */
        can_invite_users?: boolean;

        /**
         * Pass True, if the administrator can pin messages, supergroups only
         */
        can_pin_messages?: boolean;
    }): Promise<true> {
        return this.request('promoteChatMember', params);
    }

    /**
     * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True
     * on success.
     */
    public setChatAdministratorCustomTitle(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup (in the format
         * @supergroupusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;

        /**
         * New custom title for the administrator; 0-16 characters, emoji are not allowed
         */
        custom_title: string;
    }): Promise<true> {
        return this.request('setChatAdministratorCustomTitle', params);
    }

    /**
     * Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of
     * the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an
     * administrator in the supergroup or channel for this to work and must have the appropriate administrator
     * rights. Returns True on success.
     */
    public banChatSenderChat(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target sender chat
         */
        sender_chat_id: number;
    }): Promise<true> {
        return this.request('banChatSenderChat', params);
    }

    /**
     * Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an
     * administrator for this to work and must have the appropriate administrator rights. Returns True on success.
     */
    public unbanChatSenderChat(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target sender chat
         */
        sender_chat_id: number;
    }): Promise<true> {
        return this.request('unbanChatSenderChat', params);
    }

    /**
     * Use this method to set default chat permissions for all members. The bot must be an administrator in the
     * group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns
     * True on success.
     */
    public setChatPermissions(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup (in the format
         * @supergroupusername)
         */
        chat_id: number | string;

        /**
         * A JSON-serialized object for new default chat permissions
         */
        permissions: ChatPermissions;
    }): Promise<true> {
        return this.request('setChatPermissions', params);
    }

    /**
     * Use this method to generate a new primary invite link for a chat; any previously generated primary link is
     * revoked. The bot must be an administrator in the chat for this to work and must have the appropriate
     * administrator rights. Returns the new invite link as String on success.
     */
    public exportChatInviteLink(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;
    }): Promise<string> {
        return this.request('exportChatInviteLink', params);
    }

    /**
     * Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat
     * for this to work and must have the appropriate administrator rights. The link can be revoked using the
     * method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object.
     */
    public createChatInviteLink(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Invite link name; 0-32 characters
         */
        name?: string;

        /**
         * Point in time (Unix timestamp) when the link will expire
         */
        expire_date?: number;

        /**
         * Maximum number of users that can be members of the chat simultaneously after joining the chat via this
         * invite link; 1-99999
         */
        member_limit?: number;

        /**
         * True, if users joining the chat via the link need to be approved by chat administrators. If True,
         * member_limit can't be specified
         */
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink> {
        return this.request('createChatInviteLink', params);
    }

    /**
     * Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in
     * the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link
     * as a ChatInviteLink object.
     */
    public editChatInviteLink(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * The invite link to edit
         */
        invite_link: string;

        /**
         * Invite link name; 0-32 characters
         */
        name?: string;

        /**
         * Point in time (Unix timestamp) when the link will expire
         */
        expire_date?: number;

        /**
         * Maximum number of users that can be members of the chat simultaneously after joining the chat via this
         * invite link; 1-99999
         */
        member_limit?: number;

        /**
         * True, if users joining the chat via the link need to be approved by chat administrators. If True,
         * member_limit can't be specified
         */
        creates_join_request?: boolean;
    }): Promise<ChatInviteLink> {
        return this.request('editChatInviteLink', params);
    }

    /**
     * Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is
     * automatically generated. The bot must be an administrator in the chat for this to work and must have the
     * appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object.
     */
    public revokeChatInviteLink(params: {
        /**
         * Unique identifier of the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * The invite link to revoke
         */
        invite_link: string;
    }): Promise<ChatInviteLink> {
        return this.request('revokeChatInviteLink', params);
    }

    /**
     * Use this method to approve a chat join request. The bot must be an administrator in the chat for this to
     * work and must have the can_invite_users administrator right. Returns True on success.
     */
    public approveChatJoinRequest(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;
    }): Promise<true> {
        return this.request('approveChatJoinRequest', params);
    }

    /**
     * Use this method to decline a chat join request. The bot must be an administrator in the chat for this to
     * work and must have the can_invite_users administrator right. Returns True on success.
     */
    public declineChatJoinRequest(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;
    }): Promise<true> {
        return this.request('declineChatJoinRequest', params);
    }

    /**
     * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot
     * must be an administrator in the chat for this to work and must have the appropriate administrator rights.
     * Returns True on success.
     */
    public setChatPhoto(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * New chat photo, uploaded using multipart/form-data
         */
        photo: InputFile;
    }): Promise<true> {
        return this.request('setChatPhoto', params);
    }

    /**
     * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an
     * administrator in the chat for this to work and must have the appropriate administrator rights. Returns True
     * on success.
     */
    public deleteChatPhoto(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;
    }): Promise<true> {
        return this.request('deleteChatPhoto', params);
    }

    /**
     * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an
     * administrator in the chat for this to work and must have the appropriate administrator rights. Returns True
     * on success.
     */
    public setChatTitle(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * New chat title, 1-255 characters
         */
        title: string;
    }): Promise<true> {
        return this.request('setChatTitle', params);
    }

    /**
     * Use this method to change the description of a group, a supergroup or a channel. The bot must be an
     * administrator in the chat for this to work and must have the appropriate administrator rights. Returns True
     * on success.
     */
    public setChatDescription(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * New chat description, 0-255 characters
         */
        description?: string;
    }): Promise<true> {
        return this.request('setChatDescription', params);
    }

    /**
     * Use this method to add a message to the list of pinned messages in a chat. If the chat is not a private
     * chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages'
     * administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on
     * success.
     */
    public pinChatMessage(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Identifier of a message to pin
         */
        message_id: number;

        /**
         * Pass True, if it is not necessary to send a notification to all chat members about the new pinned message.
         * Notifications are always disabled in channels and private chats.
         */
        disable_notification?: boolean;
    }): Promise<true> {
        return this.request('pinChatMessage', params);
    }

    /**
     * Use this method to remove a message from the list of pinned messages in a chat. If the chat is not a private
     * chat, the bot must be an administrator in the chat for this to work and must have the 'can_pin_messages'
     * administrator right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on
     * success.
     */
    public unpinChatMessage(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Identifier of a message to unpin. If not specified, the most recent pinned message (by sending date) will be
         * unpinned.
         */
        message_id?: number;
    }): Promise<true> {
        return this.request('unpinChatMessage', params);
    }

    /**
     * Use this method to clear the list of pinned messages in a chat. If the chat is not a private chat, the bot
     * must be an administrator in the chat for this to work and must have the 'can_pin_messages' administrator
     * right in a supergroup or 'can_edit_messages' administrator right in a channel. Returns True on success.
     */
    public unpinAllChatMessages(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;
    }): Promise<true> {
        return this.request('unpinAllChatMessages', params);
    }

    /**
     * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
     */
    public leaveChat(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;
    }): Promise<true> {
        return this.request('leaveChat', params);
    }

    /**
     * Use this method to get up to date information about the chat (current name of the user for one-on-one
     * conversations, current username of a user, group or channel, etc.). Returns a Chat object on success.
     */
    public getChat(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;
    }): Promise<Chat> {
        return this.request('getChat', params);
    }

    /**
     * Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember
     * objects that contains information about all chat administrators except other bots. If the chat is a group or
     * a supergroup and no administrators were appointed, only the creator will be returned.
     */
    public getChatAdministrators(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;
    }): Promise<ChatMember[]> {
        return this.request('getChatAdministrators', params);
    }

    /**
     * Use this method to get the number of members in a chat. Returns Int on success.
     */
    public getChatMemberCount(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;
    }): Promise<number> {
        return this.request('getChatMemberCount', params);
    }

    /**
     * Use this method to get information about a member of a chat. Returns a ChatMember object on success.
     */
    public getChatMember(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup or channel (in the format
         * @channelusername)
         */
        chat_id: number | string;

        /**
         * Unique identifier of the target user
         */
        user_id: number;
    }): Promise<ChatMember> {
        return this.request('getChatMember', params);
    }

    /**
     * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the
     * chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set
     * optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
     */
    public setChatStickerSet(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup (in the format
         * @supergroupusername)
         */
        chat_id: number | string;

        /**
         * Name of the sticker set to be set as the group sticker set
         */
        sticker_set_name: string;
    }): Promise<true> {
        return this.request('setChatStickerSet', params);
    }

    /**
     * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the
     * chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set
     * optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
     */
    public deleteChatStickerSet(params: {
        /**
         * Unique identifier for the target chat or username of the target supergroup (in the format
         * @supergroupusername)
         */
        chat_id: number | string;
    }): Promise<true> {
        return this.request('deleteChatStickerSet', params);
    }

    /**
     * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed
     * to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
     */
    public answerCallbackQuery(params: {
        /**
         * Unique identifier for the query to be answered
         */
        callback_query_id: string;

        /**
         * Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
         */
        text?: string;

        /**
         * If True, an alert will be shown by the client instead of a notification at the top of the chat screen.
         * Defaults to false.
         */
        show_alert?: boolean;

        /**
         * URL that will be opened by the user's client. If you have created a Game and accepted the conditions via
         * @Botfather, specify the URL that opens your game — note that this will only work if the query comes from a
         * callback_game button.Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a
         * parameter.
         */
        url?: string;

        /**
         * The maximum amount of time in seconds that the result of the callback query may be cached client-side.
         * Telegram apps will support caching starting in version 3.14. Defaults to 0.
         */
        cache_time?: number;
    }): Promise<true> {
        return this.request('answerCallbackQuery', params);
    }

    /**
     * Use this method to change the list of the bot's commands. See https://core.telegram.org/bots#commands for
     * more details about bot commands. Returns True on success.
     */
    public setMyCommands(params: {
        /**
         * A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can
         * be specified.
         */
        commands: BotCommand[];

        /**
         * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to
         * BotCommandScopeDefault.
         */
        scope?: BotCommandScope;

        /**
         * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope,
         * for whose language there are no dedicated commands
         */
        language_code?: string;
    }): Promise<true> {
        return this.request('setMyCommands', params);
    }

    /**
     * Use this method to delete the list of the bot's commands for the given scope and user language. After
     * deletion, higher level commands will be shown to affected users. Returns True on success.
     */
    public deleteMyCommands(params: {
        /**
         * A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to
         * BotCommandScopeDefault.
         */
        scope?: BotCommandScope;

        /**
         * A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope,
         * for whose language there are no dedicated commands
         */
        language_code?: string;
    }): Promise<true> {
        return this.request('deleteMyCommands', params);
    }

    /**
     * Use this method to get the current list of the bot's commands for the given scope and user language. Returns
     * Array of BotCommand on success. If commands aren't set, an empty list is returned.
     */
    public getMyCommands(params: {
        /**
         * A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault.
         */
        scope?: BotCommandScope;

        /**
         * A two-letter ISO 639-1 language code or an empty string
         */
        language_code?: string;
    }): Promise<BotCommand> {
        return this.request('getMyCommands', params);
    }

    /**
     * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True
     * on success.
     */
    public setChatMenuButton(params: {
        /**
         * Unique identifier for the target private chat. If not specified, default bot's menu button will be changed
         */
        chat_id?: number;

        /**
         * A JSON-serialized object for the new bot's menu button. Defaults to MenuButtonDefault
         */
        menu_button?: MenuButton;
    }): Promise<true> {
        return this.request('setChatMenuButton', params);
    }

    /**
     * Use this method to get the current value of the bot's menu button in a private chat, or the default menu
     * button. Returns MenuButton on success.
     */
    public getChatMenuButton(params: {
        /**
         * Unique identifier for the target private chat. If not specified, default bot's menu button will be returned
         */
        chat_id?: number;
    }): Promise<MenuButton> {
        return this.request('getChatMenuButton', params);
    }

    /**
     * Use this method to change the default administrator rights requested by the bot when it's added as an
     * administrator to groups or channels. These rights will be suggested to users, but they are are free to
     * modify the list before adding the bot. Returns True on success.
     */
    public setMyDefaultAdministratorRights(params: {
        /**
         * A JSON-serialized object describing new default administrator rights. If not specified, the default
         * administrator rights will be cleared.
         */
        rights?: ChatAdministratorRights;

        /**
         * Pass True to change the default administrator rights of the bot in channels. Otherwise, the default
         * administrator rights of the bot for groups and supergroups will be changed.
         */
        for_channels?: boolean;
    }): Promise<true> {
        return this.request('setMyDefaultAdministratorRights', params);
    }

    /**
     * Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights
     * on success.
     *
     * Methods and objects used in the inline mode are described in the Inline mode section.
     *
     * The following methods allow you to change an existing message in the message history instead of sending a
     * new one with a result of an action. This is most useful for messages with inline keyboards using callback
     * queries, but can also help reduce clutter in conversations with regular chat bots.
     *
     * Please note, that it is currently only possible to edit messages without reply_markup or with inline
     * keyboards.
     */
    public getMyDefaultAdministratorRights(params: {
        /**
         * Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator
         * rights of the bot for groups and supergroups will be returned.
         */
        for_channels?: boolean;
    }): Promise<ChatAdministratorRights> {
        return this.request('getMyDefaultAdministratorRights', params);
    }

    /**
     * Use this method to edit text and game messages. On success, if the edited message is not an inline message,
     * the edited Message is returned, otherwise True is returned.
     */
    public editMessageText(params: {
        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the
         * target channel (in the format @channelusername)
         */
        chat_id?: number | string;

        /**
         * Required if inline_message_id is not specified. Identifier of the message to edit
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;

        /**
         * New text of the message, 1-4096 characters after entities parsing
         */
        text: string;

        /**
         * Mode for parsing entities in the message text. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in message text, which can be specified instead of
         * parse_mode
         */
        entities?: MessageEntity[];

        /**
         * Disables link previews for links in this message
         */
        disable_web_page_preview?: boolean;

        /**
         * A JSON-serialized object for an inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message | true> {
        return this.request('editMessageText', params);
    }

    /**
     * Use this method to edit captions of messages. On success, if the edited message is not an inline message,
     * the edited Message is returned, otherwise True is returned.
     */
    public editMessageCaption(params: {
        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the
         * target channel (in the format @channelusername)
         */
        chat_id?: number | string;

        /**
         * Required if inline_message_id is not specified. Identifier of the message to edit
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;

        /**
         * New caption of the message, 0-1024 characters after entities parsing
         */
        caption?: string;

        /**
         * Mode for parsing entities in the message caption. See formatting options for more details.
         */
        parse_mode?: ParseMode;

        /**
         * A JSON-serialized list of special entities that appear in the caption, which can be specified instead of
         * parse_mode
         */
        caption_entities?: MessageEntity[];

        /**
         * A JSON-serialized object for an inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message | true> {
        return this.request('editMessageCaption', params);
    }

    /**
     * Use this method to edit animation, audio, document, photo, or video messages. If a message is part of a
     * message album, then it can be edited only to an audio for audio albums, only to a document for document
     * albums and to a photo or a video otherwise. When an inline message is edited, a new file can't be uploaded;
     * use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an
     * inline message, the edited Message is returned, otherwise True is returned.
     */
    public editMessageMedia(params: {
        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the
         * target channel (in the format @channelusername)
         */
        chat_id?: number | string;

        /**
         * Required if inline_message_id is not specified. Identifier of the message to edit
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;

        /**
         * A JSON-serialized object for a new media content of the message
         */
        media: InputMedia;

        /**
         * A JSON-serialized object for a new inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message | true> {
        return this.request('editMessageMedia', params);
    }

    /**
     * Use this method to edit only the reply markup of messages. On success, if the edited message is not an
     * inline message, the edited Message is returned, otherwise True is returned.
     */
    public editMessageReplyMarkup(params: {
        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the
         * target channel (in the format @channelusername)
         */
        chat_id?: number | string;

        /**
         * Required if inline_message_id is not specified. Identifier of the message to edit
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;

        /**
         * A JSON-serialized object for an inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message | true> {
        return this.request('editMessageReplyMarkup', params);
    }

    /**
     * Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned.
     */
    public stopPoll(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Identifier of the original message with the poll
         */
        message_id: number;

        /**
         * A JSON-serialized object for a new message inline keyboard.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Poll> {
        return this.request('stopPoll', params);
    }

    /**
     * Use this method to delete a message, including service messages, with the following limitations:- A message
     * can only be deleted if it was sent less than 48 hours ago.- A dice message in a private chat can only be
     * deleted if it was sent more than 24 hours ago.- Bots can delete outgoing messages in private chats, groups,
     * and supergroups.- Bots can delete incoming messages in private chats.- Bots granted can_post_messages
     * permissions can delete outgoing messages in channels.- If the bot is an administrator of a group, it can
     * delete any message there.- If the bot has can_delete_messages permission in a supergroup or a channel, it
     * can delete any message there.Returns True on success.
     *
     * The following methods and objects allow your bot to handle stickers and sticker sets.
     */
    public deleteMessage(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Identifier of the message to delete
         */
        message_id: number;
    }): Promise<true> {
        return this.request('deleteMessage', params);
    }

    /**
     * Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message
     * is returned.
     */
    public sendSticker(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended),
         * pass an HTTP URL as a String for Telegram to get a .WEBP file from the Internet, or upload a new one using
         * multipart/form-data. More info on Sending Files »
         */
        sticker: InputFile | string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard,
         * instructions to remove reply keyboard or to force a reply from the user.
         */
        reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
    }): Promise<Message> {
        return this.request('sendSticker', params);
    }

    /**
     * Use this method to get a sticker set. On success, a StickerSet object is returned.
     */
    public getStickerSet(params: {
        /**
         * Name of the sticker set
         */
        name: string;
    }): Promise<StickerSet> {
        return this.request('getStickerSet', params);
    }

    /**
     * Use this method to get information about custom emoji stickers by their identifiers.
     * Returns an Array of Sticker objects.
     */
    public getCustomEmojiStickers(params: {
        /**
         * List of custom emoji identifiers. At most 200 custom emoji identifiers can be specified.
         */
        custom_emoji_ids: string[];
    }): Promise<Sticker[]> {
        return this.request('getCustomEmojiStickers', params);
    }

    /**
     * Use this method to upload a .PNG file with a sticker for later use in createNewStickerSet and
     * addStickerToSet methods (can be used multiple times). Returns the uploaded File on success.
     */
    public uploadStickerFile(params: {
        /**
         * User identifier of sticker file owner
         */
        user_id: number;

        /**
         * PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and
         * either width or height must be exactly 512px. More info on Sending Files »
         */
        png_sticker: InputFile;
    }): Promise<File> {
        return this.request('uploadStickerFile', params);
    }

    /**
     * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set
     * thus created. You must use exactly one of the fields png_sticker, tgs_sticker, or webm_sticker. Returns True
     * on success.
     */
    public createNewStickerSet(params: {
        /**
         * User identifier of created sticker set owner
         */
        user_id: number;

        /**
         * Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only english
         * letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must
         * end in "_by_<bot_username>". <bot_username> is case insensitive. 1-64 characters.
         */
        name: string;

        /**
         * Sticker set title, 1-64 characters
         */
        title: string;

        /**
         * PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and
         * either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists
         * on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or
         * upload a new one using multipart/form-data. More info on Sending Files »
         */
        png_sticker?: InputFile | string;

        /**
         * TGS animation with the sticker, uploaded using multipart/form-data. See
         * https://core.telegram.org/stickers#animated-sticker-requirements for technical requirements
         */
        tgs_sticker?: InputFile;

        /**
         * WEBM video with the sticker, uploaded using multipart/form-data. See
         * https://core.telegram.org/stickers#video-sticker-requirements for technical requirements
         */
        webm_sticker?: InputFile;

        /**
         * One or more emoji corresponding to the sticker
         */
        emojis: string;

        /**
         * Type of stickers in the set, pass “regular” or “mask”. Custom emoji sticker sets can't be created
         * via the Bot API at the moment. By default, a regular sticker set is created.
         */
        sticker_type?: StickerSetType;

        /**
         * A JSON-serialized object for position where the mask should be placed on faces
         */
        mask_position?: MaskPosition;
    }): Promise<true> {
        return this.request('createNewStickerSet', params);
    }

    /**
     * Use this method to add a new sticker to a set created by the bot. You must use exactly one of the fields
     * png_sticker, tgs_sticker, or webm_sticker. Animated stickers can be added to animated sticker sets and only
     * to them. Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers.
     * Returns True on success.
     */
    public addStickerToSet(params: {
        /**
         * User identifier of sticker set owner
         */
        user_id: number;

        /**
         * Sticker set name
         */
        name: string;

        /**
         * PNG image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and
         * either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists
         * on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or
         * upload a new one using multipart/form-data. More info on Sending Files »
         */
        png_sticker?: InputFile | string;

        /**
         * TGS animation with the sticker, uploaded using multipart/form-data. See
         * https://core.telegram.org/stickers#animated-sticker-requirements for technical requirements
         */
        tgs_sticker?: InputFile;

        /**
         * WEBM video with the sticker, uploaded using multipart/form-data. See
         * https://core.telegram.org/stickers#video-sticker-requirements for technical requirements
         */
        webm_sticker?: InputFile;

        /**
         * One or more emoji corresponding to the sticker
         */
        emojis: string;

        /**
         * A JSON-serialized object for position where the mask should be placed on faces
         */
        mask_position?: MaskPosition;
    }): Promise<true> {
        return this.request('addStickerToSet', params);
    }

    /**
     * Use this method to move a sticker in a set created by the bot to a specific position. Returns True on
     * success.
     */
    public setStickerPositionInSet(params: {
        /**
         * File identifier of the sticker
         */
        sticker: string;

        /**
         * New sticker position in the set, zero-based
         */
        position: number;
    }): Promise<true> {
        return this.request('setStickerPositionInSet', params);
    }

    /**
     * Use this method to delete a sticker from a set created by the bot. Returns True on success.
     */
    public deleteStickerFromSet(params: {
        /**
         * File identifier of the sticker
         */
        sticker: string;
    }): Promise<true> {
        return this.request('deleteStickerFromSet', params);
    }

    /**
     * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker
     * sets only. Video thumbnails can be set only for video sticker sets only. Returns True on success.
     *
     * The following methods and objects allow your bot to work in inline mode.Please see our Introduction to
     * Inline bots for more details.
     *
     * To enable this option, send the /setinline command to @BotFather and provide the placeholder text that the
     * user will see in the input field after typing your bot's name.
     */
    public setStickerSetThumb(params: {
        /**
         * Sticker set name
         */
        name: string;

        /**
         * User identifier of the sticker set owner
         */
        user_id: number;

        /**
         * A PNG image with the thumbnail, must be up to 128 kilobytes in size and have width and height exactly 100px,
         * or a TGS animation with the thumbnail up to 32 kilobytes in size; see
         * https://core.telegram.org/stickers#animated-sticker-requirements for animated sticker technical
         * requirements, or a WEBM video with the thumbnail up to 32 kilobytes in size; see
         * https://core.telegram.org/stickers#video-sticker-requirements for video sticker technical requirements. Pass
         * a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a
         * String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More
         * info on Sending Files ». Animated sticker set thumbnails can't be uploaded via HTTP URL.
         */
        thumb?: InputFile | string;
    }): Promise<true> {
        return this.request('setStickerSetThumb', params);
    }

    /**
     * Use this method to send answers to an inline query. On success, True is returned.No more than 50 results per
     * query are allowed.
     */
    public answerInlineQuery<T extends InlineQueryResult>(params: {
        /**
         * Unique identifier for the answered query
         */
        inline_query_id: string;

        /**
         * A JSON-serialized array of results for the inline query
         */
        results: T[];

        /**
         * The maximum amount of time in seconds that the result of the inline query may be cached on the server.
         * Defaults to 300.
         */
        cache_time?: number;

        /**
         * Pass True, if results may be cached on the server side only for the user that sent the query. By default,
         * results may be returned to any user who sends the same query
         */
        is_personal?: boolean;

        /**
         * Pass the offset that a client should send in the next query with the same text to receive more results. Pass
         * an empty string if there are no more results or if you don't support pagination. Offset length can't exceed
         * 64 bytes.
         */
        next_offset?: string;

        /**
         * If passed, clients will display a button with specified text that switches the user to a private chat with
         * the bot and sends the bot a start message with the parameter switch_pm_parameter
         */
        switch_pm_text?: string;

        /**
         * Deep-linking parameter for the /start message sent to the bot when user presses the switch button. 1-64
         * characters, only A-Z, a-z, 0-9, _ and - are allowed.Example: An inline bot that sends YouTube videos can ask
         * the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it
         * displays a 'Connect your YouTube account' button above the results, or even before showing any. The user
         * presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that
         * instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the
         * user can easily return to the chat where they wanted to use the bot's inline capabilities.
         */
        switch_pm_parameter?: string;
    }): Promise<true> {
        return this.request('answerInlineQuery', params);
    }

    /**
     * Use this method to set the result of an interaction with a Web App and send a corresponding message on
     * behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is
     * returned.
     */
    public answerWebAppQuery(params: {
        /**
         * Unique identifier for the query to be answered
         */
        web_app_query_id: string;

        /**
         * A JSON-serialized object describing the message to be sent
         */
        result: InlineQueryResult;
    }): Promise<SentWebAppMessage> {
        return this.request('answerWebAppQuery', params);
    }

    /**
     * Use this method to send invoices. On success, the sent Message is returned.
     */
    public sendInvoice(params: {
        /**
         * Unique identifier for the target chat or username of the target channel (in the format @channelusername)
         */
        chat_id: number | string;

        /**
         * Product name, 1-32 characters
         */
        title: string;

        /**
         * Product description, 1-255 characters
         */
        description: string;

        /**
         * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal
         * processes.
         */
        payload: string;

        /**
         * Payments provider token, obtained via Botfather
         */
        provider_token: string;

        /**
         * Three-letter ISO 4217 currency code, see more on currencies
         */
        currency: string;

        /**
         * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost,
         * delivery tax, bonus, etc.)
         */
        prices: LabeledPrice[];

        /**
         * The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For
         * example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json,
         * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
         * Defaults to 0
         */
        max_tip_amount?: number;

        /**
         * A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer, not
         * float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive,
         * passed in a strictly increased order and must not exceed max_tip_amount.
         */
        suggested_tip_amounts?: number[];

        /**
         * Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button,
         * allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty,
         * forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay
         * button), with the value used as the start parameter
         */
        start_parameter?: string;

        /**
         * A JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed
         * description of required fields should be provided by the payment provider.
         */
        provider_data?: string;

        /**
         * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
         * People like it better when they see what they are paying for.
         */
        photo_url?: string;

        /**
         * Photo size
         */
        photo_size?: number;

        /**
         * Photo width
         */
        photo_width?: number;

        /**
         * Photo height
         */
        photo_height?: number;

        /**
         * Pass True, if you require the user's full name to complete the order
         */
        need_name?: boolean;

        /**
         * Pass True, if you require the user's phone number to complete the order
         */
        need_phone_number?: boolean;

        /**
         * Pass True, if you require the user's email address to complete the order
         */
        need_email?: boolean;

        /**
         * Pass True, if you require the user's shipping address to complete the order
         */
        need_shipping_address?: boolean;

        /**
         * Pass True, if user's phone number should be sent to provider
         */
        send_phone_number_to_provider?: boolean;

        /**
         * Pass True, if user's email address should be sent to provider
         */
        send_email_to_provider?: boolean;

        /**
         * Pass True, if the final price depends on the shipping method
         */
        is_flexible?: boolean;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * A JSON-serialized object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If
         * not empty, the first button must be a Pay button.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message> {
        return this.request('sendInvoice', params);
    }

    /**
     * Use this method to create a link for an invoice. Returns the created invoice link as String on success
     */
    public createInvoiceLink(params: {
        /**
         * Product name, 1-32 characters
         */
        title: string;

        /**
         * Product description, 1-255 characters
         */
        description: string;

        /**
         * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
         */
        payload: string;

        /**
         * Payment provider token, obtained via BotFather
         */
        provider_token: string;

        /**
         * Three-letter ISO 4217 currency code, see more on currencies
         */
        currency: string;

        /**
         * Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount,
         * delivery cost, delivery tax, bonus, etc.)
         */
        prices: LabeledPrice[];

        /**
         * The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double).
         * For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter
         * in currencies.json, it shows the number of digits past the decimal point for each currency (2 for
         * the majority of currencies). Defaults to 0.
         */
        max_tip_amount?: number;

        /**
         * A JSON-serialized array of suggested amounts of tips in the smallest units of the currency (integer,
         * not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be
         * positive, passed in a strictly increased order and must not exceed max_tip_amount.
         */
        suggested_tip_amounts?: number[];

        /**
         * JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed
         * description of required fields should be provided by the payment provider.
         */
        provider_data?: string;

        /**
         * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
         */
        photo_url?: string;

        /**
         * Photo size in bytes
         */
        photo_size?: number;

        /**
         * Photo width
         */
        photo_width?: number;

        /**
         * Photo height
         */
        photo_height?: number;

        /**
         * Pass True if you require the user's full name to complete the order
         */
        need_name?: boolean;

        /**
         * Pass True if you require the user's phone number to complete the order
         */
        need_phone_number?: boolean;

        /**
         * Pass True if you require the user's email address to complete the order
         */
        need_email?: boolean;

        /**
         * Pass True if you require the user's shipping address to complete the order
         */
        need_shipping_address?: boolean;

        /**
         * Pass True if the user's phone number should be sent to the provider
         */
        send_phone_number_to_provider?: boolean;

        /**
         * Pass True if the user's email address should be sent to the provider
         */
        send_email_to_provider?: boolean;

        /**
         * Pass True if the final price depends on the shipping method
         */
        is_flexible?: boolean;
    }): Promise<string> {
        return this.request('createInvoiceLink', params);
    }

    /**
     * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot
     * API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping
     * queries. On success, True is returned.
     */
    public answerShippingQuery(params: {
        /**
         * Unique identifier for the query to be answered
         */
        shipping_query_id: string;

        /**
         * Specify True if delivery to the specified address is possible and False if there are any problems (for
         * example, if delivery to the specified address is not possible)
         */
        ok: boolean;

        /**
         * Required if ok is True. A JSON-serialized array of available shipping options.
         */
        shipping_options?: ShippingOption[];

        /**
         * Required if ok is False. Error message in human readable form that explains why it is impossible to complete
         * the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this
         * message to the user.
         */
        error_message?: string;
    }): Promise<true> {
        return this.request('answerShippingQuery', params);
    }

    /**
     * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in
     * the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout
     * queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the
     * pre-checkout query was sent.
     */
    public answerPreCheckoutQuery(params: {
        /**
         * Unique identifier for the query to be answered
         */
        pre_checkout_query_id: string;

        /**
         * Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the
         * order. Use False if there are any problems.
         */
        ok: boolean;

        /**
         * Required if ok is False. Error message in human readable form that explains the reason for failure to
         * proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while
         * you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will
         * display this message to the user.
         */
        error_message?: string;
    }): Promise<true> {
        return this.request('answerPreCheckoutQuery', params);
    }

    /**
     * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not
     * be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which
     * you returned the error must change). Returns True on success.
     *
     * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any
     * reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence
     * of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the
     * issues.
     */
    public setPassportDataErrors(params: {
        /**
         * User identifier
         */
        user_id: number;

        /**
         * A JSON-serialized array describing the errors
         */
        errors: PassportElementError[];
    }): Promise<true> {
        return this.request('setPassportDataErrors', params);
    }

    /**
     * Use this method to send a game. On success, the sent Message is returned.
     */
    public sendGame(params: {
        /**
         * Unique identifier for the target chat
         */
        chat_id: number;

        /**
         * Short name of the game, serves as the unique identifier for the game. Set up your games via Botfather.
         */
        game_short_name: string;

        /**
         * Sends the message silently. Users will receive a notification with no sound.
         */
        disable_notification?: boolean;

        /**
         * Protects the contents of the sent message from forwarding and saving
         */
        protect_content?: boolean;

        /**
         * If the message is a reply, ID of the original message
         */
        reply_to_message_id?: number;

        /**
         * Pass True, if the message should be sent even if the specified replied-to message is not found
         */
        allow_sending_without_reply?: boolean;

        /**
         * A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If
         * not empty, the first button must launch the game.
         */
        reply_markup?: InlineKeyboardMarkup;
    }): Promise<Message> {
        return this.request('sendGame', params);
    }

    /**
     * Use this method to set the score of the specified user in a game message. On success, if the message is not
     * an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score
     * is not greater than the user's current score in the chat and force is False.
     */
    public setGameScore(params: {
        /**
         * User identifier
         */
        user_id: number;

        /**
         * New score, must be non-negative
         */
        score: number;

        /**
         * Pass True, if the high score is allowed to decrease. This can be useful when fixing mistakes or banning
         * cheaters
         */
        force?: boolean;

        /**
         * Pass True, if the game message should not be automatically edited to include the current scoreboard
         */
        disable_edit_message?: boolean;

        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat
         */
        chat_id?: number;

        /**
         * Required if inline_message_id is not specified. Identifier of the sent message
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;
    }): Promise<true> {
        return this.request('setGameScore', params);
    }

    /**
     * Use this method to get data for high score tables. Will return the score of the specified user and several
     * of their neighbors in a game. On success, returns an Array of GameHighScore objects.
     */
    public getGameHighScores(params: {
        /**
         * Target user id
         */
        user_id: number;

        /**
         * Required if inline_message_id is not specified. Unique identifier for the target chat
         */
        chat_id?: number;

        /**
         * Required if inline_message_id is not specified. Identifier of the sent message
         */
        message_id?: number;

        /**
         * Required if chat_id and message_id are not specified. Identifier of the inline message
         */
        inline_message_id?: string;
    }): Promise<GameHighScore[]> {
        return this.request('getGameHighScores', params);
    }
}
