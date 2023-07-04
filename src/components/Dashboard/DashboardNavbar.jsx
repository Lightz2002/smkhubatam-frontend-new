import { AppBar, Box, Toolbar, Typography, Badge } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useTheme } from "@mui/material/styles";

function DashboardNavbar({ user, drawerWidth, handleDrawerToggle }) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: "white",
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            ml: 2,
            width: "auto",
          }}
        >
          <Typography
            variant="body2"
            noWrap
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.dark,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Welcome Back,
            <Typography
              variant="body2"
              sx={{
                p: 0,
                ml: 0.5,
                color: theme.palette.primary.main,
                display: "inline-block",
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
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              width: 35,
              height: 35,
              backgroundColor: theme.palette.primary.main,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              ml: 2,
            }}
          >
            <Typography>R</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default DashboardNavbar;
