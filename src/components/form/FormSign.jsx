import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function FormSign() {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");

  const userEmail = emailSignIn.toLowerCase();

  const onLogin = async () => {
    const auth = getAuth();

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailSignIn,
        passwordSignIn
      );
      const user = userCredential.user;
      console.log("Authenticated User email:", user.email);
      console.log("Authenticated User subdomain:", user.subdomain);

      // check if user document exists in firestore
      const userDocRef = doc(db, "users", userEmail); // Reference to the user's document
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("userData", userData);
      } else {
        console.error(
          `User document for ${emailSignIn} does not exist`
        );
      }
    } catch (error) {
      console.error("Error signing in: ", error);
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
        <Typography variant="h4">SIGN IN</Typography>

        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={emailSignIn}
          onChange={(e) => setEmailSignIn(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={passwordSignIn}
          onChange={(e) => setPasswordSignIn(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={onLogin}
          sx={{ mt: 2 }}
        >
          LOGIN
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/signUp" style={{ textDecoration: "none" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
