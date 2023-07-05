import React, { useEffect, useState } from "react";
import ModalForm from "../global/ModalForm";
import { handleException } from "../../utils/helper";
import {
  redirect,
  useActionData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Box, Input, Typography, useTheme } from "@mui/material";
import NoPhotoContainer from "../global/NoPhotoContainer";
import DescriptionIcon from "@mui/icons-material/Description";
import { uploadFile } from "../../http/api";
import ErrorText from "../global/ErrorText";

export const action =
  queryClient =>
  async ({ params, request }) => {
    try {
      const formData = await request.formData();
      let body = Object.fromEntries(formData);
      body = {
        ...body,
        Size: +body.Size,
      };
      console.log(body);
      let res = {};
      res = await uploadFile(body);

      return res;
    } catch (e) {
      handleException(e);
      if (e?.response?.status === 401) {
        return redirect("/login");
      }
      return e;
    }
  };

const FileForm = () => {
  const [file, setFile] = useState("");
  const [fileObj, setFileObj] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const params = useParams();
  const formAction = params?.folderId ? `/files/${params.folderId}` : "/files";
  const navigate = useNavigate();

  const [fileError, setFileError] = useState("");
  const actionResponse = useActionData();
  const [setOpenAlert] = useOutletContext();

  useEffect(() => {
    if (actionResponse?.status === 201 || actionResponse?.status === 200) {
      setOpenAlert(true);
      return params?.folderId
        ? navigate(`/files/${params.folderId}`)
        : navigate("/files");
    }
  }, [actionResponse, navigate, params.folderId, setOpenAlert]);

  const { getRootProps, getInputProps } = useDropzone({
    maxSize: 500000,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        const reader = new FileReader();
        console.log(acceptedFiles[0]);
        setFileObj(acceptedFiles[0]);
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = () => {
          setFile(reader.result);
        };
      }
      if (rejectedFiles.length > 0) {
        setFileError("File cannot be larger than 500kb");
      } else {
        setFileError("");
      }
    },
  });

  return (
    <ModalForm
      closeNavigation={formAction}
      title="Upload Files"
      formAction={formAction + "/add"}
      method="post"
    >
      {actionResponse?.message && <ErrorText text={actionResponse.message} />}
      {fileError && <ErrorText text={fileError} />}
      <Box
        sx={{
          width: 250,
          height: 250,
          backgroundColor: theme.palette.grey[50],
          color: "white",
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <Input {...getInputProps()} />
        <Input name="Content" type="hidden" value={file} />
        <Input name="Size" type="hidden" value={fileObj?.size} />
        <Input name="Name" type="hidden" value={fileObj?.name} />
        <Input
          name="FileType"
          type="hidden"
          value={fileObj?.name?.substr(fileObj?.name?.lastIndexOf(".") + 1)}
        />
        <Input name="FolderId" type="hidden" value={params?.folderId} />
        {file ? (
          isHovered ? (
            <NoPhotoContainer
              setIsHovered={setIsHovered}
              type="file"
              file={fileObj}
            />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DescriptionIcon sx={{ color: "grey" }} />
              <Typography color="grey">{fileObj?.name}</Typography>
            </Box>
          )
        ) : (
          <NoPhotoContainer
            setIsHovered={setIsHovered}
            type="file"
            file={fileObj}
          />
        )}
      </Box>
    </ModalForm>
  );
};

export default FileForm;
