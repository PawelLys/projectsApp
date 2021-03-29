import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUserToken } from '../UserJWT';

import { UserPanel } from '../components/panelComponents/UserPanel';
import { AdminPanel } from '../components/panelComponents/AdminPanel';

export const Panel = () => {
  const history = useHistory();
  const userToken = useUserToken();

  useEffect(() => {
    if (!userToken?.accessToken) {
      history.push('/');
    }
  }, []);

  if (userToken.userId) {
    if (userToken.userId < 10 && userToken.userId > 0) return <AdminPanel />;
    else if (userToken.userId >= 10) return <UserPanel />;
  }

  return null;
};
