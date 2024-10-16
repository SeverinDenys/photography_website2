import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import {
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase";
import React, { useState } from "react";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [subdomain, setSubdomain] = useState("");

  const onSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: user.email,
        subdomain: subdomain,
      });
      window.location.href = `http://${subdomain}.localhost:3000/`;
    } catch (e) {
      console.error("Error adding document: ", e);
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
        <Typography variant="h4">SETTINGS</Typography>

        <TextField
          label="USERNAME"
          variant="outlined"
          margin="normal"
          fullWidth
          value={user.email}
          disabled
        />

        <TextField
          label="SUBDOMAIN"
          variant="outlined"
          margin="normal"
          fullWidth
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onSave}
        >
          SAVE
        </Button>
      </Box>
    </Container>
  );
}
