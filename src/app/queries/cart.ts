import gql from 'graphql-tag';

import { DeliveryAddressFragment } from './delivery';
import { PaymentMethodFragment } from './payment';
import {ContentFragment} from './fragments';

export const CartFragment = gql`
    fragment cartFields on Cart {
        cartid
        count
        discount {
          itemid
          discount
          discountText
          discountLabel
        }
        credit {
          itemid
          discount
          discountText
          discountLabel
        }
        deliveryAddress {
            ...deliveryAddressFields
        }
        paymentMethod {
            ...paymentMethodFields
        }
        subtotal
        subtotalText
        shippingCost
        shippingCostText
        shippingMethod
        estimatedDelivery
        total
        totalText
        purchaseAcknowledgement {
            ...contentFields
        }
        items {
          itemid
          type
          image {
            url
          }
          label
          subtitles
          quantity
          allowQuantityChange
          rrp
          rrpText
          subtotal
          subtotalText
          total
          totalText
          plan {
            id
            name
            product {
                id
                name
                grouping
            }
          }
        }
    }
    ${DeliveryAddressFragment}
    ${PaymentMethodFragment}
    ${ContentFragment}
`;

export const Cart = gql`
  query Cart($cartid: ID) {
    cart (cartid: $cartid) {
        ...cartFields
    }
  }
  ${CartFragment}
`;

export const AddPlan = gql`
    mutation AddPlan($cartid: ID, $planid: ID!, $quantity: Int) {
        cart_addPlan(cartid: $cartid, planid: $planid, quantity: $quantity) {
            ...cartFields
        }
    }    
    ${CartFragment}
`;

export const RedeemTrial = gql`
    mutation RedeemTrial($cartid: ID, $partnership: String!, $campaign: String!, $planid: ID!) {
        cart_redeemTrial(cartid: $cartid, partnership: $partnership, campaign: $campaign, planid: $planid) {
            ...cartFields
        }
    }    
    ${CartFragment}
`;

export const AddCoupon = gql`
    mutation AddCoupon($cartid: ID, $couponcode: String!) {
        cart_addCoupon(cartid: $cartid, couponcode: $couponcode) {
            ...cartFields
        }
    }    
    ${CartFragment}
`;

export const UpdateItem = gql`
    mutation UpdateItem($cartid: ID!, $itemid: ID!, $quantity: Int!) {
        cart_updateItem(cartid: $cartid, itemid: $itemid, quantity: $quantity) {
            ...cartFields
        }
    }    
    ${CartFragment}
`;

export const DeleteItem = gql`
    mutation DeleteItem($cartid: ID!, $itemid: ID!) {
        cart_deleteItem(cartid: $cartid, itemid: $itemid) {
            ...cartFields
        }
    }    
    ${CartFragment}
`;

export const SetCountry = gql`
    mutation SetCountry($cartid: ID, $country: String!) {
        cart_setCountry(cartid: $cartid, country: $country) {
            ...cartFields
        }
    }    
    ${CartFragment}
`;

export const AddDeliveryAddress = gql`
    mutation AddDeliveryAddress($cartid: ID!, $address: AddDeliveryAddressData) {
      cart_addDeliveryAddress(cartid: $cartid, address: $address) {
        ...cartFields
      }
    }
    ${CartFragment}
`;

export const SetDeliveryAddress = gql`
    mutation SetDeliveryAddress($cartid: ID!, $id: ID!) {
      cart_setDeliveryAddress(cartid: $cartid, id: $id) {
        ...cartFields
      }
    }
    ${CartFragment}
`;

export const AddPaymentMethod = gql`
    mutation AddPaymentMethod($cartid: ID!, $paymentMethod: PaymentMethodInput) {
      cart_addPaymentMethod(cartid: $cartid, paymentMethod: $paymentMethod) {
        ...cartFields
      }
    }
    ${CartFragment}
`;

export const SetPaymentMethod = gql`
    mutation SetPaymentMethod($cartid: ID!, $id: ID!, $setDefault: Boolean) {
      cart_setPaymentMethod(cartid: $cartid, id: $id, setDefault: $setDefault) {
        ...cartFields
      }
    }
    ${CartFragment}
`;

export const AssociateCart = gql`
    mutation AssociateCart($cartid: ID!) {
        cart_associate(cartid: $cartid) {
            ...cartFields
        }
    }
    ${CartFragment}
`;

export const OrderCart = gql`
    mutation OrderCart($cartid: ID!, $leadAttribution: [KeyValueInput]) {
        cart_order(cartid: $cartid, leadAttribution: $leadAttribution) {
            id
            items {
                label
                quantity
                total
                plan {
                    id
                    name
                    product {
                        id
                        name
                        grouping
                    }
                }
            }
            deliveryAddress {
                id
                title
                firstName
                lastName
                address
                town
                postcode
                county
                country
            }
            estimatedDelivery
            awinCode
            awinAmount
            total
            currency
            couponCode
            shippingCost
        }
    }
`;
