import React, { useEffect, useState } from "react";
import { handleException } from "../../utils/helper";
import ModalForm from "../global/ModalForm";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { createJournal, updateJournal } from "../../http/api";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import ErrorText from "../global/ErrorText";

export const action =
  queryClient =>
  async ({ request, params }) => {
    let errors = {};
    try {
      const formData = await request.formData();
      let journal = Object.fromEntries(formData);

      journal = {
        ...journal,
        Date: moment(
          journal.Date.replace(/[^a-zA-Z0-9\s]/g, ""),
          "DD MMMM YYYY"
        ).format("YYYY-MM-DD"),
      };

      let response = {};
      if (params?.journalId) {
        response = await updateJournal(params.journalId, journal);
        queryClient.invalidateQueries("journal", params.journalId);
      } else {
        response = await createJournal(journal);
      }

      return response;
    } catch (e) {
      handleException(e);
      if (e?.response?.data) {
        errors = e.response.data;
      }
      return errors;
    }
  };

const JournalForm = () => {
  const defaultRole = {
    closeNavigation: "/journal",
    formAction: "/journal/add",
    title: "Add Journal",
  };
  const [modalData, setModalData] = useState(defaultRole);
  const params = useParams();
  const queryClient = useQueryClient();
  const [openAlert, setOpenAlert] = useOutletContext();

  const journal = useLoaderData();
  const navigate = useNavigate();
  const actionResponse = useActionData();
  const absenceTypes = [
    {
      name: "Izin",
    },
    {
      name: "Hadir",
    },
    { name: "Tidak Hadir" },
  ];

  useEffect(() => {
    if (Object.values(journal).length > 0) {
      setModalData({
        closeNavigation: "/journal",
        formAction: `/journal/${params?.journalId}/edit`,
        title: "Edit Journal",
      });
    }

    return () => {
      setModalData(defaultRole);
    };
  }, [journal]);

  useEffect(() => {
    if (actionResponse?.status === 201) {
      queryClient.invalidateQueries("journals");
      navigate("/journal");
      setOpenAlert(true);
    } else if (actionResponse?.status === 200) {
      queryClient.invalidateQueries("journal", params.journalId);
      navigate(`/journal/${params.journalId}`);
      setOpenAlert(true);
    }
  }, [actionResponse]);

  return (
    <ModalForm
      closeNavigation={modalData.closeNavigation}
      formAction={modalData.formAction}
      title={modalData.title}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={1}>
          {actionResponse?.message && (
            <Grid item xs={12} sx={{ mt: 0, pt: 0, mb: 2 }}>
              <ErrorText text={actionResponse?.message} />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl sx={{ my: 1, px: 1, mt: 0 }}>
              <FormLabel
                id="absence-label"
                sx={{
                  fontSize: 14,
                }}
              >
                Absence
              </FormLabel>
              <RadioGroup
                aria-labelledby="absence-label"
                defaultValue={journal?.data?.Absence ?? "Hadir"}
                name="Absence"
                required
                row
              >
                {absenceTypes.map(absenceType => (
                  <FormControlLabel
                    key={absenceType.name}
                    value={absenceType.name}
                    control={<Radio />}
                    label={absenceType.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="AbsenceNote"
              label="Absence Note"
              name="AbsenceNote"
              fullWidth
              variant="outlined"
              defaultValue={journal?.data?.AbsenceNote ?? ""}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              id="Note"
              label="Note"
              name="Note"
              fullWidth
              variant="outlined"
              defaultValue={journal?.data?.Note ?? ""}
              multiline
              sx={{ mb: 1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true, name: "Date" } }}
              defaultValue={dayjs(journal?.data?.Date)}
              format="DD MMMM YYYY"
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </ModalForm>
  );
};

export default JournalForm;
