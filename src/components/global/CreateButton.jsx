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
          startIcon={<AddIcon sx={{ fontWeight: "bold" }} />}
          onClick={redirectTo}
          sx={{
            textTransform: "capitalize",
            width: { sx: 150, xs: 150 },
            p: 1,
            fontSize: "0.7rem",
            fontWeight: "bold",
          }}
        >
          New {children}
        </Button>
      </Form>
    </Box>
  );
};

export default CreateButton;
