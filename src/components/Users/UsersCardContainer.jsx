import { Grid } from "@mui/material";
import React from "react";
import { getRandomColor } from "../../utils/helper";
import UsersCard from "./UsersCard";

const UsersCardContainer = ({ search, users }) => {
  const filteredUsers = users
    .filter(user => user.Name.toLowerCase().includes(search.toLowerCase()))
    .map(user => ({ ...user, color: getRandomColor() }));
  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      {filteredUsers.map(user => (
        <UsersCard user={user} key={user?.Id} />
      ))}
    </Grid>
  );
};

export default UsersCardContainer;
