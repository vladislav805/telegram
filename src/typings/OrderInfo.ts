import type { ShippingAddress } from './ShippingAddress';

/**
 * This object represents information about an order.
 */
export interface OrderInfo {
    /**
     * User name
     */
    name?: string;

    /**
     * User's phone number
     */
    phone_number?: string;

    /**
     * User email
     */
    email?: string;

    /**
     * User shipping address
     */
    shipping_address?: ShippingAddress;
}
