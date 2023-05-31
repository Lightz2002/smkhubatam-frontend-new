import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
  Icon,
  List,
} from "@mui/material";
import React from "react";
import { Form } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton = () => {
  const theme = useTheme();

  const handleLogout = e => {
    e.preventDefault();
    console.log("e");
    const form = document.getElementById("logoutForm");
    form.dispatchEvent(new Event("submit"));
    form.submit();
  };

  return (
    <List>
      <ListItem>
        <ListItemButton sx={{ p: 0, m: 0 }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              py: 1,
              pl: 2,
              borderRadius: 2,
              width: "70%",
            }}
          >
            <Form method="post" action="/" id="logoutForm">
              <button
                type="submit"
                style={{
                  background: "none",
                  border: "none",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  type="submit"
                >
                  <ListItemIcon>
                    <Icon
                      sx={{
                        verticalAlign: "middle",
                        width: "100%",
                        p: 0,
                        color: theme.palette.error.light,
                      }}
                    >
                      <LogoutIcon></LogoutIcon>
                    </Icon>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        display: "inline-block",
                        color: theme.palette.error.light,
                        fontSize: "0.8rem",
                      }}
                    >
                      Logout
                    </Typography>
                  </ListItemText>
                </Box>
              </button>
            </Form>
          </Stack>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default LogoutButton;
