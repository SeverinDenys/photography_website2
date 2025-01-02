import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import InputImg from "../../components/inputImg";

export default function MainPhotoSessionForm({
  selectedPhotoSession,
  setSelectedPhotoSession,
  createOrUpdatePhotoSession,
  uploadFile,
  deletePhotoSession,
}) {
  return (
    <div className="mainPhotoSessionForm">
      <h1>MainPhotoSessionForm</h1>
      <div className="inputsContainer">
        <Typography
          variant="h5"
          component="label"
          htmlFor="title-input"
          gutterBottom
          style={{ marginTop: "20px" }}
        >
          Title:{" "}
        </Typography>
        <TextField
          id="title-input"
          fullWidth
          variant="outlined"
          value={selectedPhotoSession.title || ""}
          onChange={(e) =>
            setSelectedPhotoSession({
              ...selectedPhotoSession,
              title: e.target.value,
            })
          }
          size="small"
          type="text"
          style={{ width: "50%" }}
        />
        <Typography
          variant="h5"
          component="label"
          htmlFor="description-input"
          gutterBottom
          style={{ marginTop: "20px" }}
        >
          Description:{" "}
        </Typography>
        <TextField
          id="description-input"
          fullWidth
          variant="outlined"
          value={selectedPhotoSession.description || ""}
          onChange={(e) =>
            setSelectedPhotoSession({
              ...selectedPhotoSession,
              description: e.target.value,
            })
          }
          size="small"
          type="text"
          style={{ width: "50%" }}
        />
        <div>
          <div className="imgData-container">
            {selectedPhotoSession.photos.map((photoUrl, index) => (
              <div className="img-container" key={index}>
                <img
                  className="img"
                  src={photoUrl}
                  alt={"uploaded"}
                />
                <div className="btn-container">
                  <button
                    onClick={() => deletePhotoSession(photoUrl)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="upload-img">
            <InputImg
              uploadFile={uploadFile}
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div className="mainPhotoSessionBtn">
            <Button
              onClick={createOrUpdatePhotoSession}
              sx={{
                marginTop: "2rem",
                marginBottom: "2rem",
              }}
              variant="contained"
              color="primary"
            >
              {selectedPhotoSession.id ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
