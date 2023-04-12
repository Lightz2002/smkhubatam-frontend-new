import { Typography, useTheme } from "@mui/material";
import React from "react";

const ErrorText = ({ text }) => {
  const theme = useTheme();
  return (
    <Typography
      variant="body2"
      sx={{
        color: theme.palette.error.light,
        mt: 2,
      }}
    >
      {text}
    </Typography>
  );
};

export default ErrorText;
