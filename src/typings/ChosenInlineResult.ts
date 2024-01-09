import type { User } from './User';
import type { Location } from './Location';

export interface ChosenInlineResult {
    result_id: string;
    from: User;
    location?: Location;
    inline_message_id?: string;
    query: string;
}
