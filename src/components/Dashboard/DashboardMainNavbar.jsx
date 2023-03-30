import { AppBar, Box, Toolbar, Button } from "@mui/material";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../../contexts/UserContext";
import { Form } from "react-router-dom";

function DashboardMainNavbar() {
  const user = useUser();
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              borderRadius: "50%",
              width: 50,
              height: 50,
              backgroundColor: theme.palette.primary.main,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              me: 5,
            }}
          >
            <Typography>R</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
            <Typography
              variant="body2"
              noWrap
              component="a"
              href="/"
              sx={{
                display: { md: "flex" },
                fontWeight: 700,
                color: theme.palette.primary.dark,
                textDecoration: "none",
              }}
            >
              Welcome Back,
              <Typography
                variant="body2"
                sx={{
                  display: { md: "flex" },
                  p: 0,
                  ml: 0.5,
                  color: theme.palette.primary.main,
                }}
              >
                {user?.Name}
              </Typography>
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.grey[500],
                textDecoration: "none",
              }}
            >
              {user?.Role?.Name ?? ""}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <Form method="post" action="/">
              <Button type="submit">Logout</Button>
            </Form>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default DashboardMainNavbar;
