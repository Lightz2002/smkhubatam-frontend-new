import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";

const FileList = ({ folders, files, setOpenFileViewer, setSelectedFile }) => {
  const navigate = useNavigate();

  const handleNavigateFolder = folder => {
    navigate(`/files/${folder?.Id}`);
  };

  const handleSelectFile = file => {
    setSelectedFile(file);
    setOpenFileViewer(true);
  };

  return (
    <>
      <List dense={true}>
        {folders?.map(folder => (
          <ListItem key={folder?.Id}>
            <ListItemButton onClick={() => handleNavigateFolder(folder)}>
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
            <ListItemButton onClick={() => handleSelectFile(file)}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={file?.Name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default FileList;
