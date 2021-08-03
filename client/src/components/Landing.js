import React from "react";
import "../App.css";

const Landing = () => {
  return (
    <div id="landing">
      <header id="header">YESTERMORROW LANDING PAGE</header>
      <div id="mainLanding">
        <div id="form">
          <form id="Signup" action="/signup" method="POST">
            SIGN UP
            <input type="text" name="email" placeholder="Enter your email..." />
            <input
              type="text"
              name="password"
              placeholder="Enter a password..."
            />
            <input
              type="text"
              name="confirmPassword"
              placeholder="Enter your password again..."
            />
            <input type="submit" value="Sign Up" />
          </form>
          <h1 id="or">OR</h1>
          <form id="Login">
            Log In
            <input type="text" name="email" placeholder="Enter your email..." />
            <input
              type="text"
              name="password"
              placeholder="Enter your password..."
            />
            <input type="submit" value="Login" />
          </form>
        </div>
        <div id="checkItOut">
          <h1 id="checkTitle">CHECK THIS OUT!</h1>
          <div id="map">
            ACTUAL MAP
            <div id="other">OTHER CONTENT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;