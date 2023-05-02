import { gql } from '@apollo/client';

export const GQL_FRAGMENT_POST = gql`
  fragment post on Post {
    id
    title
    body
    createdAt
    # Campo local
    # NOTE: @client diretiva do graphql que informa que esse campo sera apena local e não checar esse campo no backend
    numberOfComments @client
  }
`;
