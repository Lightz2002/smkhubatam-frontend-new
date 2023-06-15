import React, { useEffect, useState } from "react";
import { handleException } from "../../utils/helper";
import { Outlet, redirect, useActionData, useParams } from "react-router-dom";
import { getFolderQuery } from "../../http/queries";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, IconButton } from "@mui/material";
import SearchAppBar from "../global/SearchAppBar";
import FileList from "./FileList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
import FileViewer from "../global/FileViewer";
import CreateButton from "../global/CreateButton";

export const loader =
  queryClient =>
  async ({ params }) => {
    try {
      const folderQuery = getFolderQuery(params.folderId);
      return (
        queryClient.getQueryData(folderQuery.queryKey) ??
        (await queryClient.fetchQuery(folderQuery))
      );
    } catch (e) {
      handleException(e);
      if (e?.response?.status === 401) {
        return redirect("/login");
      }
      return e;
    }
  };

const FolderChildren = () => {
  const params = useParams();
  const { data } = useQuery(getFolderQuery(params.folderId));
  const [searchTerm, setSearchTerm] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [openRenameFolderForm, setOpenRenameFolderForm] = React.useState(false);
  const [openRenameFileForm, setOpenRenameFileForm] = React.useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState(false);

  const [openFileViewer, setOpenFileViewer] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const actionResponse = useActionData();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (actionResponse?.status === 200 || actionResponse?.status === 201) {
      queryClient.invalidateQueries("folder", params?.folderId);
      setOpenConfirmationDialog(false);
      setOpenRenameFolderForm(false);
      setOpenAlert(true);
    }
  }, [actionResponse]);

  const handleSearch = e => {
    const search = e.target.value;
    setSearchTerm(search);
  };

  return (
    <Box>
      <SearchAppBar
        title="Folder"
        search={searchTerm}
        updateSearch={handleSearch}
        navigateToCreate={`/files/${params.folderId}/addFolder`}
        showSearchButton={false}
        createButton2={
          <CreateButton navigateToCreate={`/files/${params.folderId}/add`}>
            Files
          </CreateButton>
        }
      />
      <FileList
        files={data?.data?.Files}
        folders={data?.data?.Children}
        openRenameFolderForm={openRenameFolderForm}
        setOpenRenameFolderForm={setOpenRenameFolderForm}
        openRenameFileForm={openRenameFileForm}
        setOpenRenameFileForm={setOpenRenameFileForm}
        setFile={setSelectedFile}
        setOpenFileViewer={setOpenFileViewer}
        openConfirmationDialog={openConfirmationDialog}
        setOpenConfirmationDialog={setOpenConfirmationDialog}
      />
      <Outlet context={[openAlert, setOpenAlert]} />
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

export default FolderChildren;
