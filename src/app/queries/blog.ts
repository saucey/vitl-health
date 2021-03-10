import gql from 'graphql-tag';
import {BlogArticleFragment} from './fragments';
import {BlogCategoryFragment} from './fragments';

export const GetCategories = gql`
    query GetCategories {
        blog_categories {
            ...categoryFields
        }
    }
    ${BlogCategoryFragment}
`;

export const GetArticles = gql`
    query GetArticles($page: Int, $limit: Int) {
        blog_articles(page: $page, limit: $limit) {
            current
            hasNext
            articles {
                ...articleFields
            }
        }
    }
    ${BlogArticleFragment}
`;

export const GetTopArticles = gql`
    query GetTopArticles {
        blog_topArticles {
            ...articleFields
        }
    }
    ${BlogArticleFragment}
`;

export const GetCategory = gql`
    query GetCategory($slug: ID!, $page: Int, $limit: Int) {
        blog_category(slug: $slug) {
            ...categoryFields
            articleList(page: $page, limit: $limit) {
                current
                hasNext
                articles {
                    ...articleFields
                }
            }
        }
    }
    ${BlogCategoryFragment}
    ${BlogArticleFragment}
`;

export const GetArticle = gql`
    query GetArticle($slug: ID!) {
        blog_article(slug: $slug) {
            ...articleFields
            content
            relatedArticles {
                ...articleFields
            }
        }
    }
    ${BlogArticleFragment}
`;
