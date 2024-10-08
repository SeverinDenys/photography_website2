import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import {
  getDoc,
  getDocs,
  doc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { db, storage } from "../../db";
import { getUserId } from "../../utils";
import { Typography, TextField, Button } from "@mui/material";
import MyWorksImgFolders from "./MyWorksImgFolders";

export default function MyWorks() {
  const [myWorksData, setMyWorksData] = useState([]);
  const [photoSessionsData, setPhotoSessionsData] = useState([]);

  console.log("photoSessionsData", photoSessionsData);

  const fetchPhotoSessionGeneralInfo = async () => {
    try {
      const docRef = doc(db, "photo_session_general", getUserId());

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();

        setMyWorksData(data);
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  //explanation working
  const fetchPhotoSessions = async () => {
    try {
      // Get reference to the "photo_sessions" collection
      const collectionRef = collection(db, "photo_sessions");

      // Get the user's ID
      const userId = getUserId(); // Assuming getUserId() gives you the current user ID

      // Create a query to filter documents by userId
      const q = query(collectionRef, where("userId", "==", userId));

      // Fetch all documents in the "photo_sessions" collection
      const querySnapshot = await getDocs(q);

      // Process the fetched documents
      const sessions = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // explanation sessions.push(data); // Store each

        sessions.push({ id: doc.id, ...data }); //fixed the problem with ids title
      });

      // Set the retrieved data (list of sessions) to state
      setPhotoSessionsData(sessions);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchPhotoSessionGeneralInfo();
    fetchPhotoSessions();
  }, []);

  const uploadFile = (image, fieldName) => {
    const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            setPhotoSessionsData({
              ...photoSessionsData,
              [fieldName]: downloadURL,
            });
          }
        );
      }
    );
  };

  const onTitleChange = (e) => {
    setMyWorksData({ ...myWorksData, title: e.target.value });
  };

  // explanation of working
  const onPhotoSessionsTitleChange = (e, index) => {
    const updatedSessions = [...photoSessionsData];
    updatedSessions[index].title = e.target.value; // Update the title for the specific session
    setPhotoSessionsData(updatedSessions); // Update the state with the modified sessions
  };

  const onSubTitleChange = (e) => {
    setMyWorksData({ ...myWorksData, sub_title: e.target.value });
  };

  const onSaveData = async () => {
    const docRef = doc(db, "photo_session_general", getUserId());

    try {
      await updateDoc(docRef, myWorksData);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const onSaveDataMyWorks = async () => {
    const updatePromises = photoSessionsData.map(async (session) => {
      const docRef = doc(db, "photo_sessions", session.id); // Use the session's ID to reference the document
      return updateDoc(docRef, { title: session.title }); // Update the title (or any other fields you want)
    });

    try {
      await Promise.all(updatePromises); // Wait for all

      console.log("All photo sessions updated successfully!");
    } catch (error) {
      console.error("Error updating photo sessions: ", error);
    }
  };

  return (
    <div>
      <>
        <Header />
        <div className="generalInfo">
          <h1 className="generalInfoTitle">General Info</h1>
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
              value={myWorksData.title || ""}
              onChange={onTitleChange}
              size="small"
              type="text"
              style={{ width: "50%" }}
            />
            <Typography
              variant="h5"
              component="label"
              htmlFor="title-input"
              gutterBottom
              style={{ marginTop: "20px" }}
            >
              Sub_Title:{" "}
            </Typography>
            <TextField
              className="myWorksTextField"
              id="title-input"
              fullWidth
              variant="outlined"
              value={myWorksData.sub_title || ""}
              onChange={onSubTitleChange}
              size="small"
              type="text"
              style={{ width: "50%" }}
            />
            <div className="buttonMyWorks">
              <Button
                onClick={onSaveData}
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
              >
                Save gen_info
              </Button>
            </div>
          </div>
        </div>
        <MyWorksImgFolders
          myWorksData={myWorksData}
          photoSessionsData={photoSessionsData}
          onPhotoSessionsTitleChange={onPhotoSessionsTitleChange}
          onSaveDataMyWorks={onSaveDataMyWorks}
          uploadFile={uploadFile}
        />
      </>
    </div>
  );
}
