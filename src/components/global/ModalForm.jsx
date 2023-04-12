import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Form, useNavigate } from "react-router-dom";

const ModalForm = ({
  children,
  closeNavigation,
  title,
  formAction,
  method = "post",
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    navigate(closeNavigation);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <Form action={formAction} method={method} encType="multipart/form-data">
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {method === "post" ? "Save Changes" : "Edit"}
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ModalForm;
