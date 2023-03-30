import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { useUpdateUser } from "../../contexts/UserContext";
import UsersProvider from "../../contexts/UsersContext";
import { getRoleMenuQuery, profileQuery } from "../../http/queries";
import DashboardMain from "./DashboardMain";
import DashboardSidebar from "./DashboardSidebar";

export const loader = queryClient => async () => {
  try {
    let profile =
      queryClient.getQueryData("profile") ??
      (await queryClient.fetchQuery(profileQuery()));

    const roleId = profile?.data?.Role?.Id;
    let menus =
      queryClient.getQueryData("menu") ??
      (await queryClient.fetchQuery(getRoleMenuQuery(roleId)));

    return {
      profile,
      menus,
    };
  } catch (e) {
    if (e?.response?.status === 401) {
      return redirect("/login");
    }
    return e;
  }
};

export const action =
  queryClient =>
  async ({ request }) => {
    try {
      localStorage.setItem("token", " ");
      queryClient.setQueryData("user", null);
      return redirect("/login");
    } catch (e) {
      return e;
    }
  };

const Dashboard = () => {
  const {
    profile: { data: user },
    menus: { data: menus },
  } = useLoaderData();
  const updateUser = useUpdateUser();

  useEffect(() => {
    updateUser(user);
  }, [user, updateUser]);

  return (
    <Grid container>
      <UsersProvider>
        <DashboardSidebar menus={menus} />
        <DashboardMain />
      </UsersProvider>
    </Grid>
  );
};

export default Dashboard;
