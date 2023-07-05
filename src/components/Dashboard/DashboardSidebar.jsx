import { useTheme, Box, Divider, Drawer } from "@mui/material";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import DashboardSidebarTop from "./DashboardSidebarTop";
import LogoutButton from "../global/LogoutButton";

function DashboardSidebar({
  menus,
  window,
  drawerWidth,
  handleDrawerToggle,
  mobileOpen,
  loading,
}) {
  const drawer = (
    <div>
      <DashboardSidebarTop />
      <Divider />
      <DashboardSidebarMenu menus={menus} loading={loading} />
      <LogoutButton />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default DashboardSidebar;
