import React, { useState, useEffect } from "react";

import Header from "../header/Header";
import Sidebar from "./Sidebar";
import MainPhotoSessionForm from "./MainPhotoSessionForm";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../db";
import { getUserId } from "../../utils";
import { getDoc, getDocs, addDoc } from "firebase/firestore";

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

  console.log("sek=lectedPhotoSession", selectedPhotoSession);

  const createOrUpdatePhotoSession = async () => {
    if (selectedPhotoSession.id) {
    
      // update
      // to create update Logic

      // 2 what returned - rewrite in the array of photoSessionData. use map
      const updatedSessions = photoSessionData.map((session) => {
        // 1 update record by id.
        if (session.id === selectedPhotoSession.id) {
          return selectedPhotoSession;
        } else {
          return session;
        }
      });
      setSelectedPhotoSession(updatedSessions);
      // 3 refresh form after update
      setSelectedPhotoSession({
        description: "",
        id: "",
        photos: [],
        title: "",
        userId: getUserId(),
        sub_title: "",
      });
    } else {
      // create
      try {
        const docRef = await addDoc(
          collection(db, "photo_sessions"),
          selectedPhotoSession
        );
        // todo
        // get the info what i've saved in the firestore
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        }

        // take this object and push to the photoSessionList so it appers in sidebar
        setPhotoSessionData([
          ...photoSessionData,
          selectedPhotoSession,
        ]);

        // selectedPhotoSession and rewrite it to default
        setSelectedPhotoSession({
          description: "",
          id: "",
          photos: [],
          title: "",
          userId: getUserId(),
          sub_title: "",
        });
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

// // 1 update record by id.
// if (session.id === selectedPhotoSession.id) {
//   return selectedPhotoSession;
// } else {
//   return session;
// }
