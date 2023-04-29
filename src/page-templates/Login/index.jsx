import { useMutation } from '@apollo/client';
import { AuthForm } from 'components/AuthForm';
import { Helmet } from 'react-helmet';

import { GQL_LOGIN } from '../../graphql/mutations/auth';
import { Loading } from 'components/Loading';
import { loginFormVar } from 'graphql/reactive-var/login-form';

export const Login = () => {
  loginFormVar.use();

  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
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

    loginFormVar.set({ ...data });

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
      />
    </>
  );
};
