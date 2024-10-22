import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function MainPhotoSessionForm() {
  const [emailSignUp, setEmailSignUp] = useState("");
  const [UserNameSignUp, setUserNameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [repeatedPasswordSignUp, setRepeatedPasswordSignUp] =
    useState("");
    const navigate = useNavigate();

  const onSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailSignUp,
        passwordSignUp
      );
      console.log(userCredential);
      localStorage.setItem(
        "user",
        JSON.stringify(userCredential.user)
      );
      navigate('/settings')
 
    } catch (error) {
      console.error("Error creating user: ", error.message);
    }
  };
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
          onChange={(e) => setPasswordSignUp(e.target.value)}
        />

        <TextField
          label="Repeat Password"
          type="password"
          margin="normal"
          fullWidth
          value={repeatedPasswordSignUp}
          onChange={(e) => setRepeatedPasswordSignUp(e.target.value)}
        />

        <div className="buttons-container">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSignUp}
            sx={{ mt: 2 }}
          >
            SIGN UP
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSignUp}
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
