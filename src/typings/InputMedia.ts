import type { InputMediaPhoto } from '@typings/InputMediaPhoto';
import type { InputMediaVideo } from '@typings/InputMediaVideo';
import type { InputMediaAnimation } from '@typings/InputMediaAnimation';
import type { InputMediaAudio } from '@typings/InputMediaAudio';
import type { InputMediaDocument } from '@typings/InputMediaDocument';

/**
 * This object represents the content of a media message to be sent. It should be one of
 */
export type InputMedia =
    | InputMediaPhoto
    | InputMediaVideo
    | InputMediaAnimation
    | InputMediaAudio
    | InputMediaDocument;
