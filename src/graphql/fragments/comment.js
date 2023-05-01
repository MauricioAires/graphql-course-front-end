import { gql } from '@apollo/client';

export const GQL_FRAGMENT_COMMENT = gql`
  fragment comment on Comment {
    id
    comment
    createdAt
  }
`;
