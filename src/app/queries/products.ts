import gql from 'graphql-tag';
import {TreeItemFragment} from './fragments';

export const AllCategories = gql`
  query AllCategories {
    treeItems {
      ...treeItemFields
    }
  }
  ${TreeItemFragment}
`;

export const GetCategory = gql`
  query GetCategory($slug: String!) {
    treeItem(slug: $slug) {
        ...treeItemFields
        heroBackground {
            url
            alt
        }
        heroImageMobile {
            url
            alt
        }
        heroImageDesktop {
            url
            alt
        }
        items {
            ...treeItemFields
        }
    }
  }
  ${TreeItemFragment}
`;

export const PlanFragment = gql`
fragment planFields on Plan {
    id
    name
    default
    label
    subtitle
    rrp
    offerPrice
    postagePrice(freeTrial: $freeTrial, partnership: $partnership)
    type
    product {
        id
        name
        grouping
    }
}
`;

export const ProductFragment = gql`
fragment productFields on Product {
    id
    name
    grouping
    slug
    label
    shortDescription
    longDescription
    icon {
        url
        alt
    }
    image {
        url
        alt
    }
    imageMobile {
        url
    }
    plans {
        ...planFields
    }
    pills {
        id
        label
        description
        shortDescription
        longDescription
        per
        icon {
            url
            alt
        }
        ingredients {
            name
            type
            quantity
            rda
        }
        ingredientsList
    }
    benefits {
        label
        image {
            url
            alt
        }
    }
    fromAmount
}
${PlanFragment}
`;

export const ExtendedProductFields = gql`
fragment extendedProductFields on Product {
    pageTitle
    pageDescription
    webBlockOneTitle
    webBlockOneDescription
    webBlockTwoTitle
    webBlockTwoDescription
    webBlockThreeImage {
        url
        alt
    }
    webBlockThreeTitle
    webBlockThreeDescription
    webBlockThreeNoNastiesTitle
    webBlockThreeNoNastiesDescription
    webBlockThreeDirectionsTitle
    webBlockThreeDirectionsDescription
    webBlockThreeMaximumEfficacyTitle
    webBlockThreeMaximumEfficacyDescription
    webBlockFourTitle
}
`;


export const GetProduct = gql`
    query GetProduct($slug: String, $freeTrial: Boolean, $partnership: String) {
        product(slug: $slug) {
            ...productFields
            ...extendedProductFields
        }
    }
    ${ProductFragment}
    ${ExtendedProductFields}
`;

export const GetProductById = gql`
    query GetProductById($id: ID, $freeTrial: Boolean, $partnership: String) {
        product(id: $id) {
            ...productFields
            ...extendedProductFields
        }
    }
    ${ProductFragment}
    ${ExtendedProductFields}
`;

export const GetPlan = gql`
    query GetPlan($id: ID!, $freeTrial: Boolean, $partnership: String) {
        plan(id: $id) {
            ...planFields
        }
    }
    ${PlanFragment}
`;

export const GetProductsByCategory = gql`
    query GetProductsByCategory($grouping: String!, $excludeId: ID, $freeTrial: Boolean, $partnership: String) {
        product_getAllByGroup(excludeProductId: $excludeId, group: $grouping, filter: { limit: 3 }){
            ...productFields
        }
    }
    ${ProductFragment}
`;

export const GetPopularProducts = gql`
    query GetPopularProducts($excludeId: ID!, $freeTrial: Boolean, $partnership: String) {
        popularProducts(excludeProductId: $excludeId, filter: { limit: 3 }) {
            ...productFields
        }
    }
    ${ProductFragment}
`;

export const GetPlans = gql`
    query GetPlans($slug: String) {
        product(slug: $slug) {
            id
            slug
            plans {
                id
                default
                rrp
                product {
                    id
                }
            }
        }
    }    
`;

export const GetAllPlans = gql`
    query GetAllPlans($slug: String) {
        product(slug: $slug) {
            id
            slug
            allPlans {
                frequency
                subtotal
                currency
            }
        }
    }    
`;
