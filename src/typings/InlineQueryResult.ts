import type { InlineQueryResultArticle } from './InlineQueryResultArticle';
import type { InlineQueryResultAudio } from './InlineQueryResultAudio';
import type { InlineQueryResultCachedAudio } from './InlineQueryResultCachedAudio';
import type { InlineQueryResultCachedDocument } from './InlineQueryResultCachedDocument';
import type { InlineQueryResultCachedGif } from './InlineQueryResultCachedGif';
import type { InlineQueryResultCachedMpeg4Gif } from './InlineQueryResultCachedMpeg4Gif';
import type { InlineQueryResultCachedPhoto } from './InlineQueryResultCachedPhoto';
import type { InlineQueryResultCachedSticker } from './InlineQueryResultCachedSticker';
import type { InlineQueryResultCachedVideo } from './InlineQueryResultCachedVideo';
import type { InlineQueryResultCachedVoice } from './InlineQueryResultCachedVoice';
import type { InlineQueryResultContact } from './InlineQueryResultContact';
import type { InlineQueryResultDocument } from './InlineQueryResultDocument';
import type { InlineQueryResultGame } from './InlineQueryResultGame';
import type { InlineQueryResultGif } from './InlineQueryResultGif';
import type { InlineQueryResultLocation } from './InlineQueryResultLocation';
import type { InlineQueryResultMpeg4Gif } from './InlineQueryResultMpeg4Gif';
import type { InlineQueryResultPhoto } from './InlineQueryResultPhoto';
import type { InlineQueryResultVenue } from './InlineQueryResultVenue';
import type { InlineQueryResultVideo } from './InlineQueryResultVideo';
import type { InlineQueryResultVoice } from './InlineQueryResultVoice';

/**
 * This object represents one result of an inline query. Telegram clients currently support results of the following 20 types:
 *
 * Note: All URLs passed in inline query results will be available to end users and therefore must be assumed to be public.
 */
export type InlineQueryResult =
    | InlineQueryResultCachedAudio
    | InlineQueryResultCachedDocument
    | InlineQueryResultCachedGif
    | InlineQueryResultCachedMpeg4Gif
    | InlineQueryResultCachedPhoto
    | InlineQueryResultCachedSticker
    | InlineQueryResultCachedVideo
    | InlineQueryResultCachedVoice
    | InlineQueryResultArticle
    | InlineQueryResultAudio
    | InlineQueryResultContact
    | InlineQueryResultGame
    | InlineQueryResultDocument
    | InlineQueryResultGif
    | InlineQueryResultLocation
    | InlineQueryResultMpeg4Gif
    | InlineQueryResultPhoto
    | InlineQueryResultVenue
    | InlineQueryResultVideo
    | InlineQueryResultVoice;
