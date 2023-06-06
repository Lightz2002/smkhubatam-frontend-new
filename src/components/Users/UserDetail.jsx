import React, { useState } from "react";
import { getRolesQuery, getUserQuery } from "../../http/queries";
import { handleException } from "../../utils/helper";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import ModalForm from "../global/ModalForm";

export const loader =
  queryClient =>
  async ({ request, params }) => {
    try {
      let query = getUserQuery(params.userId);
      const response =
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchQuery(query));

      let query2 = getRolesQuery();
      const response2 =
        queryClient.getQueryData(query2.queryKey) ??
        (await queryClient.fetchQuery(query2));

      // let query2 = getRolesQuery();
      // const response2 =
      //   queryClient.getQueryData(query2.queryKey) ??
      //   (await queryClient.fetchQuery(query2));
      return {
        user: response,
        roles: response2,
      };
    } catch (e) {
      handleException(e);
      return e;
    }
  };

const UserDetail = props => {
  const navigate = useNavigate();
  let { userId } = useParams();
  const { data: user } = useQuery(getUserQuery(userId));
  const { data: roles } = useQuery(getRolesQuery());
  const theme = useTheme();
  const firstLetterOfName = user?.data?.Name[0].toUpperCase();
  const [openAlert, setOpenAlert] = useOutletContext();

  return (
    <ModalForm
      title="User Detail"
      closeNavigation="/user"
      formAction={`/user/${userId}/edit`}
      method="get"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Avatar
                sx={{
                  bgcolor: "BLUE",
                  width: 80,
                  height: 80,
                  fontSize: 30,
                }}
                aria-label="recipe"
                src={user?.data?.Image}
              >
                {!user?.data?.Image && firstLetterOfName}
              </Avatar>
              <Box sx={{ width: "120px", ml: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {user?.data?.Name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.grey[700] }}
                >
                  {user?.data?.Role?.Name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.grey[600],
                    fontWeight: "light",
                  }}
                >
                  {user?.data?.Gender}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-read-only-input"
                  label="Username"
                  value={user?.data?.Username ?? ""}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-read-only-input"
                  label="Birth Place"
                  value={user?.data?.BirthPlace ?? ""}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-read-only-input"
                  label="Birth Date"
                  value={
                    user?.data?.BirthDate
                      ? moment(user?.data?.BirthDate).format("DD MMMM YYYY")
                      : ""
                  }
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>{" "}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  School
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-read-only-input"
                  label="Year Entered"
                  value={user?.data?.YearEntered ?? ""}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-read-only-input"
                  label="School Class"
                  value={
                    user?.data?.SchoolClass
                      ? `${user?.data?.SchoolClass?.Code} ${user?.data?.SchoolClass?.Major?.Code}`
                      : ""
                  }
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="filled-read-only-input"
                  label="Intern Location"
                  value={user?.data?.Internship?.Location?.Name ?? ""}
                  InputProps={{
                    readOnly: true,
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                />
              </Grid>{" "}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default UserDetail;
