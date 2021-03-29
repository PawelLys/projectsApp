import React, { useState, createContext, useContext } from 'react';
import jwt_decode from 'jwt-decode';

const UserTokenContext = createContext({});
const UserTokenUpdateContext = createContext(() => {});

export const useUserToken = () => useContext(UserTokenContext);

export const useUserTokenUpdate = () => useContext(UserTokenUpdateContext);

export const jwtDecode = accessToken => {
  const decodedToken = jwt_decode(accessToken);

  return {
    accessToken,
    email: decodedToken.email,
    userId: parseInt(decodedToken.sub),
  };
};

const ContextApp = ({ children }) => {
  const [userToken, setUserToken] = useState({
    accessToken: '',
    email: '',
    userId: null,
  });

  return (
    <UserTokenContext.Provider value={userToken}>
      <UserTokenUpdateContext.Provider value={setUserToken}>
        {children}
      </UserTokenUpdateContext.Provider>
    </UserTokenContext.Provider>
  );
};

export default ContextApp;
