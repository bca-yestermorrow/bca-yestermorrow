//importing React CSS and the yestermorrow logo
import React from "react";
import "../App.css";
import yesterLogo from "../assets/Copy of YESTER_logo_No background. Square PNG.png";
import { useState, useEffect } from "react";
//landing page function
const Landing = () => {
  const [users, setUsers] = useState(null);
  const [loginUser, setLoginUser] = useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  function handleLogin(evt) {
    evt.preventDefault()
    setLoginUser({
      email: loginEmail,
      password: loginPassword
    })
  }

  function handleEmail(evt) {
    setLoginEmail(evt.target.value)
  }

  function handlePassword(evt) {
    setLoginPassword(evt.target.value)
  }

  console.log(loginUser)

  useEffect(() => {
    if (!users) {
      fetch("/userCollection")
        .then((res) => res.json())
        .then((col) => {
          console.log(col)
          setUsers(col);
        });
    }
  });


  //check user entered login info against database to authenticate
  

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
            {/* sign up form */}
            <form id="Signup" action="/signup" method="POST">
              <h1>SIGN UP</h1>
              <input
                className="signForm"
                type="text"
                name="email"
                placeholder="Enter your email..."
              />
              <input
                className="signForm"
                type="text"
                name="password"
                placeholder="Enter a password..."
              />
              <input
                className="signForm"
                type="text"
                name="confirmPassword"
                placeholder="Enter your password again..."
              />
              <input className="signForm" type="submit" value="Sign Up" />
            </form>
            {/* between sign up and log in containers */}
            <h1 id="or">OR</h1>
            {/* login form */}
            <form id="Login" onSubmit={handleLogin}>
              <h1>Log In</h1>
              <input
                className="loginForm"
                type="text"
                name="email"
                placeholder="Enter your email..."
                value={loginEmail}
                onChange={handleEmail}
              />
              <input
                className="loginForm"
                type="text"
                name="password"
                placeholder="Enter your password..."
                value={loginPassword}
                onChange={handlePassword}
              />
              <input className="loginForm" type="submit" value="Login" />
            </form>
          </div>
          {/* check this out container with map and other content */}
          <div id="checkItOut">
            <h1 id="checkTitle">CHECK THIS OUT!</h1>
            <div id="map">
              ACTUAL MAP
              <div id="other">OTHER CONTENT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
