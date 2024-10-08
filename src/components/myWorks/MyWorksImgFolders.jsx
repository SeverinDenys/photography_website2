import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import InputImg from "../../components/inputImg";
export default function MyWorksImgFolders({
  photoSessionsData,
  onPhotoSessionsTitleChange,
  onSaveDataMyWorks,
  uploadFile,
}) {
  return (
    <div className="photoSessionsDataContainer">
      <h1 className="myWorks">My Works</h1>
      {photoSessionsData &&
        photoSessionsData.map((session, index) => (
          <div key={index} className="photoSessionDataContainer">
            <Typography
              variant="h5"
              component="label"
              htmlFor="title-input"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Photo_Sessions_Title:{" "}
            </Typography>
            <TextField
              id="title-input"
              fullWidth
              variant="outlined"
              value={session.title || ""}
              onChange={(e) => onPhotoSessionsTitleChange(e, index)}
              size="small"
              type="text"
              style={{ width: "100%", marginBottom: "30px" }}
            />

            <img
              src={session.photos[0]}
              alt={session.title}
              style={{ width: "300px", height: "auto" }} //
            />
            <InputImg
              style={{ marginBottom: "20px" }}
              uploadFile={uploadFile}
            />
          </div>
        ))}
      <div className="buttonMyWorks">
        <Button
          onClick={onSaveDataMyWorks}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Save My Works
        </Button>
      </div>
    </div>
  );
}
