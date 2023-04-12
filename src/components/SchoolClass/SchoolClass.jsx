import { Box } from "@mui/material";
import React, { useState } from "react";
import { handleException } from "../../utils/helper";
import { getSchoolClassesQuery } from "../../http/queries";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "@mui/x-data-grid";
import SearchAppBar from "../global/SearchAppBar";
import { Outlet } from "react-router-dom";
import CustomizedSnackbars from "../global/CustomizedSnackBar";

export const loader = queryClient => async () => {
  try {
    let query = getSchoolClassesQuery();
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  } catch (e) {
    handleException(e);
    return e;
  }
};

const SchoolClass = () => {
  const { data: schoolClasses, isLoading } = useQuery(getSchoolClassesQuery());
  const [openAlert, setOpenAlert] = useState(false);

  console.log(schoolClasses);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      field: "Name",
      headerName: "Name",
      width: 160,
      valueGetter: params =>
        `${params.row.Code || ""} ${params.row.Major?.Name || ""}`,
    },
    {
      field: "Major.Name",
      headerName: "Major",
      width: 130,
      valueGetter: params => `${params.row.Major?.Name || ""}`,
    },
    {
      field: "Year",
      headerName: "Year",
      width: 90,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <SearchAppBar
        title="School Class"
        // search={searchTerm}
        // updateSearch={handleSearch}
        navigateToCreate="/school-class/add"
      />
      <DataGrid
        rows={schoolClasses?.data ?? []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={row => row.Id}
      />
      <Outlet context={[openAlert, setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </Box>
  );
};

export default SchoolClass;
