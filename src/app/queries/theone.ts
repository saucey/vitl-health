import gql from 'graphql-tag';
import {TranslationCategoryFragment} from './init';

export const HasResult = gql`
    query {
        user {
            id
            hasResult(contextIdentifier: "essential-one")
        }
    }
`;

export const BottleImgUrl = gql`
    query {
        user {
          id
          essentialOneBottleImgUrl
        }
    }
`;

export const ResultsQuery = gql`
    query {
      config {
        claims: translationCategory(identifier: "theone") {
          ...translationCategoryFields
        }
      }
      user {
        id
        firstName
        firstNamePlural
        referralCode
        resultReferralCode
        pills: entities(contextIdentifier: "essential-one", filter: { order: [ { sort: "score", direction: "desc" } ], fields: [ { key: "type", value: "pill" } ], limit: 1 }) {
          label
          icon {
            url
            alt
          }
        }
        products: entities(contextIdentifier: "essential-one", entitiesType: "product", filter: { order: [ { sort: "score", direction: "desc" } ], fields: [{key: "subtype", value: "theone"}], limit: 1 }) {
          id
        }
        nutrients: entities(contextIdentifier: "essential-one", entitiesType: "essentialOneNutrients", filter: { order: [ { sort: "score", direction: "desc" } ]}) {
          id
          name
          score
        }
        topGoals: entities(contextIdentifier: "essential-one", entitiesType: "topGoals", filter: { order: [ { sort: "score", direction: "desc" } ], limit: 3 }) {
          id
          pillar
          color
          icon {
            url
            alt
          }
          summary
          description
        }
        allGoals: entities(contextIdentifier: "essential-one", filter: { order: [ { sort: "score", direction: "desc" } ], fields: [ { key: "type", value: "goal" } ] }) {
          id
          color
          icon {
            url
            alt
          }
          score
          pillar
          summary
          description
        }
      }
    }
    ${TranslationCategoryFragment}
`;
