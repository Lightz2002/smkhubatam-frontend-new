import React from "react";
import {
  AppBar,
  Box,
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
        <Container>
          <Toolbar disableGutters>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SchoolIcon
                sx={{ color: theme.palette.primary.dark }}
              ></SchoolIcon>
              <Typography sx={{ ml: 2, color: theme.palette.primary.dark }}>
                SMK HU
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Grid>
  );
};

export default DashboardSidebarTop;
