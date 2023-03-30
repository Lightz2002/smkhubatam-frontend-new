import { createContext, useContext, useState } from "react";

const UsersContext = createContext({});
const UpdateUsersContext = createContext({});

export function useUsers() {
  return useContext(UsersContext);
}

export function useUpdateUsers() {
  return useContext(UpdateUsersContext);
}

function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);

  function updateUsers(newUsers) {
    setUsers(newUsers);
  }

  return (
    <UsersContext.Provider value={users}>
      <UpdateUsersContext.Provider value={updateUsers}>
        {children}
      </UpdateUsersContext.Provider>
    </UsersContext.Provider>
  );
}

export default UsersProvider;
