import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Logo from "../../assets/logo.jpg";

const DashboardSidebarTop = () => {
  return (
    <Grid item>
      <AppBar position="static" color="bg" elevation={0}>
        <Container>
          <Toolbar disableGutters>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginX: "auto",
              }}
            >
              <img src={Logo} alt="logo" width="50" height="50" />
              <Typography sx={{ ml: 2 }}>SMK HU</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Grid>
  );
};

export default DashboardSidebarTop;
