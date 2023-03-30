import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import CameraIcon from "@mui/icons-material/Camera";
const DashboardSidebarMenuItem = ({ menu }) => {
  const theme = useTheme();
  return (
    <Box>
      <NavLink
        to={menu.Name.toLowerCase()}
        style={({ isActive, isPending }) => {
          return {
            textDecoration: "none",
          };
        }}
      >
        {({ isActive, isPending }) => (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{
              py: 1,
              backgroundColor: isActive ? theme.palette.primary.dark : "",
            }}
          >
            <Box
              sx={{
                width: "70%",
              }}
            >
              <CameraIcon
                sx={{
                  verticalAlign: "middle",
                  mr: 2,
                  color: isActive
                    ? theme.palette.common.white
                    : theme.palette.primary.dark,
                }}
              ></CameraIcon>
              <Typography
                sx={{
                  display: "inline-block",
                  color: isActive
                    ? theme.palette.common.white
                    : theme.palette.primary.dark,
                }}
              >
                {menu.Name}
              </Typography>
            </Box>
          </Stack>
        )}
      </NavLink>
    </Box>
  );
};

export default DashboardSidebarMenuItem;
