import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_USER = gql`
  query QueryUser($userId: ID!) {
    user(id: $userId) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;
