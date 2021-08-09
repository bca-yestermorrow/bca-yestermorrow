import React from "react";
import "../App.css";
import yesterLogo from "../assets/Copy of YESTER_logo_No background. Square PNG.png";
import { SignOut } from "./SignOut";
import SignUp from "./SignUp";


const Home = () => {

  return (
    <div id="mainHome">
      <div id="background"></div>
      <header id="homeHeader">
        <a href="https://yestermorrow.org/">
          <img id="yesterLogo" src={`${yesterLogo}`} alt="Yestermorrow Logo" />
        </a>
      </header>
      <div id="home">
        <div id="jobs">JOBS</div>
        <div id="connect">COLLAB & CONNECT</div>
      </div>
      <SignOut/>
    </div>
  );
};

export default Home;
