import React from "react";
import { Typography, TextField } from "@mui/material";

export default function MyWorksImgFolders({
  photoSessionsData,
  onPhotoSessionsTitleChange,
}) {
  return (
    <div className="photoSessionsDataContainer">
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
          </div>
        ))}
    </div>
  );
}
