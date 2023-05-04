import { useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { DefaultContainer } from 'components/DefaultContainer';
import { FormButton } from 'components/FormButton';
import { RegisterForm } from 'components/RegisterForm';
import {
  GQL_CREATE_USER,
  GQL_DELETE_USER,
  GQL_UPDATE_USER,
} from 'graphql/mutations/user';
import { GQL_USER } from 'graphql/queries/user';
import { useAuthVar } from 'graphql/reactive-var/auth';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from 'utils/logout';

export const Register = () => {
  const authVar = useAuthVar();
  const history = useHistory();
  const client = useApolloClient();

  const [getUser, userData] = useLazyQuery(GQL_USER, {
    onError: () => {},
  });

  const [createUser, createUserData] = useMutation(GQL_CREATE_USER, {
    onError: () => {},
    onCompleted: () => {
      toast.success('Account created. you can login now.');
      history.push('/login');
    },
  });

  const [deleteUser, deleteUserData] = useMutation(GQL_DELETE_USER, {
    onError: () => {},
    onCompleted: () => {
      logout(client, authVar.userName, () => {
        window.location.href = '/login ';
      });
    },
  });

  const [updateUser, updateUserData] = useMutation(GQL_UPDATE_USER, {
    onError: () => {},
    onCompleted: () => {
      toast.success('Data updated successfully');
      logout(client, authVar.userName, () => {
        window.location.href = '/login ';
      });
    },
  });

  useEffect(() => {
    if (authVar.isLoggedId && !userData?.data?.user) {
      getUser({
        variables: {
          userId: authVar.userId,
        },
      });
    }
  }, [authVar, userData.data, getUser]);

  const handleSubmit = (formData) => {
    if (!authVar.isLoggedId) return handleCreateUser(formData);

    return handleUpdateUser(formData);
  };

  const handleCreateUser = async (formData) => {
    await createUser({
      variables: {
        data: {
          ...formData,
        },
      },
    });
  };

  const handleUpdateUser = async (formData) => {
    const cleanedFormData = {};

    for (const key in formData) {
      if (formData[key]) {
        cleanedFormData[key] = formData[key];
      }
    }

    await updateUser({
      variables: {
        userId: authVar.userId,
        data: {
          ...cleanedFormData,
        },
      },
    });
  };

  const handleDelete = async () => {
    const shouldDelete = confirm('Are you sure you want to delete?');

    if (!shouldDelete) return;

    await deleteUser({
      variables: {
        userId: authVar.userId,
      },
    });
  };

  return (
    <>
      <Helmet title="Register - GraphQL + Apollo-Client - Otávio Miranda" />
      <RegisterForm
        handleSubmitCb={(data) => handleSubmit(data)}
        authData={userData?.data?.user}
        formError={
          updateUserData?.error?.message ||
          createUserData?.error?.message ||
          deleteUserData?.error?.message ||
          userData?.error?.message
        }
        somethingLoading={
          updateUserData?.loading ||
          createUserData?.loading ||
          deleteUserData?.loading ||
          userData?.loading
        }
      />
      {authVar.isLoggedId && (
        <DefaultContainer>
          <FormButton bgColor="secondary" onClick={handleDelete}>
            Delete account
          </FormButton>
        </DefaultContainer>
      )}
    </>
  );
};
