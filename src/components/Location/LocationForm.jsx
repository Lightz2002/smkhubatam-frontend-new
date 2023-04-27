import React, { useEffect, useState } from "react";
import { handleException } from "../../utils/helper";
import {
  Box,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useActionData,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ErrorText from "../global/ErrorText";
import ModalForm from "../global/ModalForm";
import { createLocation } from "../../http/api";
import { useDropzone } from "react-dropzone";
import CustomizedSnackBar from "../global/CustomizedSnackBar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export const action =
  queryClient =>
  async ({ request }) => {
    try {
      const formData = await request.formData();
      const location = Object.fromEntries(formData);

      const response = await createLocation(location);
      queryClient.invalidateQueries("locations");
      return response;
    } catch (e) {
      handleException(e);
      return e;
    }
  };

const LocationForm = () => {
  let { locationId } = useParams();
  const data = useLoaderData();
  const [image, setImage] = useState("");
  const [openAlert, setOpenAlert] = useOutletContext();
  const [imageError, setImageError] = useState("");
  const actionResponse = useActionData();
  const theme = useTheme();
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
  const [modalData, setModalData] = useState({
    title: "Create Location",
    closeNavigation: "/location",
    formAction: "/location/add",
    method: "post",
  });

  useEffect(() => {
    if (actionResponse?.status === 200) {
      setOpenAlert(true);
    }
  }, [actionResponse]);

  useEffect(() => {
    if (data) {
      setModalData({
        title: "Edit Location",
        closeNavigation: `/location/${locationId}`,
        formAction: `/location/${locationId}`,
        method: "post",
      });

      setImage(data.data.Image);
    }
  }, [data]);

  return (
    <ModalForm
      title={modalData.title}
      closeNavigation={modalData.closeNavigation}
      formAction={modalData.formAction}
      method={modalData.method}
    >
      {actionResponse?.message && <ErrorText text={actionResponse.message} />}
      <Grid container>
        <Grid item xs={6}>
          {imageError && <ErrorText text={imageError} />}
          <Box
            sx={{
              width: 250,
              height: 250,
              backgroundColor: theme.palette.grey[50],
              color: "white",
            }}
            {...getRootProps({ className: "dropzone" })}
          >
            <Input {...getInputProps()} />
            <Input name="Image" type="hidden" value={image} />
            {image ? (
              <img
                src={image}
                alt="uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CameraAltIcon
                  sx={{ color: theme.palette.grey[600] }}
                ></CameraAltIcon>
                <Typography color="black">Upload Photo</Typography>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            autoFocus
            required
            id="Name"
            label="Name"
            name="Name"
            margin="dense"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.data?.Name}
          />

          <TextField
            id="Code"
            label="Code"
            name="Code"
            margin="dense"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            defaultValue={data?.data?.Code}
          />
        </Grid>
      </Grid>
      <CustomizedSnackBar
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackBar>
    </ModalForm>
  );
};

export default LocationForm;
