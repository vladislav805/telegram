/**
 * Contains information about an inline message sent by a Web App on behalf of a user.
 *
 * Your bot can accept payments from Telegram users. Please see the introduction to payments for more details on the process and how to set up payments for your bot. Please note that users will need Telegram v.4.0 or higher to use payments (released on May 18, 2017).
 */
export interface SentWebAppMessage {
    /**
     * Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message.
     */
    inline_message_id?: string;
}
