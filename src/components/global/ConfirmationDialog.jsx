import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { Form } from "react-router-dom";

const ConfirmationDialog = ({ children, title, open, setOpen, formAction }) => {
  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <Form action={formAction} method="post">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to continue? This action is not reversible
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button type="submit" autoFocus>
            SAVE
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default ConfirmationDialog;
