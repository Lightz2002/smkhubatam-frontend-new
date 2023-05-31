import { Grid } from "@mui/material";
import React from "react";
import { getRandomColor } from "../../utils/helper";
import UsersCard from "./UsersCard";

const UsersCardContainer = ({ search, users }) => {
  const filteredUsers = users
    .filter(user => user.Name.toLowerCase().includes(search.toLowerCase()))
    .map(user => ({ ...user, color: getRandomColor() }));
  return (
    <Grid
      container
      justify="space-between"
      spacing={2}
      sx={{
        py: 2,
        px: 2,
        pl: "-2px",
        m: 0,
        width: "100%",
      }}
    >
      {filteredUsers.map(user => (
        <UsersCard user={user} key={user?.Id} />
      ))}
    </Grid>
  );
};

export default UsersCardContainer;
