import { Grid, Stack, useTheme } from "@mui/material";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import DashboardSidebarTop from "./DashboardSidebarTop";

function DashboardSidebar({ menus }) {
  const theme = useTheme();

  return (
    <Grid item xs={2}>
      <Stack
        direction="column"
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.bg.main,
        }}
      >
        <DashboardSidebarTop />
        <DashboardSidebarMenu menus={menus} />
      </Stack>
    </Grid>
  );
}
export default DashboardSidebar;
