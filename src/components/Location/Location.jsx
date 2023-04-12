import React, { useState } from "react";
import SearchAppBar from "../global/SearchAppBar";
import { handleException } from "../../utils/helper";
import LocationCardContainer from "./LocationCardContainer";
import { useQuery } from "@tanstack/react-query";
import { getLocationsQuery } from "../../http/queries";
import { Outlet } from "react-router-dom";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
export const loader = queryClient => async () => {
  try {
    const query = getLocationsQuery();
    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  } catch (e) {
    handleException(e);
    return e;
  }
};

const Location = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useQuery(getLocationsQuery());
  const [openAlert, setOpenAlert] = useState(false);

  const handleSearch = e => {
    const search = e.target.value;
    setSearchTerm(search);
  };

  return (
    <div>
      <SearchAppBar
        title="Location"
        search={searchTerm}
        updateSearch={handleSearch}
        navigateToCreate="/location/add"
      />
      <LocationCardContainer search={searchTerm} locations={data?.data ?? []} />
      <Outlet context={[openAlert, setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </div>
  );
};

export default Location;
