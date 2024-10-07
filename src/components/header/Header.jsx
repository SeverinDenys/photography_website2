import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const navigateToMyWorks = () => {
    navigate("/my-work");
  };

  const navigateToMainPage = () => {
    navigate("/");
  };

  const navigateToPhotoSessions = () => {
    navigate("/photo-sessions");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar className="header">
        <Button color="inherit" onClick={navigateToMainPage}>
          Main Page
        </Button>
        <Button color="inherit" onClick={navigateToMyWorks}>
          My Works
        </Button>
        <Button color="inherit" onClick={navigateToPhotoSessions}>
          Photo Sessions
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// if default - import without {}
