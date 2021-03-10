import gql from 'graphql-tag';
import {OrderFragment} from './fragments';
import {UserFragment} from './user';
import {CartFragment} from './cart';
import {PaymentMethodFragment} from './payment';

export const GetOrder = gql`
    query GetOrder($id: ID!) {
        user {
            id
            order(id: $id) {
                ...orderFields
            }
        }
    }
    ${OrderFragment}
`;

export const PauseSubscription = gql`
    mutation PauseSubscription($id: ID!, $restartDate: String!) {
        account_pauseSubscription(id: $id, restartDate: $restartDate) {
            id
        }
    }
`;

export const RestartSubscription = gql`
    mutation RestartSubscription($id: ID!) {
        account_reactivateSubscription(id: $id) {
            id
        }
    }
`;

export const ClaimOffer = gql`
    mutation ClaimOffer($id: ID!, $offerId: ID!, $offerMode: String!) {
        account_claimOffer(id: $id, offerId: $offerId, offerMode: $offerMode) {
            id
        }
    }
`;

export const CancelSubscription = gql`
    mutation CancelSubscription($id: ID!, $feedback: [String], $additionalFeedback: String) {
        account_cancelSubscription(id: $id, feedback: $feedback, additionalFeedback: $additionalFeedback) {
            id
        }
    }
`;

export const AddDeliveryAddress = gql`
    mutation AddDeliveryAddress($orderId: ID!, $address: AddOrderDeliveryAddressData) {
      account_addDeliveryAddress(orderId: $orderId, address: $address) {
        id
      }
    }
`;

export const UpdateUser = gql`
    mutation UpdateUser($data: UpdateUserData) {
        user_updateUser(data: $data) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const UpdateCommunicationPreferences = gql`
    mutation UpdateCommunicationPreferences($preferences: [UpdateCommunicationPreferencesData]) {
        user_updateCommunicationPreferences(preferences: $preferences)
    }
`;

export const UnsubscribeEmail = gql`
    mutation UnsubscribeEmail($email: String!, $category: String) {
        user_unsubscribeEmail(email: $email, category: $category) {
            id
            identifier
            title
            subscribed
            allowUnsubscribe
        }
    }
`;

export const SendFeedback = gql`
    mutation SendFeedback($email: String, $source: String!, $feedback: String, $option: String) {
        user_sendFeedback(email: $email, source: $source, feedback: $feedback, option: $option)
    }
`;

export const UpdateFeedback = gql`
    mutation UpdateFeedback($id: ID, $email: String, $source: String!, $feedback: String, $option: String) {
        user_updateFeedback(id: $id, email: $email, source: $source, feedback: $feedback, option: $option)
    }
`;

export const ReferFriend = gql`
    mutation ReferFriend($emails: [String]) {
        user_referFriend(emails: $emails)
    }
`;

export const AddPaymentMethod = gql`
    mutation AddPaymentMethod($paymentMethod: PaymentMethodInput!, $setDefault: Boolean) {
        user_addPaymentMethod(paymentMethod: $paymentMethod, setDefault: $setDefault) {
            ...paymentMethodFields
        }
    }
    ${PaymentMethodFragment}
`;

export const UpdatePaymentMethod = gql`
    mutation UpdatePaymentMethod($id: ID!, $postcode: String, $setDefault: Boolean) {
        user_updatePaymentMethod(id: $id, postcode: $postcode, setDefault: $setDefault) {
            ...paymentMethodFields
        }
    }
    ${PaymentMethodFragment}
`;

export const DeletePaymentMethod = gql`
    mutation DeletePaymentMethod($id: ID!) {
        user_deletePaymentMethod(id: $id)
    }
`;

export const ChangeSubscriptionFrequency = gql`
  mutation ChangeSubscriptionFrequency($context: String!, $frequency: String!) {
    account_changeSubscriptionFrequency(context: $context, frequency: $frequency) {
      id
    }
  }
  `;
