/**
 * Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user.
 */
export interface BotCommandScopeDefault {
    /**
     * Scope type, must be default
     */
    type: 'default';
}
