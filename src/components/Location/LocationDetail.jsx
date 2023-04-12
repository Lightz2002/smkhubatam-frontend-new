import React from "react";
import { handleException } from "../../utils/helper";
import { getLocationQuery } from "../../http/queries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ModalForm from "../global/ModalForm";
import { Grid, TextField } from "@mui/material";
import { updateLocation } from "../../http/api";
import DefaultImage from "../../assets/no-photo.jpg";

export const loader =
  queryClient =>
  async ({ params }) => {
    try {
      let query = getLocationQuery(params.locationId);
      return (
        queryClient.getQueryData(query.queryKey) ??
        queryClient.fetchQuery(query)
      );
    } catch (e) {
      handleException(e);
      return e;
    }
  };

export const action =
  queryClient =>
  async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const location = Object.fromEntries(formData);
      let response = await updateLocation(params.locationId, location);
      queryClient.invalidateQueries("location", params.locationId);
      return response;
    } catch (e) {
      handleException(e);
      return e;
    }
  };

const LocationDetail = () => {
  let { locationId } = useParams();
  const { data: location } = useQuery(getLocationQuery(locationId));

  return (
    <ModalForm
      closeNavigation="/location"
      title="View Location"
      formAction={`/location/${locationId}/edit`}
      method="get"
    >
      <Grid container>
        <Grid item xs={6}>
          <img
            src={location?.data?.Image ?? DefaultImage}
            alt={location?.data?.Name}
            width="250"
            height="250"
            style={{
              objectFit: "cover",
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="filled-read-only-input"
            label="Name"
            margin="dense"
            value={location?.data?.Name ?? ""}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
          <TextField
            id="filled-read-only-input"
            label="Code"
            margin="dense"
            value={location?.data?.Code ?? ""}
            InputProps={{
              readOnly: true,
              disableUnderline: true,
            }}
            InputLabelProps={{ shrink: true }}
            variant="standard"
          />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default LocationDetail;
