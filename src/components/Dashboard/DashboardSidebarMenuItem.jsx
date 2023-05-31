import {
  Box,
  Stack,
  Typography,
  useTheme,
  ListItemIcon,
  ListItem,
  ListItemButton,
  ListItemText,
  Icon,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import CameraIcon from "@mui/icons-material/Camera";
import Skeleton from "react-loading-skeleton";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";

const DashboardSidebarMenuItem = ({ menu }) => {
  const theme = useTheme();

  function getMenuIcon() {
    switch (menu.Name.toLowerCase().replace(" ", "-")) {
      case "user":
        return <GroupOutlinedIcon></GroupOutlinedIcon>;
      case "location":
        return <FmdGoodOutlinedIcon></FmdGoodOutlinedIcon>;
      case "internship":
        return <AssignmentIndOutlinedIcon></AssignmentIndOutlinedIcon>;
      case "class":
        return <MeetingRoomOutlinedIcon></MeetingRoomOutlinedIcon>;
      case "journal":
        return <BookOutlinedIcon></BookOutlinedIcon>;
      default:
        return <CameraIcon></CameraIcon>;
    }
  }

  return (
    <ListItem>
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
              spacing={2}
              sx={{
                py: 1,
                pl: 2,
                backgroundColor: isActive ? theme.palette.primary.dark : "",
                borderRadius: 2,
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
                  <Icon
                    sx={{
                      verticalAlign: "middle",
                      width: "100%",
                      p: 0,
                      color: isActive
                        ? theme.palette.common.white
                        : theme.palette.primary.dark,
                    }}
                  >
                    {getMenuIcon()}
                  </Icon>
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    sx={{
                      display: "inline-block",
                      color: isActive
                        ? theme.palette.common.white
                        : theme.palette.primary.dark,
                      fontSize: "0.8rem",
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
