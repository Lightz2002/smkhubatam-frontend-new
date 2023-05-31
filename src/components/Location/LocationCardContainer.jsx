import { Grid } from "@mui/material";
import React from "react";
import LocationCard from "./LocationCard";

const LocationCardContainer = ({ locations, search }) => {
  const filteredLocations = locations.filter(location =>
    location.Name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Grid container spacing={2} sx={{ py: 2, pl: 1, m: 0, width: "100%" }}>
      {filteredLocations.map(location => (
        <LocationCard location={location} key={location?.Id} />
      ))}
    </Grid>
  );
};

export default LocationCardContainer;
