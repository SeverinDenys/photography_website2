import React from "react";

import Header from "../header/Header";
import Sidebar from "./Sidebar";
import MainPhotoSessionForm from "./MainPhotoSessionForm";

export default function PhotoSessions() {
  return (
    <>
      <Header />
      <div className="photoSessionsContainer">
        <Sidebar />
        <MainPhotoSessionForm />
      </div>
    </>
  );
}
