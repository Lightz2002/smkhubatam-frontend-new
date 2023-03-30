import { Grid, Stack } from "@mui/material";
import React from "react";
import DashboardSidebarMenuItem from "./DashboardSidebarMenuItem";

const DashboardSidebarMenu = ({ menus }) => {
  return (
    <Stack
      sx={{
        flexGrow: 1,
        py: 3,
        display: "flex",
        flex: 1,
      }}
      spacing={2}
    >
      {menus.map(menu => (
        <DashboardSidebarMenuItem key={menu.Id} menu={menu} />
      ))}
    </Stack>
  );
};

export default DashboardSidebarMenu;
