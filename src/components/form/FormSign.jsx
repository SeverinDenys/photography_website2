import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import React, { useState } from "react";

export default function FormSign() {
  const onLogin = () => {
    window.location.href = "http://denys.localhost:3000";
  };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
          label="Login"
          variant="outlined"
          margin="normal"
          fullWidth
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
