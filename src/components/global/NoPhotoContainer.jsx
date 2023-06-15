import { Box, Typography, useTheme } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";

const NoPhotoContainer = ({
  setIsHovered,
  text = "Drag n Drop or Click Here to Upload File",
  type = "image",
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {type === "image" ? (
        <CameraAltIcon sx={{ color: theme.palette.grey[600] }}></CameraAltIcon>
      ) : (
        <DescriptionIcon sx={{ color: "grey" }} />
      )}
      <Typography textAlign="center" color="grey">
        {text}
      </Typography>
    </Box>
  );
};

export default NoPhotoContainer;
