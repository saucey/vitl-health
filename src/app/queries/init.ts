import gql from 'graphql-tag';
import {UserFragment} from './user';
import {CartFragment} from './cart';

const ImageCategoryFragment = gql`
    fragment imageCategoryFields on ImageContent {
        key
        image {
          url
        }
    }
`;

export const TranslationCategoryFragment = gql`
    fragment translationCategoryFields on TextContent {
        key
        phrase
    }
`;

export const ConfigFragment = gql`
    fragment configFields on Config {
      country
      currency
      countries {
        code
        label
        zipLabelOverride
        countyLabelOverride
        countyRequired
        states {
          code
          label
        }
      }
      titles {
        code
        label
      }
      currencies {
        code
        symbol
      }
      messages: translationCategory(identifier: "messages") {
        ...translationCategoryFields
      }
      orderScreenLabels: translationCategory(identifier: "order-screen-labels") {
        ...translationCategoryFields
      }
      icons: imageCategory(identifier: "icons") {
        ...imageCategoryFields
      }
      homepage: imageCategory(identifier: "homepage") {
        ...imageCategoryFields
      }
      about: imageCategory(identifier: "about-us") {
        ...imageCategoryFields
      }
      quality: imageCategory(identifier: "quality") {
        ...imageCategoryFields
      }
      dna: imageCategory(identifier: "dna") {
        ...imageCategoryFields
      }
      blood: imageCategory(identifier: "blood") {
        ...imageCategoryFields
      }
      theone: imageCategory(identifier: "theone") {
        ...imageCategoryFields
      }
      recycle: imageCategory(identifier: "recycle") {
        ...imageCategoryFields
      }
      worldHealthDay: imageCategory(identifier: "world-health-day") {
        ...imageCategoryFields
      }
      options {
        order {
          applePayEnabled
          paymentCardEnabled
          setupApplePayEnabled
          addCouponEnabled
          applePayAddressVerificationMinSpend
          payWithApplePayButtonType
          payWithApplePayButtonStyle
          stripePaymentRequestType
          stripePaymentRequestTheme
        }
      }
    }
    ${ImageCategoryFragment}
    ${TranslationCategoryFragment}
`;

export const Config = gql`
  query Config {
    config {
      ...configFields
    }
  }
  ${ConfigFragment}
`;

export const Init = gql`
  query Init($cartid: ID, $country: String) {
    config {
      ...configFields
    }
    user {
      ...userFields
    }
    cart (cartid: $cartid, country: $country) {
      ...cartFields
    }
  }
  ${ConfigFragment}
  ${UserFragment}
  ${CartFragment}
`;
