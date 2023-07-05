import React, { useEffect } from "react";
import ModalForm from "../global/ModalForm";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMajorsQuery } from "../../http/queries";
import { handleException } from "../../utils/helper";
import { createSchoolClass } from "../../http/api";
import { useActionData, useNavigate, useOutletContext } from "react-router-dom";

export const loader = queryClient => async () => {
  try {
    let query = getMajorsQuery();
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
    const errors = {};
    try {
      const formData = await request.formData();
      let schoolClass = Object.fromEntries(formData);
      schoolClass = {
        ...schoolClass,
        Code: +schoolClass.Code,
        Year: +schoolClass.Year,
        StudentCount: +schoolClass.StudentCount,
      };

      let response = await createSchoolClass(schoolClass);
      return response;
    } catch (e) {
      handleException(e);
      return errors;
    }
  };

const SchoolClassCreateForm = () => {
  const { data: majors } = useQuery(getMajorsQuery());
  const [setOpenAlert] = useOutletContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const actionResponse = useActionData();

  useEffect(() => {
    if (actionResponse?.status === 201) {
      queryClient.invalidateQueries("schoolclasses");
      navigate("/class");
      setOpenAlert(true);
    }
  }, [actionResponse, queryClient, navigate, setOpenAlert]);

  let defaultMajor = "";

  if (majors?.data?.length > 0) {
    defaultMajor = majors.data[0]?.Id;
  }
  return (
    <ModalForm
      closeNavigation="/class"
      title="Create Class"
      formAction="/class/add"
      // method="post"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="major-select-label">Major</InputLabel>
            <Select
              labelId="major-select-label"
              id="major-select"
              defaultValue={defaultMajor}
              label="Major"
              name="Major"
              required
            >
              {majors?.data?.map(major => {
                return (
                  <MenuItem key={major.Id} value={major.Id}>
                    {major.Name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            margin="dense"
            id="Code"
            label="Code"
            name="Code"
            fullWidth
            type="number"
            variant="outlined"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-read-only-input"
            label="Year"
            name="Year"
            margin="dense"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            type="number"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-read-only-input"
            label="Student Count"
            name="StudentCount"
            margin="dense"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            type="number"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default SchoolClassCreateForm;
