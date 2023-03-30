import { getRoleMenu, getUsers, profile } from "./api";

export const profileQuery = () => ({
  queryKey: ["user"],
  queryFn: async () => {
    const user = await profile();
    return user;
  },
});

export const getRoleMenuQuery = roleId => ({
  queryKey: ["menu"],
  queryFn: async () => {
    const menu = await getRoleMenu(roleId);
    return menu;
  },
});

export const getUsersQuery = () => ({
  queryKey: ["users"],
  queryFn: async () => {
    const users = await getUsers();
    return users;
  },
});
