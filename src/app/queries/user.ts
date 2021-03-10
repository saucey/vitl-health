import gql from 'graphql-tag';
import { DeliveryAddressFragment } from './delivery';
import { PaymentMethodFragment } from './payment';
import {KitStatusFragment, OrderFragment} from './fragments';

export const UserFragment = gql`
    fragment userFields on User {
        id
        segment_id
        email
        emailHashed
        type
        firstName
        firstNamePlural
        hasIntegratedResult
        referralCode
        deliveryAddresses {
            ...deliveryAddressFields
        }
        paymentMethods {
            ...paymentMethodFields
        }
    }
    ${DeliveryAddressFragment}
    ${PaymentMethodFragment}
`;

export const GetUser = gql`
  query GetUser {
    user {
      ...userFields
    }
  }
  ${UserFragment}
`;

export const GetAccount = gql`
  query GetAccount {
    user {
        ...userFields
        dnaStatus {
          ...kitStatusFields
        }
        goals {
            id
        }
        lastName
        dob
        gender
        phone
        referralsSent
        referralsUsed
        referralCredit
        orders {
            ...orderFields
        }
        communicationPreferences {
            id
            title
            subscribed
            allowUnsubscribe
        }
    }
  }
  ${UserFragment}
  ${OrderFragment}
  ${KitStatusFragment}
`;

export const GetEntities = gql`
    query GetEntities($contextIdentifier: String) {
        user {
            id
            firstName
            entities(contextIdentifier: $contextIdentifier) {
                id
                name
                type
                subtype
                score
                minScore
                totalScore
                finalScore
            }
        }
    }
`;

export const CheckEmail = gql`
    query CheckEmail($email: String!) {
        user_checkEmail(email: $email)
    }
`;

export const LoginUser = gql`
    mutation LoginUser($email: String!, $password: Password!, $leadAttribution: [KeyValueInput]) {
        user_loginUser(email: $email, password: $password, leadAttribution: $leadAttribution) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const ForgotPassword = gql`
    mutation ForgotPassword($email: String!) {
        user_sendResetPasswordEmail(email: $email)
    }
`;

export const ResetPassword = gql`
    mutation ResetPassword($userId: String!, $token: String!, $password: Password!) {
        user_resetPassword(userId: $userId, token: $token, password: $password) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const MagicLogin = gql`
    mutation MagicLogin($id: ID!, $token: String!) {
        user_exchangeLoginToken(id: $id, token: $token) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const CompleteAccountSetup = gql`
    mutation CompleteAccountSetup($userId: String!, $token: String!, $password: Password!) {
        user_completeAccountSetup(userId: $userId, token: $token, password: $password) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const LogoutUser = gql`
    mutation LogoutUser {
        user_logout  
    }
`;

export const CreateUser = gql`
    mutation CreateUser($firstName: String!, $email: String!, $password: Password!, $signupPage: String, $leadAttribution: [KeyValueInput]) {
        user_createUser(data: { firstName: $firstName, email: $email, password: $password, signupPage: $signupPage }, leadAttribution: $leadAttribution) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const RegisterLead = gql`
    mutation RegisterLead($signupPage: String, $email: String, $leadAttribution: [KeyValueInput]) {
        user_createLead(data: { signup_page: $signupPage, email: $email }, leadAttribution: $leadAttribution) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const PromoteLead = gql`
    mutation PromoteLead($email: String!, $firstName: String!) {
        user_promoteLead(email: $email, firstName: $firstName) {
            ...userFields
        }
    }
    ${UserFragment}
`;

export const AcceptRequest = gql`
    mutation AcceptRequest($request: String!) {
        user_acceptRequest(request: $request)
    }
`;

export const RegisterNewsletter = gql`
    mutation RegisterNewsletter($email: String!) {
        user_registerNewsletter(email: $email)
    }
`;

export const RegisterDeviceToken = gql`
    mutation RegisterDeviceToken($token: String!, $timezone: String!) {
        user_addNotificationToken(token: $token, timezone: $timezone)
    }
`;

export const GetReferralCode = gql`
    query GetReferralCode {
        user {
            id
            referralCode
        }
    }
`;

export const GetRecommendedProducts = gql`
    query GetRecommendedProducts {
        user {
            id
            recommendedProducts {
                title
                description
                image {
                    url
                }
                buttons {
                    title
                    action {
                        type
                        value
                    }
                }
            }
        }
    }    
`;
