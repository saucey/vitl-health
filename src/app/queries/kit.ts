import gql from 'graphql-tag';

export const KitExists = gql`
    query KitExists($type: String!, $barcode: String!) {
       kit_canRegister(type: $type, barcode: $barcode)
    }
`;


