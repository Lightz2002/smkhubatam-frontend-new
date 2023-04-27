import { Box, Chip } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatusStyle, handleException } from "../../utils/helper";
import { getInternshipsQuery } from "../../http/queries";
import SearchAppBar from "../global/SearchAppBar";
import { Outlet, useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../global/CustomizedSnackBar";

export const loader = queryClient => async () => {
  try {
    let query = getInternshipsQuery();
    return (
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query)
    );
  } catch (e) {
    handleException(e);
    return e;
  }
};

const Internship = () => {
  const { data: internships, isLoading } = useQuery(getInternshipsQuery());
  const [openAlert, setOpenAlert] = useState(false);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const columns = [
    {
      field: "Location",
      headerName: "Location",
      width: 160,
      valueGetter: params => `${params.row.Location?.Name || ""}`,
    },
    {
      field: "Student",
      headerName: "Student",
      width: 130,
      valueGetter: params => `${params.row.Student?.Name || ""}`,
    },
    {
      field: "Year",
      headerName: "Year",
      width: 90,
    },
    {
      field: "Field Mentor",
      headerName: "Field Mentor",
      width: 130,
      valueGetter: params => `${params.row.FieldMentor?.Name || ""}`,
    },
    {
      field: "School Mentor",
      headerName: "School Mentor",
      width: 130,
      valueGetter: params => `${params.row.SchoolMentor?.Name || ""}`,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 200,
      valueGetter: params => `${params.row.Status?.Name || ""}`,
      renderCell: params => {
        const internshipStatus = getStatusStyle(params.row?.Status?.Name);

        return (
          <Chip
            color={internshipStatus.color}
            label={internshipStatus.name}
            icon={internshipStatus.icon}
            variant="outlined"
          ></Chip>
        );
      },
    },
  ];

  function handleRowClick(internshipId) {
    navigate(`/internship/${internshipId}`);
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <SearchAppBar
        title="Internship"
        navigateToCreate="/internship/add"
        showSearchButton={false}
        showAddButton={user?.data?.Role?.Name?.toLowerCase() !== "student"}
      />
      <DataGrid
        rows={internships?.data ?? []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={row => row.Id}
        onRowClick={({ row }) => handleRowClick(row.Id)}
      />
      <Outlet context={[openAlert, setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </Box>
  );
};

export default Internship;
