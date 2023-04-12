import { Box, Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Form, useNavigate } from "react-router-dom";

const CreateButton = ({ children, navigateToCreate }) => {
  const navigate = useNavigate();

  function redirectTo() {
    navigate(navigateToCreate);
  }

  return (
    <Box sx={{ ml: 2 }}>
      <Form action="/users">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={redirectTo}
          sx={{ textTransform: "capitalize", width: { sx: 100, xs: 200 } }}
        >
          New {children}
        </Button>
      </Form>
    </Box>
  );
};

export default CreateButton;
