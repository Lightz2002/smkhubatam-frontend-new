import React, { useState } from "react";
import { handleException } from "../../utils/helper";
import { Outlet, redirect, useParams } from "react-router-dom";
import { getFolderQuery } from "../../http/queries";
import { useQuery } from "@tanstack/react-query";
import { Box, IconButton } from "@mui/material";
import SearchAppBar from "../global/SearchAppBar";
import FileList from "./FileList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomizedSnackbars from "../global/CustomizedSnackBar";

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

  const handleSearch = e => {
    const search = e.target.value;
    setSearchTerm(search);
  };

  return (
    <Box>
      <SearchAppBar
        title="Files"
        search={searchTerm}
        updateSearch={handleSearch}
        navigateToCreate={`/files/${params.folderId}/add`}
        showSearchButton={false}
      />
      <FileList files={data?.data?.Files} folders={data?.data?.Children} />
      <Outlet context={[openAlert, setOpenAlert]} />
      <CustomizedSnackbars
        open={openAlert}
        setOpen={setOpenAlert}
      ></CustomizedSnackbars>
    </Box>
  );
};

export default FolderChildren;
