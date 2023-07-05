import React, { useEffect, useState } from "react";
import { handleException } from "../../utils/helper";
import { Box, Grid, Input, TextField, useTheme } from "@mui/material";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ErrorText from "../global/ErrorText";
import ModalForm from "../global/ModalForm";
import { createLocation } from "../../http/api";
import { useDropzone } from "react-dropzone";
import CustomizedSnackBar from "../global/CustomizedSnackBar";
import { useQueryClient } from "@tanstack/react-query";
import NoPhotoContainer from "../global/NoPhotoContainer";

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
  const queryClient = useQueryClient();
  const data = useLoaderData();
  const [image, setImage] = useState("");
  const [openAlert, setOpenAlert] = useOutletContext();
  const [imageError, setImageError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const actionResponse = useActionData();
  const theme = useTheme();
  const navigate = useNavigate();
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
    if (actionResponse?.status === 200 || actionResponse?.status === 201) {
      if (actionResponse?.status === 200) {
        queryClient.invalidateQueries("location", locationId);
      } else if (actionResponse?.status === 201) {
        queryClient.invalidateQueries("locations");
        navigate(`/location`);
      }

      setOpenAlert(true);
    }
  }, [actionResponse, queryClient, navigate, locationId, setOpenAlert]);

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
  }, [data, locationId]);

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
              isHovered ? (
                <NoPhotoContainer setIsHovered={setIsHovered} />
              ) : (
                <img
                  src={image}
                  alt="uploaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                />
              )
            ) : (
              <NoPhotoContainer setIsHovered={setIsHovered} />
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
