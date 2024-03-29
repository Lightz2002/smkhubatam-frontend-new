import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { handleException } from "../../utils/helper";
import { getRolesQuery } from "../../http/queries";
import {
  redirect,
  useActionData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../http/api";
import ErrorText from "../global/ErrorText";
import ModalForm from "../global/ModalForm";

export const loader = queryClient => async () => {
  try {
    let query = getRolesQuery();
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  } catch (e) {
    handleException(e);
  }
};

export const action =
  queryClient =>
  async ({ request }) => {
    const errors = {};
    try {
      const formData = await request.formData();
      const user = Object.fromEntries(formData);

      let response = await createUser(user);
      return response;
    } catch (e) {
      console.log(e);
      handleException(e);
      if (e?.response?.data?.message) {
        errors.message = e.response.data.message;
      }
      if (e?.response?.status === 401) {
        queryClient.clear();
        queryClient.removeQueries();
        return redirect("/login");
      }
      return errors;
    }
  };

const UserCreateForm = () => {
  const queryClient = useQueryClient();
  const errors = useActionData();
  const { data } = useQuery(getRolesQuery());
  const actionResponse = useActionData();
  const navigate = useNavigate();
  const [setOpenAlert] = useOutletContext();

  useEffect(() => {
    if (actionResponse?.status === 201 || actionResponse?.status === 200) {
      queryClient.invalidateQueries("users");
      navigate("/user");
      setOpenAlert(true);
    }
  }, [actionResponse, navigate, queryClient, setOpenAlert]);

  const studentRole = data?.data?.filter(
    role => role.Name.toLowerCase() === "student"
  );
  let defaultRole = "";
  if (studentRole.length > 0) {
    defaultRole = studentRole[0].Id;
  }

  return (
    <ModalForm
      title="Create User"
      closeNavigation="/user"
      formAction="/user/add"
    >
      {errors?.message && <ErrorText text={errors.message} />}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Username"
            label="Username"
            name="Username"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Name"
            name="Name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            label="Password"
            name="Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ my: 1, px: 1 }}>
            <FormLabel id="gender-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="gender-label"
              defaultValue="male"
              name="Gender"
              required
              sx={{ flexDirection: "row" }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />

              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ marginTop: 1 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              label="Role"
              name="Role"
              defaultValue={defaultRole}
              required
            >
              {data?.data?.map(role => {
                return (
                  <MenuItem key={role.Id} value={role.Id}>
                    {role.Name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default UserCreateForm;
