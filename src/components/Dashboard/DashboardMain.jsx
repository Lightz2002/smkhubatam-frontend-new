import { Box, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardMainNavbar from "./DashboardMainNavbar";

const DashboardMain = () => {
  return (
    <Grid item xs={10}>
      <Box>
        <DashboardMainNavbar />
        <Box sx={{ px: 3, py: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Grid>
  );
};

export default DashboardMain;
