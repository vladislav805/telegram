import type { InputTextMessageContent } from './InputTextMessageContent';
import type { InputLocationMessageContent } from './InputLocationMessageContent';
import type { InputVenueMessageContent } from './InputVenueMessageContent';
import type { InputContactMessageContent } from './InputContactMessageContent';
import type { InputInvoiceMessageContent } from './InputInvoiceMessageContent';

/**
 * This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following 5 types:
 */
export type InputMessageContent =
    | InputTextMessageContent
    | InputLocationMessageContent
    | InputVenueMessageContent
    | InputContactMessageContent
    | InputInvoiceMessageContent;
