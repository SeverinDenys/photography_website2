import React, { useState, useEffect } from "react";

import Header from "../header/Header";
import Sidebar from "./Sidebar";
import MainPhotoSessionForm from "./MainPhotoSessionForm";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../db";
import { getUserId } from "../../utils";
import { getDocs, addDoc } from "firebase/firestore";

export default function PhotoSessions() {
  const [photoSessionData, setPhotoSessionData] = useState([]);
  const [selectedPhotoSession, setSelectedPhotoSession] = useState({
    description: "",
    id: "",
    photos: [],
    title: "",
    userId: getUserId(),
    sub_title: "",
  });

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
      setPhotoSessionData(sessions);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchPhotoSessions();
  }, []);

  const onSelectPhotoSession = (photoSession) => {
    setSelectedPhotoSession(photoSession);
  };

  const onCreateNewPhotoSession = () => {
    setSelectedPhotoSession({
      description: "",
      id: "",
      photos: [],
      title: "",
      userId: getUserId(),
      sub_title: "",
    });
  };

  const createOrUpdatePhotoSession = async () => {
    console.log("selectedPhotoSession", selectedPhotoSession);
    if (selectedPhotoSession.id) {
      // update
      // to create update Logic
      // 1 update record by id.
      // 2 what returned - rewrite in the array of photoSessionData. use map
      // 3 refresh form after update
    } else {
      // create
      try {
        // Firestore will automatically create the 'userInputs' collection if it doesn't exist
        const docRef = await addDoc(
          
          collection(db, "photo_sessions"),
          selectedPhotoSession
        );
        // todo
        // get the info what i've saved in the firestore
        // take this object and push to the photoSessionList so it appers in sidebar
        // selectedPhotoSession and rewrite it to default
        console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="photoSessionsContainer">
        <Sidebar
          photoSessionData={photoSessionData}
          onSelectPhotoSession={onSelectPhotoSession}
          onCreateNewPhotoSession={onCreateNewPhotoSession}
        />
        <MainPhotoSessionForm
          selectedPhotoSession={selectedPhotoSession}
          setSelectedPhotoSession={setSelectedPhotoSession}
          createOrUpdatePhotoSession={createOrUpdatePhotoSession}
        />
      </div>
    </>
  );
}
