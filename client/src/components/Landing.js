//importing React CSS and the yestermorrow logo
import React from "react";
import { useState } from "react";
import "../App.css";
import yesterLogo from "../assets/MAIN FORUM BANNER.jpg";
import Map from "./Map";
import SignUp from "./SignUp";
import Login from "./Login";
import { GoogleBtn } from "./GoogleBtn";
import { Container, Button, Box} from "@material-ui/core";
import { Paper, Card } from "@material-ui/core";
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
          <img class="yester-logo" src={yesterLogo}></img>
        </header>
        {/* main body */}
        <div id="mainLanding">
          <Paper  elevation={3} className="login" >
            
             <SignUp handleSignUpClose={handleSignUpClose}/>
            {/* between sign up and log in containers */}
            <h1 style={{textAlign: "center", fontSize: "1vw"}}>Or</h1>
            {/* login form */}
            <Login />
         
          </Paper>
          
          {/* check this out container with map and other content */}
          <Card >
            
          
           
              <Map />
              {/* <div id="other">OTHER CONTENT</div> */}
          
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
