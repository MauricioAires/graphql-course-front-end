import { gql } from '@apollo/client';
import { GQL_FRAGMENT_USER } from 'graphql/fragments/user';

export const GQL_CREATE_USER = gql`
  mutation CreateUser(
    $data: CreateUserInput! = {
      firstName: ""
      lastName: ""
      userName: ""
      password: ""
    }
  ) {
    createUser(data: $data) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;

export const GQL_DELETE_USER = gql`
  mutation DeleteUser($userId: ID! = "") {
    deleteUser(userId: $userId)
  }
`;

export const GQL_UPDATE_USER = gql`
  mutation UpdateUser(
    $userId: ID! = ""
    $data: UpdateUserInput! = {
      firstName: ""
      lastName: ""
      userName: ""
      password: ""
    }
  ) {
    updateUser(userId: $userId, data: $data) {
      ...user
    }
  }

  ${GQL_FRAGMENT_USER}
`;
