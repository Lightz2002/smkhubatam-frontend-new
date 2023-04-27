import React from "react";
import { getStatusStyle, handleException } from "../../utils/helper";
import {
  getInternshipQuery,
  getLocationsQuery,
  getUsersQuery,
} from "../../http/queries";
import ModalForm from "../global/ModalForm";
import { useParams } from "react-router-dom";
import { Avatar, Box, Chip, Grid, TextField, Typography } from "@mui/material";
import { queryClient } from "../../router";
import { useQuery } from "@tanstack/react-query";

export const loader =
  queryClient =>
  async ({ params }) => {
    try {
      let internshipQuery = {};
      let internship = {};

      let usersQuery = {};
      let users = {};

      let locationsQuery = {};
      let locations = {};

      if (params?.internshipId) {
        internshipQuery = getInternshipQuery(params.internshipId);
        internship =
          queryClient.getQueryData(internshipQuery.queryKey) ??
          queryClient.fetchQuery(internshipQuery);

        usersQuery = getUsersQuery();
        users =
          queryClient.getQueryData(usersQuery.queryKey) ??
          queryClient.fetchQuery(usersQuery);

        locationsQuery = getLocationsQuery();
        locations =
          queryClient.getQueryData(locationsQuery.queryKey) ??
          queryClient.fetchQuery(locationsQuery);
      }

      return {
        internship,
        users,
        locations,
      };
    } catch (e) {
      handleException(e);
      return e;
    }
  };

export const action = queryClient => async () => {
  try {
  } catch (e) {
    handleException(e);
    return e;
  }
};

const InternshipDetail = () => {
  const { internshipId } = useParams();
  const { data: internship, isLoading } = useQuery(
    getInternshipQuery(internshipId)
  );

  if (isLoading) {
    return;
  }

  const internshipStatus = getStatusStyle(internship?.data?.Status?.Name);

  return (
    <ModalForm
      closeNavigation="/internship"
      method="get"
      formAction={`/internship/${internshipId}/edit`}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img
            src={internship?.data?.Location?.Image ?? ""}
            alt={internship?.data?.Location?.Name ?? "location"}
            width="100%"
            sx={{
              width: "80px",
            }}
          />
          <Typography>
            {internship?.data?.Location?.Name ?? "location"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
            <Grid item xs={6}>
              <Typography color="grey">Student</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                avatar={
                  <Avatar
                    alt={internship?.data?.Student?.Name ?? ""}
                    src={internship?.data?.Student?.Image ?? ""}
                  />
                }
                label={internship?.data?.Student?.Name ?? ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
            <Grid item xs={6}>
              <Typography color="grey">Field Mentor</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                avatar={
                  <Avatar
                    alt={internship?.data?.FieldMentor?.Name ?? ""}
                    src={internship?.data?.FieldMentor?.Image ?? ""}
                  />
                }
                label={internship?.data?.FieldMentor?.Name ?? ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
            <Grid item xs={6}>
              <Typography color="grey">School Mentor</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                avatar={
                  <Avatar
                    alt={internship?.data?.SchoolMentor?.Name ?? ""}
                    src={internship?.data?.SchoolMentor?.Image ?? ""}
                  />
                }
                label={internship?.data?.SchoolMentor?.Name ?? ""}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
            <Grid item xs={6}>
              <Typography color="grey">Year</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ ml: 1 }}>{internship?.data?.Year}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ alignItems: "center", mb: 1 }}>
            <Grid item xs={6}>
              <Typography color="grey">Status</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                color={internshipStatus.color}
                label={internshipStatus.name}
                icon={internshipStatus.icon}
                variant="outlined"
              ></Chip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default InternshipDetail;
