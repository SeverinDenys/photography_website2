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
import Settings from "./components/form/Settings";
import Footer from "./components/footer/Footer";

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
  {
    path: "/settings", // best practice to write
    element: <Settings />,
  },
  {
    path: "/footer", // best practice to write
    element: <Footer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
