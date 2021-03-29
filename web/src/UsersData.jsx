import React, { useState, createContext, useContext } from 'react';

const UsersDataContext = createContext({});
const UsersDataUpdateContext = createContext(() => {});

export const useUsersData = () => useContext(UsersDataContext);

export const useUsersDataUpdate = () => useContext(UsersDataUpdateContext);

const ContextApp = ({ children }) => {
  const [usersData, setUsersData] = useState([
    {
      name: '',
      surname: '',
      email: '',
      id: null,
    },
  ]);

  return (
    <UsersDataContext.Provider value={usersData}>
      <UsersDataUpdateContext.Provider value={setUsersData}>
        {children}
      </UsersDataUpdateContext.Provider>
    </UsersDataContext.Provider>
  );
};

export default ContextApp;
