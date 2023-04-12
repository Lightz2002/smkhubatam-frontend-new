import { List } from "@mui/material";
import React from "react";
import DashboardSidebarMenuItem from "./DashboardSidebarMenuItem";

const DashboardSidebarMenu = ({ menus, loading }) => {
  return (
    // <Stack
    //   sx={{
    //     flexGrow: 1,
    //     py: 3,
    //     display: "flex",
    //     flex: 1,
    //   }}
    //   spacing={2}
    // >
    //   {menus.map(menu => (
    //     <DashboardSidebarMenuItem key={menu.Id} menu={menu} />
    //   ))}
    // </Stack>

    <List>
      {loading && <div>Loading...</div>}
      {menus.map(menu => (
        <DashboardSidebarMenuItem key={menu.Id} menu={menu} />
      ))}
    </List>
  );
};

export default DashboardSidebarMenu;
