export interface ForceReply {
    /** Shows reply interface to the user, as if they manually selected the bot's message and tapped 'Reply' */
    force_reply: boolean;

    /** The placeholder to be shown in the input field when the reply is active; 1-64 characters */
    input_field_placeholder?: string;

    /**
     * Use this parameter if you want to force reply from specific users only. Targets: 1) users that are `@mentioned`
     * in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of
     * the original message.
     */
    selective?: boolean;
}
