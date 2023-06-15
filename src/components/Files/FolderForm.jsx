import React, { useEffect } from "react";
import ModalForm from "../global/ModalForm";
import { Grid, Input, TextField } from "@mui/material";
import { handleException } from "../../utils/helper";
import {
  redirect,
  useActionData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { createFolder } from "../../http/api";
import { useQueryClient } from "@tanstack/react-query";

export const action =
  queryClient =>
  async ({ request, params }) => {
    try {
      const formData = await request.formData();
      const folder = Object.fromEntries(formData);

      const res = await createFolder(folder);
      return res;
    } catch (e) {
      handleException(e);
      if (e?.response?.status === 401) {
        return redirect("/login");
      }
      return e;
    }
  };

const FolderForm = () => {
  const actionResponse = useActionData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useOutletContext();
  const params = useParams();
  const closeUrl = params?.folderId ? `/files/${params.folderId}` : "/files";

  useEffect(() => {
    if (actionResponse?.status === 201 || actionResponse?.status === 200) {
      queryClient.invalidateQueries("files");
      if (params?.folderId) {
        navigate(`/files/${params?.folderId}`);
      } else {
        navigate(`/files`);
      }
      setOpenAlert(true);
    }
  }, [actionResponse]);

  return (
    <ModalForm
      closeNavigation={closeUrl}
      title="Create Folder"
      formAction={`${closeUrl}/addFolder`}
      method="post"
      showEditButton={true}
    >
      <Grid container>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            id="Name"
            label="Name"
            name="Name"
            fullWidth
            variant="outlined"
            multiline
          />
          <Input type="hidden" name="Parent" value={params?.folderId} />
        </Grid>
      </Grid>
    </ModalForm>
  );
};

export default FolderForm;
