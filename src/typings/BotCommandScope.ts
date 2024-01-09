import type { BotCommandScopeAllChatAdministrators } from '@typings/BotCommandScopeAllChatAdministrators';
import type { BotCommandScopeAllGroupChats } from '@typings/BotCommandScopeAllGroupChats';
import type { BotCommandScopeAllPrivateChats } from '@typings/BotCommandScopeAllPrivateChats';
import type { BotCommandScopeChat } from '@typings/BotCommandScopeChat';
import type { BotCommandScopeChatAdministrators } from '@typings/BotCommandScopeChatAdministrators';
import type { BotCommandScopeChatMember } from '@typings/BotCommandScopeChatMember';
import type { BotCommandScopeDefault } from '@typings/BotCommandScopeDefault';

/**
 * This object represents the scope to which bot commands are applied. Currently, the following 7 scopes are supported:
 *
 * The following algorithm is used to determine the list of commands for a particular user viewing the bot menu. The first list of commands which is set is returned:
 *
 * Commands in the chat with the bot
 *
 * Commands in group and supergroup chats
 */
export type BotCommandScope =
    | BotCommandScopeAllChatAdministrators
    | BotCommandScopeAllGroupChats
    | BotCommandScopeAllPrivateChats
    | BotCommandScopeChat
    | BotCommandScopeChatAdministrators
    | BotCommandScopeChatMember
    | BotCommandScopeDefault;
