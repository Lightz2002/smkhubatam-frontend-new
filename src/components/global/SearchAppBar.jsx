import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Search } from "./Search";
import CreateButton from "./CreateButton";

export default function SearchAppBar({
  title,
  search,
  updateSearch,
  navigateToCreate,
}) {
  return (
    <Box sx={{ flexGrow: 1, m: 0, p: 0 }}>
      <AppBar position="static" sx={{ background: "white" }} elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="black"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            {title}
          </Typography>
          <Search search={search} updateSearch={updateSearch}></Search>
          <CreateButton navigateToCreate={navigateToCreate}>
            {title}
          </CreateButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
