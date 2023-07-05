import React, { useState } from "react";
import { Outlet, redirect } from "react-router-dom";
import { getUsersQuery } from "../../http/queries";
import UsersCardContainer from "./UsersCardContainer";
import SearchAppBar from "../global/SearchAppBar";
import { handleException } from "../../utils/helper";
import { useQuery } from "@tanstack/react-query";
import CustomizedSnackbars from "../global/CustomizedSnackBar";

export const loader = queryClient => async () => {
  try {
    let query = getUsersQuery();
    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  } catch (e) {
    handleException(e);
    if (e?.response?.status === 401) {
      return redirect("/login");
    }
    return e;
  }
};

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useQuery(getUsersQuery());
  const [openAlert, setOpenAlert] = useState(false);

  function handleSearch(e) {
    const search = e.target.value;
    setSearchTerm(search);
  }

  return (
    <>
      <SearchAppBar
        title="User"
        search={searchTerm}
        updateSearch={handleSearch}
        navigateToCreate="/user/add"
      />
      <UsersCardContainer search={searchTerm} users={data?.data ?? []} />
      <Outlet context={[setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </>
  );
};

export default Users;
