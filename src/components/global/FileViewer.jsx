import { Dialog, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";

const FileViewer = ({ file, open, setOpenFileViewer }) => {
  // const [viewerUrl, setViewerUrl] = useState("");
  // useEffect(() => {
  //   async function convertBase64ToBlob() {
  //     const base64Response = await fetch(file.Content);
  //     const blob = await base64Response.blob();
  //     const blobURL = URL.createObjectURL(blob);
  //     const fileExtension = `.${file?.FileType}`;
  //     window.open(`${blobURL}${fileExtension}`);
  //   }

  //   if (file?.Content) {
  //     convertBase64ToBlob();
  //   }
  // }, [file]);

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
