import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { addDoc, setDoc, doc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import React, { useState } from "react";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [subdomain, setSubdomain] = useState("");

  const onSave = async () => {
    try {
      await addDoc(collection(db, "users"), {
        email: user.email,
        subdomain: subdomain,
      });
      await setDoc(doc(db, "general_info", subdomain), {
        about_me_description: "about_me_description",
        about_me_sub_title: "about_me_sub_title",
        about_me_title: "about_me_title",
        author: {
          author_description1: "author_description1",
          author_description2: "author_description2",

          author_subTitle: "author_subTitle",
          author_title: "author_title",
        },
        author_img: "author_img",
        main_picture1: "main_picture1",
        main_description_title: "main_description_title",
      });

      await setDoc(doc(db, "photo_session_general", subdomain), {
        title: "lkasdfhjasfklhfds",
        sub_title: "heeeeee",
      });

      window.location.href = `http://${subdomain}.localhost:3000/?email=${user.email}`;
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
