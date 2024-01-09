import type { MessageEntity } from './MessageEntity';
import type { User } from './User';

export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    total_voter_count: number;
    is_closed: boolean;
    is_anonymous: boolean;
    type: QuizType;
    allows_multiple_answers?: boolean;
    correct_option_id?: number;
    explanation?: string;
    explanation_entities?: MessageEntity[];
    open_period?: number;
    close_date?: number;
}

export interface PollOption {
    text: string;
    voter_count: number;
}

export interface PollAnswer {
    poll_id: string;
    user: User;
    option_ids: number[];
}

export type QuizType = 'quiz' | 'regular';
