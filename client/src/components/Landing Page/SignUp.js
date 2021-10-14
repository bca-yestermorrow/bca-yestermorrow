import React from "react";
import "../../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

const SignUp = ({ handleModalOpen }) => {
  //Gives us a reference to the value of input
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const { signup } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth()
  const passwordValidation = new RegExp(/(?=.*\d)(?=.*[A-Z])(?=.*?[!@#\$&*~])/)
  
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError(true)
      return setPasswordError("Passwords do not match");
    }

    if (firstNameRef.current.value === "" || lastNameRef.current.value === "") {
      setError(true)
      return setPasswordError("Please enter your first and last name");
    }

    if (!passwordValidation.test(passwordRef.current.value)) {
      setError(true)
      return setPasswordError(
        "Password must contain a capital letter, number, symbol, and be 6 characters long "
      );
      
    }

    try {
      setPasswordError("");
      await signup(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value);
      //saving user to the database
      handleModalOpen()
      // history.push("/connect");
    } catch {
      setPasswordError("Invalid Email");
    }
    setLoading(false);
  }
  return (
    <>
      <form action="/signUp" id="Login" className="login-flex" method="POST" onSubmit={handleSubmit}>
        <h1 className="login-header">Create Your Account</h1>
        <p>Your password must contain a capital letter, number, symbol, and be 6 characters long</p>
        <TextField required  size="small" id="filled-basic" label="First Name" type="text" inputRef={firstNameRef} variant="filled" />
        <TextField required  size="small" id="filled-basic" label="Last Name" type="text" inputRef={lastNameRef} variant="filled" />
        <TextField required  size="small" id="filled-basic" label="Email" type="Email" inputRef={emailRef} variant="filled" />
        <TextField required  error={error} size="small" id="filled-basic" label="Password" type="password" inputRef={passwordRef} variant="filled" />
        <TextField required helperText={passwordError} error={error} size="small" id="filled-basic" label="Confirm Password" type="password" inputRef={confirmPasswordRef} variant="filled" />
     
        <Button  variant="contained" size="small" color="secondary" disable={loading} type="submit">Create Account</Button >
      </form>

     
      
     </>
  );
};

export default SignUp;
