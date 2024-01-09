import type { EncryptedPassportElement } from './EncryptedPassportElement';
import type { EncryptedCredentials } from './EncryptedCredentials';

/**
 * Contains information about Telegram Passport data shared with the bot by the user.
 */
export interface PassportData {
    /**
     * Array with information about documents and other Telegram Passport elements that was shared with the bot
     */
    data: EncryptedPassportElement[];

    /**
     * Encrypted credentials required to decrypt the data
     */
    credentials: EncryptedCredentials;
}
