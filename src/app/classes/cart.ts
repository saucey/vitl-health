import {Address} from './address';

export class Cart {
    cartid: string;
    count: number;
    deliveryAddress: Address;
    paymentMethod: any;
    subtotal: number;
    subtotalText: string;
    total: number;
    totalText: string;
    estimatedDelivery: number;
    shippingCost: number;
    shippingCostText: string;
    shippingMethod: string;
    discount: any;
    purchaseAcknowledgement: any;
    items: Array<any>;
}
