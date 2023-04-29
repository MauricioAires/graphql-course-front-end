import { useMutation } from '@apollo/client';
import { AuthForm } from 'components/AuthForm';
import { Helmet } from 'react-helmet';

import { GQL_LOGIN } from '../../graphql/mutations/auth';
import { Loading } from 'components/Loading';
import { useState } from 'react';

export const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [login, { loading, error, data }] = useMutation(GQL_LOGIN, {
    onError: () => {},
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const usernameInput = form.username;
    const passwordInput = form.password;

    const data = {
      userName: usernameInput.value,
      password: passwordInput.value,
    };

    setFormData(data);

    login({
      variables: {
        data,
      },
    });
  };

  if (loading) return <Loading loading={loading} />;
  // if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login - GraphQL + Apollo-Client - Otávio Miranda" />

      <AuthForm
        handleLogin={handleLogin}
        formDisabled={false}
        formError={error?.message}
        formData={formData}
      />
    </>
  );
};
