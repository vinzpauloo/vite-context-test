import React, { useState, FormEvent, useRef, useEffect } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

interface LoginFormProps {
  onAuthentication: (isAuthenticated: boolean) => void;
}

const Login = ({ onAuthentication }: LoginFormProps) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const inputRef = useRef<any | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username === "testuser" && password === "testpassword") {
      alert("Authenticated");
      onAuthentication(true);
    } else {
      alert("Authentication failed");
      onAuthentication(false);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box>
          <Typography>Username:</Typography>
          <TextField
            inputRef={inputRef}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <Typography>Password:</Typography>
          <TextField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default Login;
