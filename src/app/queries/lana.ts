import gql from 'graphql-tag';
import {OrderFragment, KitStatusFragment} from './fragments';

const QuestionFragment = gql`
    fragment questionFields on Question {
        identifier
        messages {
          type
          text
          class
          action {
            type
            value
          }
        }
        responses {
          identifier
          label
          type
          action {
            type
            value
          }
          image {
            url
          }
        }
    }
`;

const ChatFragment = gql`
    fragment chatFields on Chat {
        progress
        progressText
        displayProgress
        canGoBack
        question {
            ...questionFields
        }
    }
    ${QuestionFragment}
`;

const PillarFragment = gql`
    fragment pillarFields on Pillar {
        id
        icon {
            url
        }
        label
        score
        showProgress
    }
`;

export const GetResultWalkthrough = gql`
  query GetResultWalkthrough {
    lana_resultsWalkthrough {
        positivePillars: pillars(positive: true) {
     	  ...pillarFields
        }
        negativePillars: pillars(positive: false) {
          ...pillarFields
        }
        nextSteps {
          title
          subtitle
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
        warningScreen {
          title
          jsonStyle
          jsonSections
        }
    }
  }
  ${PillarFragment}
`;

export const GetDashboard = gql`
    query GetDashboard {
        user {
            id
            hasIntegratedResult
            dnaStatus {
              ...kitStatusFields
            }
            goals(filter: { order: [ { sort: "score", direction: "desc" } ] }) {
                id
                label
                tagline
                color
                selected
                score
                icon {
                    url
                },
                showProgress
            }
            recommendations(filter: { limit: 3, order: [ { sort: "score", direction: "desc" } ] }) {
                id
                label
                tagline
                icon {
                    url
                }
                action {
                    type
                    value
                }
            }
            goalAnnouncements {
              goals {
                id
                label
                color
                icon {
                    url
                }
              }
              content {
                title
                subtitle
                buttons {
                  title
                  action {
                    type
                    value
                  }
                }
              }
            }
            orders {
                ...orderFields
            }
        }
    }
    ${OrderFragment}
    ${KitStatusFragment}
`;

export const SelectGoals = gql`
    mutation SelectGoals($goals: [String]!) {
        lana_modifySelectedGoals(goals: $goals)
    }
`;

export const GetGoal = gql`
    query GetGoal($id: ID!) {
        user {
            id
            isPro
            goal(id: $id) {
                id
                label
                color
                pillar
                tagline
                score
                pillarScore
                showProgress
                icon {
                    url
                }
                recommendations(filter: { limit: 3, order: [ { sort: "score", direction: "desc" } ] }) {
                    id
                    label
                    tagline
                    icon {
                        url
                    }
                    action {
                        type
                        value
                    }
                }
                issues(filter: { limit: 3, order: [ { sort: "score", direction: "desc" } ] }) {
                    id
                    label
                    icon {
                        url
                    }
                }
                quote {
                    comment
                    expert {
                        name
                        professionalTitle
                        image {
                            url
                        }
                    }
                }
                foods(filter: { limit: 4, order: [ { sort: "score", direction: "desc" } ] }) {
                    id
                    label
                    description
                    icon {
                        url
                    }
                }
                pill {
                    id
                    label
                    description
                    icon {
                        url
                    }
                    quote {
                        comment
                        expert {
                            name
                            image {
                                url
                            }
                        }
                    }
                }
                lifestyleAdvice: advice(subtype: "lifestyle", filter: { limit: 3, order: [ { sort: "score", direction: "desc" } ] }) {
                    id
                    label
                    icon {
                        url
                    }
                }
                dietAdvice: advice(subtype: "diet", filter: { limit: 1, order: [ { sort: "score", direction: "desc" } ] }) {
                    id
                    label
                    icon {
                        url
                    }
                }
            }
        }
    } 
`;

export const GetRecommendedPills = gql`
    query GetRecommendedPills {
        lana_recommendedPills {
            icon {
                url
            }
            label
            longDescription
            ingredients {
                name
                quantity
                rda
            }
        }
    }
`;

export const GenerateResult = gql`
    mutation GenerateResult($contextIdentifier: String) {
        lana_generateResult(contextIdentifier: $contextIdentifier) {
            id
            packUpdated
            goalsUpdated
            firstResult
        }
    }
`;

export const getGoalsAnnouncements = gql`
query getGoalsAnnouncements {
    user {
        id
        goalAnnouncements {
          goals {
            id
            label
            color
            icon {
                url
            }
          }
          content {
            title
            subtitle
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
}
`;