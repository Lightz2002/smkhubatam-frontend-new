import { Dialog } from "@mui/material";
import React from "react";

const FileViewer = ({ file, open, setOpenFileViewer }) => {
  return (
    <Dialog onClose={() => setOpenFileViewer(false)} open={open}>
      <iframe
        src={file?.Content}
        style={{ width: "600px", height: "500px" }}
        frameborder="0"
        title="image"
      ></iframe>
    </Dialog>
  );
};

export default FileViewer;
