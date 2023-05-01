import { gql } from '@apollo/client';
import { GQL_FRAGMENT_COMMENT } from 'graphql/fragments/comment';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/post';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_POSTS_LIMIT = 5;

export const GQL_POSTS = gql`
  query QueryPosts(
    $inputs: ApiFiltersInput = {
      _sort: "indexRef",
      _start: 0,
      _limit: ${GQL_POSTS_LIMIT},
      _order: DESC
    }
  ) {
    posts(inputs: $inputs) {
      ...post
      comments {
        ...comment
      }
      user {
        ...user
      }
    }
  }

  ${GQL_FRAGMENT_POST}
  ${GQL_FRAGMENT_USER}
  ${GQL_FRAGMENT_COMMENT}
`;
