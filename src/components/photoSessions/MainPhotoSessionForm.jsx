import React from "react";
import { Typography, TextField, Button } from "@mui/material";

export default function MainPhotoSessionForm() {
  const [photoSessionsData, setPhotoSessionsData] = React.useState({
    title: "",
    description: "",
    photos: [],
  });
  const [savedPhotoSessionsData, setSavedPhotoSessionsData] =
    React.useState({});

  const onSavePhotoSessionData = () => {
    // need to get the values from inputs and rewrite the state of photoSessionData

    setSavedPhotoSessionsData({
      ...photoSessionsData,
    });
    setPhotoSessionsData({
      title: "",
      description: "",
      photos: [],
    });
  };

  return (
    <div className="mainPhotoSessionForm">
      <h1>MainPhotoSessionForm</h1>{" "}
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
          value={photoSessionsData.title || ""}
          onChange={(e) =>
            setPhotoSessionsData({
              ...photoSessionsData,
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
          value={photoSessionsData.description || ""}
          onChange={(e) =>
            setPhotoSessionsData({
              ...photoSessionsData,
              description: e.target.value,
            })
          }
          size="small"
          type="text"
          style={{ width: "50%" }}
        />
        <div>
          <Button
            onClick={onSavePhotoSessionData}
            sx={{ marginTop: "2rem", marginBottom: "2rem" }} //
            variant="contained"
            color="primary"
          >
            create / Save
          </Button>
        </div>
        {savedPhotoSessionsData && (
          <div>
            <p>{savedPhotoSessionsData.title}</p>
            <p>{savedPhotoSessionsData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
