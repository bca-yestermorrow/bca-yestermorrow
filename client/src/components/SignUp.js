import React from "react";
import "../App.css";

const SignUp = ({ handleSignUpClose }) => {

  return (
    <div id="Signup">
      <form action="/signUp" method="POST">
        <h1>CREATE YOUR ACCOUNT</h1>
        <input
          className="signForm"
          type="text"
          name="firstName"
          placeholder="Enter your first name..."
        />
        <input
          className="signForm"
          type="test"
          name="lastName"
          placeholder="Enter your last name..."
        />
        <input
          className="signForm"
          type="text"
          name="email"
          placeholder="Enter your email..."
        />
        <input
          className="signForm"
          type="password"
          name="password"
          placeholder="Enter a password..."
        />
        <input
          className="signForm"
          type="password"
          name="confirmPassword"
          placeholder="Enter your password again..."
        />
        <input className="signForm" type="submit" value="Create" />
      </form>
      <button className="signForm" onClick={handleSignUpClose}>
        Close
      </button>
    </div>
  );
};

export default SignUp;
