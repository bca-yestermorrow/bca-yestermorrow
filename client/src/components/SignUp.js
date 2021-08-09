import React from "react";
import "../App.css";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";


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
  console.log(currentUser)
  const {currentUser} = useAuth()
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setPasswordError("Passwords do not match");
    }

    try {
      setPasswordError("");
      
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/home')
    } catch {
      setPasswordError("error message");
    }
    setLoading(false);
  }
  return (
    <div id="Signup">
      <form action="/signUp" method="POST" onSubmit={handleSubmit}>
        <h1>CREATE YOUR ACCOUNT</h1>
        <input
          className="signForm"
          type="text"
          name="firstName"
          ref={firstNameRef}
          placeholder="Enter your first name..."
        />
        <input
          className="signForm"
          type="test"
          name="lastName"
          ref={lastNameRef}
          placeholder="Enter your last name..."
        />
        <input
          className="signForm"
          type="text"
          name="email"
          ref={emailRef}
          placeholder="Enter your email..."
        />
        <input
          className="signForm"
          type="password"
          name="password"
          ref={passwordRef}
          placeholder="Enter a password..."
        />
        <input
          className="signForm"
          type="password"
          name="confirmPassword"
          ref={confirmPasswordRef}
          placeholder="Enter your password again..."
        />
     <input
        className="signForm"
        disabled={loading}
        type="submit"
        value="Create"
      />
      </form>
      {passwordError && <h4>{passwordError}</h4>}
      <button className="signForm" onClick={handleSignUpClose}>
        Close
      </button>
    </div>
  );
};

export default SignUp;
