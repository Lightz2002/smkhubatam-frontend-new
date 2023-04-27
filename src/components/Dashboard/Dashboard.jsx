import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import UsersProvider from "../../contexts/UsersContext";
import { handleException } from "../../utils/helper";
import { getRoleMenuQuery, profileQuery } from "../../http/queries";
import DashboardMain from "./DashboardMain";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const loader = queryClient => async () => {
  try {
    const query1 = profileQuery();
    let profile =
      queryClient.getQueryData(query1.queryKey) ??
      (await queryClient.fetchQuery(query1));

    const roleId = profile?.data?.Role?.Id;
    const query2 = getRoleMenuQuery(roleId);
    let menus =
      queryClient.getQueryData(query2.queryKey) ??
      (await queryClient.fetchQuery(query2));
    return {
      profile,
      menus,
    };
  } catch (e) {
    handleException(e);
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
      queryClient.clear();
      return redirect("/login");
    } catch (e) {
      handleException(e);
      return e;
    }
  };

const Dashboard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: data1, isLoading, error } = useQuery(profileQuery());
  const {
    data: data2,
    isLoading: roleMenuIsLoading,
    fetchStatus,
    status,
  } = useQuery(getRoleMenuQuery(data1?.data?.Role?.Id));

  const drawerWidth = 220;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (error?.response?.statusCode === 401) {
    queryClient.clear();
    navigate("/login");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <UsersProvider>
        <CssBaseline />
        <DashboardNavbar
          user={data1?.data ?? []}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <DashboardSidebar
          menus={data2?.data ?? []}
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          loading={roleMenuIsLoading}
        />
        <DashboardMain drawerWidth={drawerWidth} />
        <ReactQueryDevtools position="bottom-right" />
      </UsersProvider>
    </Box>
  );
};

export default Dashboard;
