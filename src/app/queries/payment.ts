import gql from 'graphql-tag';

export const PaymentMethodFragment = gql`
    fragment paymentMethodFields on PaymentMethod {
        id
        type
        description
        cardIssuer
        icon {
            url
        }
        lastFourDigits
        expMonth
        expYear
        name
        postcode
        default
    }
`;
