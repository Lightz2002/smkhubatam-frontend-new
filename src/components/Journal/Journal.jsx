import {
  Box,
  Button,
  Chip,
  Input,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchAppBar from "../global/SearchAppBar";
import { DataGrid } from "@mui/x-data-grid";
import { getStatusStyle, handleException } from "../../utils/helper";
import { getJournalsQuery } from "../../http/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Outlet, useActionData, useNavigate } from "react-router-dom";
import moment from "moment";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
import DoneIcon from "@mui/icons-material/Done";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { updateJournalStatus } from "../../http/api";
import ConfirmationDialog from "../global/ConfirmationDialog";

export const loader = queryClient => async () => {
  try {
    let query = getJournalsQuery();
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
      const errors = {};
      const formData = await request.formData();
      const data = Object.fromEntries(formData);

      const response = await updateJournalStatus(data.Id, data);
      return response;
    } catch (e) {
      handleException(e);
      return e;
    }
  };

const Journal = () => {
  const { data: journals, isLoading } = useQuery(getJournalsQuery());
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const actionResponse = useActionData();
  const [openAlert, setOpenAlert] = useState(false);
  const [menus, setMenus] = useState([]);
  const [journalStatus, setJournalStatus] = useState("");
  const [selectedJournalId, setSelectedJournalId] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const user = queryClient.getQueryData(["user"]);
  const userRole = user?.data?.Role?.Name?.toLowerCase();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e, params) => {
    setAnchorEl(e.currentTarget);
    setSelectedJournalId(params.row.Id);
    switch (params.row.Status?.Name?.toLowerCase()) {
      case "verifying":
        setMenus([
          {
            label: "Change To Completed",
            name: "completed",
            icon: <DoneIcon />,
          },
          {
            label: "Change To Rejected",
            name: "rejected",
            icon: <BlockOutlinedIcon />,
          },
        ]);
        break;
      default:
        setMenus([]);
        break;
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (actionResponse?.status === 200) {
      queryClient.invalidateQueries("journals");
      setOpenConfirmDialog(false);
      setOpenAlert(true);
    }
  }, [actionResponse]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      field: "Date",
      headerName: "Date",
      width: 160,
      valueGetter: params =>
        `${moment(params.row.Date).format("DD MMMM YYYY") || ""}`,
    },
    // {
    //   field: "Location",
    //   headerName: "Location",
    //   width: 130,
    //   valueGetter: params => `${params.row.Location?.Name || ""}`,
    // },
    {
      field: "Student",
      headerName: "Student",
      width: 130,
      valueGetter: params => `${params.row.Student?.Name || ""}`,
    },
    {
      field: "Absence",
      headerName: "Absence",
      width: 130,
      valueGetter: params => `${params.row.Absence || ""}`,
    },

    // {
    //   field: "AbsenceNote",
    //   headerName: "Absence Note",
    //   width: 130,
    //   valueGetter: params => `${params.row.AbsenceNote || ""}`,
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
  ];

  if (userRole !== "student") {
    columns.push({
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
                    setJournalStatus(menu.name);

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
                formAction="/journal"
              >
                <Input type="hidden" name="Status" value={journalStatus} />
                <Input type="hidden" name="Id" value={selectedJournalId} />
              </ConfirmationDialog>
            )}
          </div>
        );
      },
    });
  }

  function handleRowClick(journalId) {
    navigate(`/journal/${journalId}`);
  }

  function handleOnCellClick(cell, e) {
    if (cell.field.toLowerCase() === "actions") {
      e.stopPropagation();
    }
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <SearchAppBar
        title="Journal"
        navigateToCreate="/journal/add"
        showAddButton={userRole === "student"}
        showSearchButton={false}
      />
      <DataGrid
        columns={columns}
        rows={journals?.data ?? []}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={row => row.Id}
        onRowClick={({ row }) => handleRowClick(row.Id)}
        onCellClick={handleOnCellClick}
      />
      <Outlet context={[openAlert, setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </Box>
  );
};

export default Journal;
