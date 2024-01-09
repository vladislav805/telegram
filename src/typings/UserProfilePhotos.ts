import type { PhotoSize } from './Photo';

export type UserProfilePhotos = {
    total_count: number;
    photos: PhotoSize[][];
};
