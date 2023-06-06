import { Box, Typography, useTheme } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React from "react";

const NoPhotoContainer = ({ backgroundColor, setIsHovered }) => {
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
      <CameraAltIcon sx={{ color: theme.palette.grey[600] }}></CameraAltIcon>
      <Typography color="black">Upload Photo</Typography>
    </Box>
  );
};

export default NoPhotoContainer;
