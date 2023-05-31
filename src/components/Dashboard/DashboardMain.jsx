import { Box, Toolbar } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardMain = ({ drawerWidth }) => {
  return (
    // <Grid item xs={10}>
    //   <Box>
    //     <DashboardMainNavbar />
    //     <Box
    //       component="main"
    //       sx={{
    //         flexGrow: 1,
    //         p: 3,
    //         width: { sm: `calc(100% - ${drawerWidth}px)` },
    //         px: 3,
    //         py: 2,
    //       }}
    //     >
    //       <Toolbar />
    //       <Outlet />
    //     </Box>
    //   </Box>
    // </Grid>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        backgroundColor: "#EEF2F6",
        minHeight: "100vh",
      }}
    >
      <Toolbar />
      <Box style={{ background: "white", minHeight: "90%" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardMain;
