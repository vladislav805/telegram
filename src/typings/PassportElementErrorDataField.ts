/**
 * Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes.
 */
export interface PassportElementErrorDataField {
    /**
     * Error source, must be data
     */
    source: string;

    /**
     * The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”
     */
    type: string;

    /**
     * Name of the data field which has the error
     */
    field_name: string;

    /**
     * Base64-encoded data hash
     */
    data_hash: string;

    /**
     * Error message
     */
    message: string;
}
