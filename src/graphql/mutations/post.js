import { gql } from '@apollo/client';

export const GQL_DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
