import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Menu,
  MenuItem,
  Input,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useNavigate } from "react-router-dom";
import FileRename from "./FileRename";
import MenuPopup from "../global/MenuPopup";
import ConfirmationDialog from "../global/ConfirmationDialog";

const FileList = ({
  folders,
  files,
  setOpenFileViewer,
  setFile,
  openRenameFolderForm,
  setOpenRenameFolderForm,
  openRenameFileForm,
  setOpenRenameFileForm,
  deleteFormAction,
  openConfirmationDialog,
  setOpenConfirmationDialog,
}) => {
  const navigate = useNavigate();
  const [folderContextMenu, setFolderContextMenu] = React.useState(null);
  const [fileContextMenu, setFileContextMenu] = React.useState(null);
  const [selectedFolder, setSelectedFolder] = React.useState({});
  const [selectedFile, setSelectedFile] = React.useState({});

  const handleNavigateFolder = folder => {
    navigate(`/files/${folder?.Id}`);
  };

  const handleSelectFile = file => {
    setFile(file);
    setOpenFileViewer(true);
  };

  const folderMenus = [
    {
      name: "Rename",
      icon: <DriveFileRenameOutlineIcon />,
      label: "Rename",
    },
  ];

  const fileMenus = [
    {
      name: "Rename",
      icon: <DriveFileRenameOutlineIcon />,
      label: "Rename",
    },
    {
      name: "Delete",
      icon: <DeleteIcon />,
      label: "Delete",
    },
  ];

  const handleFolderRightClick = (event, folder) => {
    event.preventDefault();
    setSelectedFolder(folder);
    setFolderContextMenu(
      folderContextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleCloseFolderMenus = () => {
    setFolderContextMenu(null);
  };

  const handleFileRightClick = (event, file) => {
    event.preventDefault();
    setSelectedFile(file);
    setFileContextMenu(
      fileContextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleCloseFileMenus = () => {
    setFileContextMenu(null);
  };

  const handleSelectedMenu = (menu, name) => {
    switch (menu?.name?.toLowerCase()) {
      case "rename":
        if (name === "folder") {
          setOpenRenameFileForm(true);
          setFileContextMenu(null);
        } else {
          setOpenRenameFileForm(true);
          setFileContextMenu(null);
        }
        break;
      case "delete":
        setOpenConfirmationDialog(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <List dense={true}>
        {folders?.map(folder => (
          <ListItem key={folder?.Id}>
            <ListItemButton
              onClick={() => handleNavigateFolder(folder)}
              onContextMenu={e => handleFolderRightClick(e, folder)}
            >
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={folder?.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense={true}>
        {files?.map(file => (
          <ListItem key={file?.Id}>
            <ListItemButton
              onClick={() => handleSelectFile(file)}
              onContextMenu={e => handleFileRightClick(e, file)}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={file?.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <MenuPopup
        menus={folderMenus}
        contextMenu={folderContextMenu}
        setContextMenu={setFolderContextMenu}
        handleSelectedMenu={handleSelectedMenu}
        name="folder"
      />

      <MenuPopup
        menus={fileMenus}
        contextMenu={fileContextMenu}
        setContextMenu={setFileContextMenu}
        handleSelectedMenu={handleSelectedMenu}
        name="file"
      />

      <FileRename
        open={openRenameFolderForm}
        item={selectedFolder}
        setOpen={setOpenRenameFolderForm}
        name="folder"
      ></FileRename>

      <FileRename
        open={openRenameFileForm}
        item={selectedFile}
        setOpen={setOpenRenameFileForm}
        name="file"
      ></FileRename>
      <ConfirmationDialog
        formAction={deleteFormAction}
        title="Delete File"
        open={openConfirmationDialog}
        setOpen={setOpenConfirmationDialog}
      >
        <Input name="intent" type="hidden" value="delete file" />
        <Input name="fileId" type="hidden" value={selectedFile?.Id} />
      </ConfirmationDialog>
    </>
  );
};

export default FileList;
