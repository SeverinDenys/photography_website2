import React, { useState, useEffect } from "react";

import Header from "../header/Header";
import Sidebar from "./Sidebar";
import MainPhotoSessionForm from "./MainPhotoSessionForm";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../db";
import { getUserId } from "../../utils";
import { getDoc, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

const defaultPhotoSession = {
  description: "",
  id: "",
  photos: [],
  title: "",
  userId: getUserId(),
  sub_title: "",
};

export default function PhotoSessions() {
  const [photoSessionData, setPhotoSessionData] = useState([]);
  const [selectedPhotoSession, setSelectedPhotoSession] = useState(
    defaultPhotoSession
  );

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
      console.log("sessions", sessions);

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
    setSelectedPhotoSession(defaultPhotoSession);
  };

  const createOrUpdatePhotoSession = async () => {
    if (selectedPhotoSession.id) {
      // todo
      // update record in the DB by id

      const photoSessionWithoutId = {
        ...selectedPhotoSession,
      };
      delete photoSessionWithoutId.id;


      await updateDoc(doc(db, "photo_sessions", selectedPhotoSession.id ), photoSessionWithoutId);
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
      console.log("updatedPhotoSessions", updatedSessions);
      setPhotoSessionData(updatedSessions);
      // 3 refresh form after update
      setSelectedPhotoSession(defaultPhotoSession);
    } else {
      // create
      const photoSessionWithoutId = {
        ...selectedPhotoSession,
      };
      delete photoSessionWithoutId.id;

      try {
        const docRef = await addDoc(
          collection(db, "photo_sessions"),
          photoSessionWithoutId
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
          {
            ...photoSessionWithoutId,
            id: docSnap.id,
          },
        ]);

        // selectedPhotoSession and rewrite it to default
        setSelectedPhotoSession(defaultPhotoSession);
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
          selectedId={selectedPhotoSession.id}
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
