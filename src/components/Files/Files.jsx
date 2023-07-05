import React, { useEffect, useState } from "react";
import { handleException } from "../../utils/helper";
import { Outlet, redirect, useActionData } from "react-router-dom";
import { getRootFilesQuery } from "../../http/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/material";
import SearchAppBar from "../global/SearchAppBar";
import FileList from "./FileList";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
import FileViewer from "../global/FileViewer";
import { deleteFile, updateFileName, updateFolderName } from "../../http/api";
import CreateButton from "../global/CreateButton";

export const loader = queryClient => async params => {
  try {
    const filesQuery = getRootFilesQuery();
    const res =
      queryClient.getQueryData(filesQuery) ??
      (await queryClient.fetchQuery(filesQuery));
    return res;
  } catch (e) {
    handleException(e);
    if (e?.response?.status === 401) {
      return redirect("/login");
    }
    return e;
  }
};

export const action =
  queryClient =>
  async ({ params, request }) => {
    try {
      const formData = await request.formData();
      const body = Object.fromEntries(formData);
      let res = {};

      switch (body?.intent) {
        case "rename folder":
          res = await updateFolderName(body);
          return res;
        case "rename file":
          res = await updateFileName(body);
          return res;
        case "delete file":
          res = await deleteFile(body.fileId);
          return res;
        default:
          return res;
      }
    } catch (e) {
      handleException(e);
      if (e?.response?.status === 401) {
        return redirect("/login");
      }
      return e;
    }
  };

const Files = () => {
  const {
    data: {
      data: { folders, files },
    },
  } = useQuery(getRootFilesQuery());
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = e => {
    const search = e.target.value;
    setSearchTerm(search);
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [openFileViewer, setOpenFileViewer] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const actionResponse = useActionData();
  const queryClient = useQueryClient();
  const [openRenameFolderForm, setOpenRenameFolderForm] = React.useState(false);
  const [openRenameFileForm, setOpenRenameFileForm] = React.useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);

  useEffect(() => {
    if (actionResponse?.status === 200 || actionResponse?.status === 201) {
      queryClient.invalidateQueries("files");
      setOpenConfirmationDialog(false);
      setOpenRenameFolderForm(false);
      setOpenAlert(true);
    }
  }, [actionResponse, queryClient]);

  return (
    <Box>
      <SearchAppBar
        title="Folder"
        search={searchTerm}
        updateSearch={handleSearch}
        navigateToCreate="/files/addFolder"
        showSearchButton={false}
        createButton2={
          <CreateButton navigateToCreate="/files/add">Files</CreateButton>
        }
      />
      <FileList
        files={files}
        folders={folders}
        setFile={setSelectedFile}
        setOpenFileViewer={setOpenFileViewer}
        openRenameFolderForm={openRenameFolderForm}
        setOpenRenameFolderForm={setOpenRenameFolderForm}
        openRenameFileForm={openRenameFileForm}
        setOpenRenameFileForm={setOpenRenameFileForm}
        deleteFormAction="/files"
        openConfirmationDialog={openConfirmationDialog}
        setOpenConfirmationDialog={setOpenConfirmationDialog}
      />
      <Outlet context={[setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
      <FileViewer
        open={openFileViewer}
        setOpenFileViewer={setOpenFileViewer}
        file={selectedFile}
      ></FileViewer>
    </Box>
  );
};

export default Files;
