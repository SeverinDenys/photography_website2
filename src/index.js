import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MyWorks from "./components/myWorks/MyWorks";
import FormSign from "./components/form/FormSign";
import PhotoSessions from "./components/photoSessions/PhotoSessions";
import FormSignUp from "./components/form/FormSignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/my-work", // best practice to write
    element: <MyWorks />,
  },
  {
    path: "/photo-sessions", // best practice to write
    element: <PhotoSessions />,
  },
  {
    path: "/signIn", // best practice to write
    element: <FormSign />,
  },
  {
    path: "/signUp", // best practice to write
    element: <FormSignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
