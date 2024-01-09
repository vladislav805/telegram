import type { ShippingAddress } from './ShippingAddress';
import type { User } from './User';

export interface ShippingQuery {
    id: string;
    from: User;
    invoice_payload: string;
    shipping_address: ShippingAddress;
}
