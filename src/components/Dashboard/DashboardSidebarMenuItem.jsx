import {
  Box,
  Stack,
  Typography,
  useTheme,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import CameraIcon from "@mui/icons-material/Camera";
import Skeleton from "react-loading-skeleton";
const DashboardSidebarMenuItem = ({ menu }) => {
  const theme = useTheme();
  return (
    <ListItem disablePadding>
      <ListItemButton sx={{ p: 0, m: 0 }}>
        <NavLink
          to={menu.Name.toLowerCase().replace(" ", "-")}
          style={({ isActive, isPending }) => {
            return {
              display: "inline-block",
              width: "100%",
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
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: isActive ? theme.palette.primary.dark : "",
                  alignItems: "center",
                }}
              >
                <ListItemIcon>
                  <CameraIcon
                    sx={{
                      verticalAlign: "middle",
                      width: "100%",
                      p: 0,
                      color: isActive
                        ? theme.palette.common.white
                        : theme.palette.primary.dark,
                    }}
                  ></CameraIcon>
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      display: "inline-block",
                      color: isActive
                        ? theme.palette.common.white
                        : theme.palette.primary.dark,
                    }}
                  >
                    {menu.Name || <Skeleton />}
                  </Typography>
                </ListItemText>
              </Box>
            </Stack>
          )}
        </NavLink>
      </ListItemButton>
    </ListItem>
  );
};

export default DashboardSidebarMenuItem;
