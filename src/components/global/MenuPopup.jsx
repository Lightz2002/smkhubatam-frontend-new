import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React from "react";

const MenuPopup = ({
  menus,
  contextMenu,
  setContextMenu,
  handleSelectedMenu,
  name,
}) => {
  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorReference="anchorPosition"
      anchorPosition={
        contextMenu !== null
          ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
          : undefined
      }
      open={contextMenu !== null}
      onClose={handleCloseContextMenu}
    >
      {menus.map(menu => (
        <button
          style={{
            backgroundColor: "transparent",
            border: 0,
            display: "block",
          }}
          onClick={() => handleSelectedMenu(menu, name)}
        >
          <MenuItem key={menu.name}>
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText>{menu.label}</ListItemText>
          </MenuItem>
        </button>
      ))}
    </Menu>
  );
};

export default MenuPopup;
