import type { MenuButtonCommands } from '@typings/MenuButtonCommands';
import type { MenuButtonWebApp } from '@typings/MenuButtonWebApp';
import type { MenuButtonDefault } from '@typings/MenuButtonDefault';

/**
 * This object describes the bot's menu button in a private chat. It should be one of
 *
 * If a menu button other than MenuButtonDefault is set for a private chat, then it is applied in the chat. Otherwise the default menu button is applied. By default, the menu button opens the list of bot commands.
 */
export type MenuButton =
    | MenuButtonCommands
    | MenuButtonWebApp
    | MenuButtonDefault;
