import type { PassportElementErrorDataField } from '@typings/PassportElementErrorDataField';
import type { PassportElementErrorFrontSide } from '@typings/PassportElementErrorFrontSide';
import type { PassportElementErrorReverseSide } from '@typings/PassportElementErrorReverseSide';
import type { PassportElementErrorSelfie } from '@typings/PassportElementErrorSelfie';
import type { PassportElementErrorFile } from '@typings/PassportElementErrorFile';
import type { PassportElementErrorFiles } from '@typings/PassportElementErrorFiles';
import type { PassportElementErrorTranslationFile } from '@typings/PassportElementErrorTranslationFile';
import type { PassportElementErrorTranslationFiles } from '@typings/PassportElementErrorTranslationFiles';
import type { PassportElementErrorUnspecified } from '@typings/PassportElementErrorUnspecified';

/**
 * This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of:
 */
export type PassportElementError =
    | PassportElementErrorDataField
    | PassportElementErrorFrontSide
    | PassportElementErrorReverseSide
    | PassportElementErrorSelfie
    | PassportElementErrorFile
    | PassportElementErrorFiles
    | PassportElementErrorTranslationFile
    | PassportElementErrorTranslationFiles
    | PassportElementErrorUnspecified;
