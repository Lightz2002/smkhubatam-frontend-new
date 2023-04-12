import React from "react";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DefaultImage from "../../assets/no-photo.jpg";

const LocationCard = ({ location }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/location/${location.Id}`);
  }

  return (
    <Grid item xs={6} md={2}>
      <Card
        sx={{
          maxWidth: 345,
          "&:hover": {
            elevation: 30,
          },
        }}
        onClick={handleClick}
      >
        <CardActionArea>
          <CardMedia
            sx={{ height: 140 }}
            image={location.Image ?? DefaultImage}
            title={location.Name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {location.Name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default LocationCard;
