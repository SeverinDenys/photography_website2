import React from "react";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

const InputImg = ({ uploadFile, imageUrl }) => {
  return (
    <>
      <div className="chooseFileContainer">
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          <input
            label="Image"
            accept="image/png,image/jpeg"
            type="file"
            onChange={(e) => {
              uploadFile(e.target.files[0]);
            }}
          />
        </Button>
      </div>
      {imageUrl && (
        <img className="img" src={imageUrl} alt="Uploaded" />
      )}
    </>
  );
};

export default InputImg;
