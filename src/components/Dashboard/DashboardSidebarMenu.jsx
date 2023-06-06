import { List } from "@mui/material";
import React from "react";
import DashboardSidebarMenuItem from "./DashboardSidebarMenuItem";

const DashboardSidebarMenu = ({ menus, loading }) => {
  return (
    <List>
      {loading && <div>Loading...</div>}
      {menus.map(menu => (
        <DashboardSidebarMenuItem key={menu.Id} menu={menu} />
      ))}
    </List>
  );
};

export default DashboardSidebarMenu;
