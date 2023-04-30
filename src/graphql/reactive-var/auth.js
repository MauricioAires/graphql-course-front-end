const { makeVar, useReactiveVar } = require('@apollo/client');

const authVarId = '__auth_data__';

const initialValues = {
  userName: '',
  userId: '',
  isLoggedId: false,
};

const authVar = makeVar({
  ...initialValues,
});

const setVar = (userName = '', userId = '', isLoggedId = false) => {
  localStorage.setItem(
    authVarId,
    JSON.stringify({
      userName,
      userId,
      isLoggedId,
    }),
  );

  authVar({
    userName,
    userId,
    isLoggedId,
  });
};

const getVar = () => authVar();

const resetVar = () => {
  localStorage.removeItem(authVarId);
  authVar({ ...initialValues });
};

const hydrate = () => {
  const localDataStr = localStorage.getItem(authVarId);
  const authVarData = getVar();

  if (!localDataStr) {
    if (authVarData) {
      resetVar();
    }
  }

  if (JSON.stringify(authVarData) === localDataStr) {
    return;
  }

  setVar(JSON.stringify(localDataStr));
};

export const useAuthVar = () => {
  authDataManager.hydrate();

  return useReactiveVar(authVar);
};

export const authDataManager = {
  setVar,
  getVar,
  resetVar,
  hydrate,
};
