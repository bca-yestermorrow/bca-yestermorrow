import React from "react";
import "../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {Paper, Card, Button, TextField, Container } from "@material-ui/core";
import { GoogleBtn } from "./GoogleBtn";


const Login = ({currentUser}) => {
  //Gives us a reference to the value of input
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory()
 
  

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setPasswordError("");

      await login(emailRef.current.value, passwordRef.current.value);
     
      history.push('/connect')
    } catch {
      setPasswordError("Your email or password is wrong");
    }
    setLoading(false);
 
  }

  return (
    <Paper elevation={2} >
      <form id="Login" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <TextField id="filled-basic" label="Email" type="email" inputRef={emailRef} variant="filled" />
        <TextField id="filled-basic" label="Password" type="password" inputRef={passwordRef} variant="filled" />
        
        <Button variant="contained" color="secondary" disable={loading} type="submit" >Log in</Button >
        <GoogleBtn />
        {passwordError && <h4>{passwordError}</h4>}

      </form>
      </Paper>
  );
};

export default Login;
