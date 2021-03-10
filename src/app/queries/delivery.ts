import gql from 'graphql-tag';

export const DeliveryAddressFragment = gql`
    fragment deliveryAddressFields on DeliveryAddress {
        id
        title
        firstName
        lastName
        address
        town
        county
        postcode
        country
        summary
        default
    }
`;
