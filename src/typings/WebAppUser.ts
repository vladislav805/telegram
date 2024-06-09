export interface WebAppUser {
    /**
     * A unique identifier for the user or bot.
     */
    id: number;

    /**
     * Optional. True, if this user is a bot. Returns in the receiver field only.
     */
    is_bot?: boolean;

    /**
     * First name of the user or bot.
     */
    first_name: string;

    /**
     * Optional. Last name of the user or bot.
     */
    last_name?: string;

    /**
     * Optional. Username of the user or bot.
     */
    username?: string;

    /**
     * Optional. IETF language tag of the user's language. Returns in user field only.
     * @see {@link https://en.wikipedia.org/wiki/IETF_language_tag}
     */
    language_code?: string;

    /**
     * Optional. True, if this user is a Telegram Premium user.
     */
    is_premium?: true;

    /**
     * Optional. True, if this user added the bot to the attachment menu.
     */
    added_to_attachment_menu?: true;

    /**
     * Optional. True, if this user allowed the bot to message them.
     */
    allows_write_to_pm?: true;

    /**
     * Optional. URL of the user’s profile photo. The photo can be in .jpeg or .svg formats.
     * Only returned for Mini Apps launched from the attachment menu.
     */
    photo_url?: string;
}
