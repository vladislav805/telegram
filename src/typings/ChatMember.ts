import type { ChatMemberAdministrator } from './ChatMemberAdministrator';
import type { ChatMemberBanned } from './ChatMemberBanned';
import type { ChatMemberLeft } from './ChatMemberLeft';
import type { ChatMemberMember } from './ChatMemberMember';
import type { ChatMemberOwner } from './ChatMemberOwner';
import type { ChatMemberRestricted } from './ChatMemberRestricted';

/**
 * This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported:
 */
export type ChatMember =
    | ChatMemberOwner
    | ChatMemberAdministrator
    | ChatMemberMember
    | ChatMemberRestricted
    | ChatMemberLeft
    | ChatMemberBanned
;
