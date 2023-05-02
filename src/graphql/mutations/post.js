import { gql } from '@apollo/client';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/post';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const GQL_UPDATE_POST = gql`
  mutation UpdatePost(
    $postId: ID!
    $data: UpdatePostInput! = { title: "", body: "" }
  ) {
    updatePost(postId: $postId, data: $data) {
      ...post
      user {
        ...user
      }
    }
  }

  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
`;
