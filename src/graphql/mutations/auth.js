import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation CreateLogin($data: LoginInput!) {
    login(data: $data) {
      userId
      token
    }
  }
`;
