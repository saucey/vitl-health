import gql from 'graphql-tag';
import { DeliveryAddressFragment } from './delivery';

export const KitStatusFragment = gql`
    fragment kitStatusFields on KitStatus {
        label
        items {
            label
            description
            icon {
                url
            }
            action {
                type
                value
            }
            current
        }
    }
`;

export const ContentFragment = gql`
    fragment contentFields on Content {
        title
        jsonSections
        jsonStyle
        canNavigateBack
        canDismiss
        onLoad {
            type
            value
        }
        onDismiss {
            type
            value
        }
    }
`;

export const TreeItemFragment = gql`
    fragment treeItemFields on TreeItem {
        id
        slug
        label
        description
        pageTitle
        pageDescription
        previewImage {
          url
          alt
        }
        product {
            slug
        }
        alternateProduct {
            slug
        }
        hasChildren
    }
`;

export const AppImageFragment = gql`
    fragment imageFields on Image {
        url
        alt
    }
`;

export const ExpertFragment = gql`
    fragment expertFields on Expert {
        name
        slug
        professionalTitle
        shortBio
        longBio
        urlTwitter
        urlFacebook
        urlInstagram
        urlWebsite
        image {
            ...imageFields
        }
        action {
            type
            value
        }
    }
    ${AppImageFragment}
`;

export const BlogCategoryFragment = gql`
    fragment categoryFields on Category {
        slug
        label
        description
    }
`;

export const BlogArticleFragment = gql`
    fragment articleFields on Article {
        slug
        title
        subtitle
        summary
        thumbnailImage {
            ...imageFields
        }
        previewImage {
            ...imageFields
        }
        mainImage {
            ...imageFields
        }
        datePublished
        expert {
            ...expertFields
        }
    }
    ${AppImageFragment}
    ${ExpertFragment}
`;

export const InvoiceItemFragment = gql`
    fragment invoiceFields on InvoiceItem {
        date
        subtotal
        subtotalText
        total
        totalText
        discounted
    }
`;

export const OrderFragment = gql`
    fragment orderFields on Order {
        id
        type
        status
        statusLabel
        statusColor
        refillsEnabled
        planId
        planName
        productId
        productName
        image {
            url
            alt
        }
        dateOrdered
        datePaused
        dateReactivates
        dateCancelled
        nextDeliveryDate
        nextPackLabel
        initialInvoiceItem {
            ...invoiceFields
        }
        previousInvoiceItem {
            ...invoiceFields
        }
        nextInvoiceItem {
            ...invoiceFields
        }
        deliveryAddress {
            ...deliveryAddressFields
        }
        quantity
        allowManage
        allowRefill
        allowReorder
        allowCancellation
        allowModify
        allowReactivation
        allowPause
        allowDeliveryAddressUpdate
        pauseMinWeeks
        pauseMaxWeeks
        cancellationOffers {
            id
            image {
                url
                alt
            }
            label
            tagline
            discount
            price
        }
    }
    ${InvoiceItemFragment}
    ${DeliveryAddressFragment}
`;
