import { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserUpdateContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUpdateUser() {
  return useContext(UserUpdateContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  function updateUser(newUser) {
    setUser(newUser);
  }

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
