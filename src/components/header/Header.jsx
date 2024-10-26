import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import logOutLogo from "../../assets/log-out.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const navigate = useNavigate();
  const auth = getAuth();

  const navigateToMyWorks = () => {
    navigate("/my-work");
  };

  const navigateToMainPage = () => {
    navigate("/");
  };

  const navigateToPhotoSessions = () => {
    navigate("/photo-sessions");
  };

  const navigateToFooter = () => {
    navigate("/footer");
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        clearLocalStorage();
        window.location.href =
          "http://localhost:3000/signIn?logout=true";
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="header">
        <div className="menu-buttons">
          <Button color="inherit" onClick={navigateToMainPage}>
            Main Page
          </Button>
          <Button color="inherit" onClick={navigateToMyWorks}>
            My Works
          </Button>
          <Button color="inherit" onClick={navigateToPhotoSessions}>
            Photo Sessions
          </Button>
          <Button color="inherit" onClick={navigateToFooter}>
            FOOTER
          </Button>
        </div>
        <div className="logout-container">
          <img
            className="logout"
            src={logOutLogo}
            onClick={handleSignOut}
            alt="logout"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
