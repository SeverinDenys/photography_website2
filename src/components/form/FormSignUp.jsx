import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import React, { useState } from "react";

export default function MainPhotoSessionForm() {
  const onLogin = () => {
    window.location.href = "http://denys.localhost:3000";
  };

  const [emailSignUp, setEmailSignUp] = useState("");
  const [UserNameSignUp, setUserNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [repeatedPasswordSignUp, setRepeatedPasswordSignUp] =
    useState("");

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4">SIGN UP</Typography>

        <TextField
          label="Email"
          margin="normal"
          fullWidth
          value={emailSignUp}
          onChange={(e) => setEmailSignUp(e.target.value)}
        />
        <TextField
          label="UserName"
          margin="normal"
          fullWidth
          value={UserNameSignUp}
          onChange={(e) => setUserNameSignUp(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          margin="normal"
          fullWidth
          value={passwordSignUp}
          onChange={(e) => setRepeatedPasswordSignUp(e.target.value)}
        />

        <TextField
          label="Repeat Password"
          type="password"
          margin="normal"
          fullWidth
          value={repeatedPasswordSignUp}
          onChange={(e) => setPasswordSignUp(e.target.value)}
        />

        <div className="buttons-container">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onLogin}
            sx={{ mt: 2 }}
          >
            SIGN UP
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onLogin}
            sx={{ mt: 2 }}
          >
            SIGN UP WITH GOOGLE
          </Button>
        </div>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/signIn" style={{ textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
