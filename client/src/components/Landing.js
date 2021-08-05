//importing React CSS and the yestermorrow logo
import React from "react";
import { useState } from "react";
import "../App.css";
import yesterLogo from "../assets/Copy of YESTER_logo_No background. Square PNG.png";
import Map from "./Map";
import SignUp from "./SignUp";
//landing page function
const Landing = () => {
  const [signUp, setSignUp] = useState(false);

  function handleSignUpClose() {
    setSignUp(false);
  }

  function handleSignUp() {
    setSignUp(true);
  }

  //return holds sign up / log in containers and check this out container
  return (
    <div>
      {/* background image div */}
      <div id="background"></div>
      <div id="landing">
        {/* header */}
        <header id="header">
          <a href="https://yestermorrow.org/">
            <img
              id="yesterLogo"
              src={`${yesterLogo}`}
              alt="Yestermorrow Logo"
            />
          </a>
        </header>
        {/* main body */}
        <div id="mainLanding">
          <div id="form">
            <button id="signUpButton" onClick={handleSignUp}>
              SIGN UP
            </button>
            {signUp && <SignUp handleSignUpClose={handleSignUpClose} />}
            {/* between sign up and log in containers */}
            <h1 id="or">OR</h1>
            {/* login form */}
            <form id="Login">
              <h1>Log In</h1>
              <input
                className="loginForm"
                type="text"
                name="email"
                placeholder="Enter your email..."
              />
              <input
                className="loginForm"
                type="text"
                name="password"
                placeholder="Enter your password..."
              />
              <input className="loginForm" type="submit" value="Login" />
            </form>
          </div>
          {/* check this out container with map and other content */}
          <div id="checkItOut">
            <h1 id="checkTitle">CHECK THIS OUT!</h1>
            <p id="mapDescription">MAP DESCRIPTION</p>
            <div id="map">
              <Map />
              {/* <div id="other">OTHER CONTENT</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
