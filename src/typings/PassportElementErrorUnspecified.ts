/**
 * Represents an issue in an unspecified place. The error is considered resolved when new data is added.
 *
 * Your bot can offer users HTML5 games to play solo or to compete against each other in groups and one-on-one chats. Create games via @BotFather using the /newgame command. Please note that this kind of power requires responsibility: you will need to accept the terms for each game that your bots will be offering.
 */
export interface PassportElementErrorUnspecified {
    /**
     * Error source, must be unspecified
     */
    source: string;

    /**
     * Type of element of the user's Telegram Passport which has the issue
     */
    type: string;

    /**
     * Base64-encoded element hash
     */
    element_hash: string;

    /**
     * Error message
     */
    message: string;
}
