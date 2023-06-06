import React, { useState } from "react";
import { handleException } from "../../utils/helper";
import { Outlet, redirect } from "react-router-dom";
import { getRootFilesQuery } from "../../http/queries";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import SearchAppBar from "../global/SearchAppBar";
import FileList from "./FileList";
import CustomizedSnackbars from "../global/CustomizedSnackBar";
import FileViewer from "../global/FileViewer";

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

  return (
    <Box>
      <SearchAppBar
        title="Files"
        search={searchTerm}
        updateSearch={handleSearch}
        navigateToCreate="/files/add"
        showSearchButton={false}
      />
      <FileList
        files={files}
        folders={folders}
        setSelectedFile={setSelectedFile}
        setOpenFileViewer={setOpenFileViewer}
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

export default Files;
