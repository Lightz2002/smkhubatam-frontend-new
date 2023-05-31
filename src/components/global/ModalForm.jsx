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
  showEditButton = true,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    navigate(closeNavigation);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 1, mb: 1 }}>{title}</DialogTitle>
      <Form action={formAction} method={method} encType="multipart/form-data">
        <DialogContent sx={{ pt: 0, m: 0 }}>{children}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {showEditButton && (
            <Button variant="contained" type="submit">
              {method === "post" ? "Save Changes" : "Edit"}
            </Button>
          )}
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ModalForm;
