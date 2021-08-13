import React from "react";
import "../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
//importing db "database" from firebase js file
import { db } from "../firebase";
import { TextField, Button, Paper } from "@material-ui/core";

const SignUp = ({ handleSignUpClose }) => {
  //Gives us a reference to the value of input
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const { signup } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const passwordValidation = new RegExp(/(?=.*\d)(?=.*[A-Z])(?=.*?[!@#\$&*~])/);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setPasswordError("Passwords do not match");
    }

    if (firstNameRef.current.value === "" || lastNameRef.current.value === "") {
      return setPasswordError("Please enter your first and last name");
    }

    if (!passwordValidation.test(passwordRef.current.value)) {
      return setPasswordError(
        "password must contain at least one number, at least one symbol, and be at least 6 characters long "
      );
    }

    try {
      setPasswordError("");
      await signup(emailRef.current.value, passwordRef.current.value);
      //saving user to the database
      await db.collection("users").add({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
      });
      history.push("/home");
    } catch {
      setPasswordError("Invalid Email");
    }
    setLoading(false);
  }
  return (
    <Paper elevation={2}>
      <form action="/signUp" id="Login" method="POST" onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
       
        <TextField id="filled-basic" label="First Name" type="text" inputRef={firstNameRef} variant="filled" />
        <TextField id="filled-basic" label="Last Name" type="text" inputRef={lastNameRef} variant="filled" />
        <TextField id="filled-basic" label="Email" type="Email" inputRef={emailRef} variant="filled" />
        <TextField id="filled-basic" label="Password" type="password" inputRef={passwordRef} variant="filled" />
        <TextField id="filled-basic" label="Confirm Password" type="password" inputRef={confirmPasswordRef} variant="filled" />
     
        <Button  variant="contained" color="secondary" disable={loading} type="submit">Create Account</Button >
      </form>

      {passwordError && <h4>{passwordError}</h4>}
      
      </Paper>
  );
};

export default SignUp;
