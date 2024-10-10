import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../db";
import { getUserId } from "../../utils";
import { getDocs } from "firebase/firestore";

export default function Sidebar() {
  const [photoSessionData, setPhotoSessionData] = useState([]);

  console.log("photoSessionData", photoSessionData);

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

  return (
    <div className="sidebar">
      <ul>
        {photoSessionData &&
          photoSessionData.map((session, index) => (
            <li key={index}>
              <Link to={`/photoSession/${session.id}`}>
                {session.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
