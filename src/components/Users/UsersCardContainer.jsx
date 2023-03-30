import { Grid } from "@mui/material";
import React from "react";
import { useUsers } from "../../contexts/UsersContext";
import { getRandomColor } from "../../helper";
import UsersCard from "./UsersCard";

const UsersCardContainer = () => {
  const users = useUsers();

  const customUsers = users.map(user => ({ ...user, color: getRandomColor() }));
  return (
    <Grid container spacing={2} sx={{ py: 2 }}>
      {customUsers.map(user => (
        <UsersCard user={user} key={user?.Id} />
      ))}
    </Grid>
  );
};

export default UsersCardContainer;
