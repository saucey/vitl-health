import gql from 'graphql-tag';
import {ContentFragment} from './fragments';

export const GetPage = gql`
  query GetPage($path: String!) {
    content_getPage(path: $path) {
        title
        description
        content
    }
  }
`;

export const GetFaqs = gql`
    query GetFaqs {
        content_getFaqs {
            category
            question
            answer
        }
    }    
`;

export const ReferralCodeExists = gql`
    query ReferralCodeExists($code: String!) {
        referral(code: $code)
    }
`;

export const GetContent = gql`
    query GetContent($path: String!, $scale: Int) {
        content_getScreen(path: $path, scale: $scale) {
            ...contentFields
        }
    }    
    ${ContentFragment}
`;

export const RegisterKit = gql`
    mutation RegisterKit($type: String!, $barcode: String!, $firstName: String!, $lastName: String!, $gender: String!, $dob: Int!, $phone: String!) {
        user_registerKit(data: { type: $type, barcode: $barcode, firstName: $firstName, lastName: $lastName, gender: $gender, dob: $dob, phone: $phone })
    }
`;

export const SubmitForm = gql`
    mutation SubmitForm($id: String!) {
        user_submitForm(id: $id) {
            ...contentFields
        }
    }
    ${ContentFragment}
`;


export const GetExperts = gql`
    query GetExperts {
        monalImage: content_getImage(name: "Dr Monal Wadhera", type: "expert", identifier: "Dr Monal Wadhera", key: "image") {url}
        monalTitle: content_getText(name: "Dr Monal Wadhera", type: "expert", identifier: "Dr Monal Wadhera", key: "professionalTitle")
        monalBio: content_getText(name: "Dr Monal Wadhera", type: "expert", identifier: "Dr Monal Wadhera", key: "shortBio")
        monikaImage: content_getImage(name: "Dr Monika Mozere", type: "expert", identifier: "Dr Monika Mozere", key: "image") {url}
        monikaTitle: content_getText(name: "Dr Monika Mozere", type: "expert", identifier: "Dr Monika Mozere", key: "professionalTitle")
        monikaBio: content_getText(name: "Dr Monika Mozere", type: "expert", identifier: "Dr Monika Mozere", key: "shortBio")
        georgieImage: content_getImage(name: "Georgie Murphy", type: "expert", identifier: "Georgie Murphy", key: "image") {url}
        georgieTitle: content_getText(name: "Georgie Murphy", type: "expert", identifier: "Georgie Murphy", key: "professionalTitle")
        georgieBio: content_getText(name: "Georgie Murphy", type: "expert", identifier: "Georgie Murphy", key: "shortBio")
        garethImage: content_getImage(name: "Gareth Nicholas", type: "expert", identifier: "Gareth Nicholas" key: "image") {url}
        garethTitle: content_getText(name: "Gareth Nicholas", type: "expert", identifier: "Gareth Nicholas", key: "professionalTitle")
        garethBio: content_getText(name: "Gareth Nicholas", type: "expert", identifier: "Gareth Nicholas", key: "shortBio")
        }
`;
