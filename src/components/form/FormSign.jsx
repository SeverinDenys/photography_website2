import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { db } from "../../firebase";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function FormSign() {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setPasswordSignIn] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

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
      console.log("Authenticated User :", user);

      const collectionRef = collection(db, "users");

      // Create a query to filter documents by userId
      const q = query(
        collectionRef,
        where("email", "==", user.email)
      );

      // Fetch all documents in the "photo_sessions" collection
      const querySnapshot = await getDocs(q);
      console.log("user", querySnapshot);

      const users = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // explanation sessions.push(data); // Store each

        users.push({ id: doc.id, ...data }); //fixed the problem with ids title
      });

      console.log("users", users);
      localStorage.setItem("users", JSON.stringify(user));
      window.location.href = `http://${users[0].subdomain}.localhost:3000/?email=${users[0].email}`;
      
    } catch (error) {
      alert("invalid login or password");
    }
  };

  useEffect(() => {
    const isLogOut = searchParams.get("logout");
    if (isLogOut === "true") {
      localStorage.clear();
    }
  }, []);

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
