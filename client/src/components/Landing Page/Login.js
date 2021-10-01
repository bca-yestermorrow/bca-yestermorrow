import React from "react";
import "../../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button, TextField, Box } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const Login = () => {
  //Gives us a reference to the value of input
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  let theme = createTheme();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setPasswordError("");

      await login(emailRef.current.value, passwordRef.current.value);

      history.push("/connect");
    } catch {
      setPasswordError("Your email or password is wrong");
    }
    setLoading(false);
  }

  return (
    <Box>
      <form id="Login" className="login-flex" onSubmit={handleSubmit}>
        <h1 className="login-header">Log In</h1>
        <TextField
          size="small"
          id="filled-basic"
          label="Email"
          type="email"
          inputRef={emailRef}
          variant="filled"
        />
        <TextField
          size="small"
          error={loginError}
          helperText={passwordError}
          id="filled-basic"
          label="Password"
          type="password"
          inputRef={passwordRef}
          variant="filled"
        />
        <Button
          size="small"
          variant="contained"
          color="secondary"
          disable={loading}
          type="submit"
        >
          Log in
        </Button>
      </form>
    </Box>
  );
};

export default Login;
