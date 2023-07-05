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
import { getMajorsQuery, getSchoolClassQuery } from "../../http/queries";
import { handleException } from "../../utils/helper";
import { updateSchoolClass } from "../../http/api";
import {
  useActionData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";

export const loader =
  queryClient =>
  async ({ params }) => {
    try {
      const query1 = getMajorsQuery();
      const response1 =
        queryClient.getQueryData(query1.queryKey) ??
        queryClient.fetchQuery(query1);

      const query2 = getSchoolClassQuery(params.schoolClassId);
      const response2 =
        queryClient.getQueryData(query2.queryKey) ??
        queryClient.fetchQuery(query2);

      return {
        majors: response1,
        schoolClass: response2,
      };
    } catch (e) {
      handleException(e);
      return e;
    }
  };

export const action =
  queryClient =>
  async ({ request, params }) => {
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

      let response = await updateSchoolClass(params.schoolClassId, schoolClass);
      return response;
    } catch (e) {
      handleException(e);
      return errors;
    }
  };

const SchoolClassDetail = () => {
  const { schoolClassId } = useParams();
  const { data: majors } = useQuery(getMajorsQuery());
  const { data: schoolClass, isLoading } = useQuery(
    getSchoolClassQuery(schoolClassId)
  );

  const [setOpenAlert] = useOutletContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const actionResponse = useActionData();

  useEffect(() => {
    if (actionResponse?.status === 200) {
      queryClient.invalidateQueries("schoolclasses");
      navigate("/class");
      setOpenAlert(true);
    }
  }, [actionResponse, queryClient, navigate, setOpenAlert]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ModalForm
      closeNavigation="/class"
      title="View Class"
      formAction={`/class/${schoolClassId}`}
      method="post"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="major-select-label">Major</InputLabel>

            <Select
              labelId="major-select-label"
              id="major-select"
              defaultValue={schoolClass.data.Major?.Id ?? ""}
              label="Major"
              name="Major"
              required
              variant="outlined"
              fullWidth
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
            type="number"
            defaultValue={schoolClass?.data?.Code ?? ""}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-read-only-input"
            label="Year"
            name="Year"
            margin="dense"
            defaultValue={schoolClass?.data?.Year ?? ""}
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
            defaultValue={schoolClass?.data?.StudentCount ?? ""}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default SchoolClassDetail;
