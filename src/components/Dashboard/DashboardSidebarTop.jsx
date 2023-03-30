import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
const DashboardSidebarTop = () => {
  const theme = useTheme();
  return (
    <Grid item>
      <AppBar position="static" color="bg" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SchoolIcon sx={{ color: theme.palette.primary.dark }}></SchoolIcon>
            <Typography sx={{ ml: 2, color: theme.palette.primary.dark }}>
              SMK HU
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Grid>
  );
};

export default DashboardSidebarTop;
