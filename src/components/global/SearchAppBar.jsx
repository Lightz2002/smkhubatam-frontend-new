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
  showSearchButton = true,
  showAddButton = true,
  createButton2 = <></>,
}) {
  return (
    <Box sx={{ flexGrow: 1, m: 0, py: 0.5 }}>
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
          {showSearchButton && (
            <Search search={search} updateSearch={updateSearch}></Search>
          )}
          {showAddButton && (
            <CreateButton navigateToCreate={navigateToCreate}>
              {title}
            </CreateButton>
          )}
          {createButton2}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
