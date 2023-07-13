import React from "react";
import { getStatusStyle, handleException } from "../../utils/helper";
import { getJournalQuery } from "../../http/queries";
import ModalForm from "../global/ModalForm";
import { useParams } from "react-router-dom";
import { Avatar, Chip, Grid, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

export const loader =
  queryClient =>
  async ({ params }) => {
    try {
      let journalQuery = {};
      let journal = {};

      if (params?.journalId) {
        journalQuery = getJournalQuery(params.journalId);
        journal =
          queryClient.getQueryData(journalQuery.queryKey) ??
          queryClient.fetchQuery(journalQuery);
      }

      return journal;
    } catch (e) {
      handleException(e);
      return e;
    }
  };

const JournalDetail = () => {
  const { journalId } = useParams();
  const queryClient = useQueryClient();
  const { data: journal } = useQuery(getJournalQuery(journalId));
  const user = queryClient.getQueryData(["user"]);

  const journalStatus = getStatusStyle(journal?.data?.Status?.Name);

  return (
    <ModalForm
      closeNavigation="/journal"
      title="View Journal"
      method="get"
      formAction={`/journal/${journalId}/edit`}
      showEditButton={
        user?.data?.Role?.Name?.toLowerCase() === "student" &&
        journal?.data?.Status?.Name?.toLowerCase() === "verifying"
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img
            src={journal?.data?.Student?.Internship?.Location?.Image}
            alt={journal?.data?.Student?.Internship?.Location?.Name}
            width="100%"
          />
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography color="grey">Student</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                avatar={
                  <Avatar
                    alt={journal?.data?.Student?.Name ?? ""}
                    src={journal?.data?.Student?.Image ?? ""}
                  />
                }
                label={journal?.data?.Student?.Name ?? ""}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography color="grey">Date</Typography>
            </Grid>
            <Grid item xs={6}>
              {moment(journal?.data?.Date).format("DD MMM YYYY")}
            </Grid>
            <Grid item xs={6}>
              <Typography color="grey">Absence</Typography>
            </Grid>
            <Grid item xs={6}>
              {journal?.data?.Absence}
            </Grid>
            <Grid item xs={6}>
              <Typography color="grey">Absence Note</Typography>
            </Grid>
            <Grid item xs={6}>
              {journal?.data?.AbsenceNote}
            </Grid>
            <Grid item xs={6}>
              <Typography color="grey">Status</Typography>
            </Grid>
            <Grid item xs={6}>
              <Chip
                color={journalStatus.color}
                label={journalStatus.name}
                icon={journalStatus.icon}
                variant="outlined"
              ></Chip>
            </Grid>
            <Grid item xs={6}>
              <Typography color="grey">Note</Typography>
            </Grid>
            <Grid item xs={6}>
              {journal?.data?.Note}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default JournalDetail;
