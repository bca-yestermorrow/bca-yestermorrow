import React from "react";
import "../App.css";
import { useState } from "react";

const SignUp = ({ handleSignUpClose }) => {
  const [error, setError] = useState();

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleCredentials(evt) {
    setError();
    if ( evt.target.value === false) {
      setError("Please fill out the entire form...");
      return;
    }
    // await fetch("http://localhost:5000/signUp", {
    //   method: "POST",
    // });
  }

  //handle credentials call back function cant proxy request & input values are set wrong
  //before if block -- setAuthor(evt.target.author.value)

  return (
    <div id="Signup">
      <form onSubmit={handleCredentials} action="/signUp" method="POST">
        <h1>CREATE YOUR ACCOUNT</h1>
        <input
          className="signForm"
          type="text"
          name="firstName"
          value={firstName}
          placeholder="Enter your first name..."
          onChange={setFirstName}
        />
        <input
          className="signForm"
          type="test"
          name="lastName"
          value={lastName}
          placeholder="Enter your last name..."
          onChange={setLastName}
        />
        <input
          className="signForm"
          type="text"
          name="email"
          value={email}
          placeholder="Enter your email..."
          onChange={setEmail}
        />
        <input
          className="signForm"
          type="password"
          name="password"
          value={password}
          placeholder="Enter a password..."
          onChange={setPassword}
        />
        <input
          className="signForm"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Enter your password again..."
          onChange={setConfirmPassword}
        />
        <input className="signForm" type="submit" value="Create" />
      </form>
      {error && <p>{error}</p>}
      <button className="signForm" onClick={handleSignUpClose}>
        Close
      </button>
    </div>
  );
};

export default SignUp;
