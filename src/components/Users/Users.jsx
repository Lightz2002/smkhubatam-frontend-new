import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import UsersProvider, { useUpdateUsers } from "../../contexts/UsersContext";
import { getUsersQuery } from "../../http/queries";
import UsersCardContainer from "./UsersCardContainer";

export const loader = queryClient => async () => {
  try {
    let query = getUsersQuery();
    let response =
      queryClient.getQueryData("users") ??
      (await queryClient.fetchQuery(query));
    console.log(response);
    return response;
  } catch (e) {}
};

const Student = () => {
  const { data: users } = useLoaderData();
  const updateUsers = useUpdateUsers();
  console.log(users);

  useEffect(() => {
    updateUsers(users);
  }, [users, updateUsers]);
  return (
    <>
      <Typography variant="h5">Users</Typography>
      <UsersCardContainer />
    </>
  );
};

export default Student;
