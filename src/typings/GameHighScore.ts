import type { User } from './User';

/**
 * This object represents one row of the high scores table for a game.
 *
 * And that's about all we've got for now.If you've got any questions, please check out our Bot FAQ »
 */
export interface GameHighScore {
    /**
     * Position in high score table for the game
     */
    position: number;

    /**
     * User
     */
    user: User;

    /**
     * Score
     */
    score: number;
}
