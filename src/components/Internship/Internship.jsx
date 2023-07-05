import {
  Box,
  Button,
  Chip,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatusStyle, handleException } from "../../utils/helper";
import { getInternshipsQuery } from "../../http/queries";
import SearchAppBar from "../global/SearchAppBar";
import { Outlet, useActionData, useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
import ConfirmationDialog from "../global/ConfirmationDialog";
import DoneIcon from "@mui/icons-material/Done";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import { updateInternshipStatus } from "../../http/api";

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

export const action =
  queryClient =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      const response = await updateInternshipStatus(data.Id, data);
      return response;
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
  const [menus, setMenus] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState("");
  const [internshipStatus, setInternshipStatus] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const actionResponse = useActionData();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (actionResponse?.status === 200) {
      queryClient.invalidateQueries("internships");
      setOpenConfirmDialog(false);
      setOpenAlert(true);
    }
  }, [actionResponse, queryClient]);

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
    // {
    //   field: "Field Mentor",
    //   headerName: "Field Mentor",
    //   width: 130,
    //   valueGetter: params => `${params.row.FieldMentor?.Name || ""}`,
    // },
    // {
    //   field: "School Mentor",
    //   headerName: "School Mentor",
    //   width: 130,
    //   valueGetter: params => `${params.row.SchoolMentor?.Name || ""}`,
    // },
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
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      valueGetter: params => `${params.row.id || ""}`,
      renderCell: params => {
        return (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={e => handleClick(e, params)}
            >
              Actions
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {menus.map(menu => (
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: 0,
                    display: "block",
                  }}
                  onClick={() => {
                    setInternshipStatus(menu.name);

                    setOpenConfirmDialog(true);
                  }}
                >
                  <MenuItem key={menu.name}>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText>{menu.label}</ListItemText>
                  </MenuItem>
                </button>
              ))}
            </Menu>
            {openConfirmDialog && (
              <ConfirmationDialog
                title="Confirm Action"
                open={openConfirmDialog}
                setOpen={setOpenConfirmDialog}
                formAction="/internship"
              >
                <Input type="hidden" name="Status" value={internshipStatus} />
                <Input type="hidden" name="Id" value={selectedInternshipId} />
              </ConfirmationDialog>
            )}
          </div>
        );
      },
    },
  ];

  function handleRowClick(internshipId) {
    navigate(`/internship/${internshipId}`);
  }

  function handleOnCellClick(cell, e) {
    if (cell.field.toLowerCase() === "actions") {
      e.stopPropagation();
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (e, params) => {
    setAnchorEl(e.currentTarget);
    setSelectedInternshipId(params.row.Id);
    switch (params.row.Status?.Name?.toLowerCase()) {
      case "entry":
        setMenus([
          {
            label: "Change To Ongoing",
            name: "ongoing",
            icon: <HourglassBottomOutlinedIcon />,
          },
        ]);
        break;
      case "ongoing":
        setMenus([
          {
            label: "Change To Completed",
            name: "completed",
            icon: <DoneIcon />,
          },
        ]);
        break;
      default:
        setMenus([]);
        break;
    }
  };

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
        onCellClick={handleOnCellClick}
      />
      <Outlet context={[setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </Box>
  );
};

export default Internship;
