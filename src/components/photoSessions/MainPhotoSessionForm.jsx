import React from "react";
import { Typography, TextField, Button } from "@mui/material";

export default function MainPhotoSessionForm({
  selectedPhotoSession,
  setSelectedPhotoSession,
  createOrUpdatePhotoSession,
}) {
  // const onSavePhotoSessionData = async () => {
  //   // need to get the values from inputs and rewrite the state of photoSessionData

  //   setSavedPhotoSessionsData({
  //     ...photoSessionsData,
  //   });
  //   setPhotoSessionsData({
  //     title: "",
  //     description: "",
  //     photos: [],
  //     userId: getUserId(),
  //   });
  //   try {
  //     // Firestore will automatically create the 'userInputs' collection if it doesn't exist
  //     const docRef = await addDoc(
  //       collection(db, "photo_sessions"),
  //       photoSessionsData
  //     );
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

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
          <Button
            onClick={createOrUpdatePhotoSession}
            sx={{ marginTop: "2rem", marginBottom: "2rem" }} //
            variant="contained"
            color="primary"
          >
            create / Update
          </Button>
        </div>
      </div>
    </div>
  );
}
