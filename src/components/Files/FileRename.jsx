import React from "react";
import ModalForm from "../global/ModalForm";
import { Form, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";

const FileRename = ({ open, item, setOpen, name }) => {
  const params = useParams();
  const formAction = params?.folderId ? `/files/${params?.folderId}` : "/files";

  const handleClose = () => {
    setOpen(false);
  };

  return open ? (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ pb: 1, mb: 1 }}>Rename {name}</DialogTitle>
      <Form action={formAction} method="post">
        <DialogContent sx={{ pt: 0, m: 0 }}>
          <TextField
            margin="dense"
            id="Name"
            label="Name"
            name="Name"
            fullWidth
            variant="outlined"
            defaultValue={item?.Name}
            multiline
          />
          <Input type="hidden" name="Id" value={item?.Id} />
          <Input type="hidden" name="name" value={name} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            type="submit"
            name="intent"
            value={`rename ${name}`}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  ) : (
    <></>
  );
};

export default FileRename;
