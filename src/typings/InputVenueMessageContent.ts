/**
 * Represents the content of a venue message to be sent as the result of an inline query.
 */
export interface InputVenueMessageContent {
    /**
     * Latitude of the venue in degrees
     */
    latitude: number;

    /**
     * Longitude of the venue in degrees
     */
    longitude: number;

    /**
     * Name of the venue
     */
    title: string;

    /**
     * Address of the venue
     */
    address: string;

    /**
     * Foursquare identifier of the venue, if known
     */
    foursquare_id?: string;

    /**
     * Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
     */
    foursquare_type?: string;

    /**
     * Google Places identifier of the venue
     */
    google_place_id?: string;

    /**
     * Google Places type of the venue. (See supported types.)
     */
    google_place_type?: string;
}
