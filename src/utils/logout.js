import { GQL_LOGOUT } from 'graphql/mutations/auth';
import { authDataManager } from 'graphql/reactive-var/auth';

export const logout = async (client, userName, callback) => {
  authDataManager.resetVar();

  try {
    await client.mutate({
      mutation: GQL_LOGOUT,
      variables: {
        userName,
      },
    });
  } catch (error) {
    //
  }

  if (callback) {
    callback();
  }
};
