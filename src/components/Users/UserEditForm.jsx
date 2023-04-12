import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
  Box,
  Avatar,
  useTheme,
  Tabs,
  Tab,
  Input,
} from "@mui/material";
import { handleException } from "../../utils/helper";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ErrorText from "../global/ErrorText";
import { updateUser } from "../../http/api";
import moment from "moment";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "@tanstack/react-query";
import ModalForm from "../global/ModalForm";

export const action =
  queryClient =>
  async ({ request, params }) => {
    const errors = {};
    try {
      const formData = await request.formData();
      let user = Object.fromEntries(formData);
      user = {
        ...user,
        YearEntered: +user.YearEntered,
        BirthDate: user.BirthDate ? user.BirthDate : null,
      };

      let response = await updateUser(params.userId, user);

      return response;
    } catch (e) {
      handleException(e);
      return errors;
    }
  };

const UserEditForm = () => {
  const [openAlert, setOpenAlert] = useOutletContext();
  const queryClient = useQueryClient();
  let { userId } = useParams();
  const {
    roles: { data: roles },
    user: { data: user },
  } = useLoaderData();
  const [image, setImage] = useState(user.Image);
  const [imageError, setImageError] = useState("");
  const actionResponse = useActionData();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabsValue, setTabsValue] = useState(0);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 500000,
    onDrop: (acceptedFiles, rejectedFiles) => {
      console.log(rejectedFiles);
      if (acceptedFiles.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = () => {
          setImage(reader.result);
        };
      }
      if (rejectedFiles.length > 0) {
        setImageError("Image file cannot be larger than 500kb");
      } else {
        setImageError("");
      }
    },
  });

  useEffect(() => {
    if (actionResponse?.status === 200) {
      queryClient.invalidateQueries("user", userId);
      console.log(1);
      navigate(`/user/${userId}`);
      setOpenAlert(true);
    }
  }, [actionResponse]);

  const handleChange = (e, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <ModalForm
      title="User Detail"
      closeNavigation={`/user/${userId}`}
      method="post"
      formAction={`/user/${userId}/edit`}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", flexDirection: "row" }}
            {...getRootProps({ className: "dropzone" })}
          >
            <Avatar
              sx={{
                bgcolor: "BLUE",
                width: 80,
                height: 80,
                fontSize: 30,
              }}
              aria-label="recipe"
              src={image}
            >
              {image ? image : user?.Name[0].toUpperCase()}
            </Avatar>
            <Box
              sx={{
                ml: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <Input {...getInputProps()} label="Change Picture" />
              <Input name="Image" type="hidden" value={image} />
              <Box
                sx={{
                  backgroundColor: theme.palette.grey[600],
                  padding: 2,
                  color: "white",

                  "&:hover": {
                    color: theme.palette.grey[600],
                    borderColor: theme.palette.grey[600],
                    backgroundColor: "white",
                    cursor: "pointer",
                  },
                }}
              >
                Change Picture
              </Box>
              <ErrorText text={imageError} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={tabsValue} onChange={handleChange}>
            <Tab label="Personal Information"></Tab>
            <Tab label="School"></Tab>
          </Tabs>
        </Grid>

        <Grid item xs={12} sx={{ display: tabsValue === 0 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="filled-read-only-input"
                label="Username"
                name="Username"
                defaultValue={user?.Username ?? ""}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-read-only-input"
                label="Name"
                name="Name"
                defaultValue={user?.Name ?? ""}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                hidden
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ my: 1, px: 1, mt: 0 }}>
                <FormLabel
                  id="gender-label"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="gender-label"
                  defaultValue={user?.Gender ?? ""}
                  name="Gender"
                  required
                  row
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />

                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="filled-read-only-input"
                label="Birth Date"
                name="BirthDate"
                defaultValue={
                  user?.BirthDate
                    ? moment(user?.BirthDate).format("YYYY-MM-DD")
                    : ""
                }
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-read-only-input"
                label="Birth Place"
                name="BirthPlace"
                defaultValue={user?.BirthPlace ?? ""}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                multiline={true}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: tabsValue === 1 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                hidden={true}
                id="filled-read-only-input"
                label="Year Entered"
                name="YearEntered"
                defaultValue={user?.YearEntered ?? ""}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                InputLabelProps={{ shrink: true }}
                type="number"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="filled-read-only-input"
                label="School Class"
                name="SchoolClass"
                defaultValue={user?.SchoolClass?.Code ?? "1"}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ marginTop: 1 }} name="Role">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  label="Role"
                  name="Role"
                  defaultValue={user?.Role?.Id ?? ""}
                  required
                >
                  {roles?.map(role => {
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
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default UserEditForm;
