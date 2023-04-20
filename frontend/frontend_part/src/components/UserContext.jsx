import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(window.localStorage.getItem('isLoggedIn')) || false
  );

  useEffect(() => {
    window.localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  return useContext(UserContext);
}

export { UserContextProvider, useUserContext };