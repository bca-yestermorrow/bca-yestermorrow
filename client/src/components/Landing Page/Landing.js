//importing React CSS and the yestermorrow logo
import React from "react";
import { useState } from "react";
import "../../App.css";
import yesterLogo from "../../assets/banner.svg";
import Map from "./Map";
import SignUp from "./SignUp";
import Login from "./Login";
import { Paper, Card } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CreateProfile from "./CreateProfile";

//landing page function
const Landing = () => {
  const [signUp, setSignUp] = useState(false);
  const [modal, setModal] = useState("");
  const history = useHistory();

  function handleSignUpClose() {
    setSignUp(false);
  }

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClosed = () => {
    setModal("");
    history.push("/connect");
  };

  //return holds sign up / log in containers and check this out container
  return (
    <div>
      {modal && <CreateProfile handleModalClosed={handleModalClosed} />}
      {/* background image div */}
      <div id="background"></div>
      <div id="landing">
        {/* header */}
        <header id="header">
          <embed class="yester-logo" src={yesterLogo}></embed>
        </header>
        {/* main body */}
        <div id="mainLanding">
          <Paper elevation={3} className="login">
            <SignUp
              handleSignUpClose={handleSignUpClose}
              handleModalOpen={handleModalOpen}
            />
            {/* between sign up and log in containers */}
            <h1 style={{ textAlign: "center", fontSize: "1vw" }}>Or</h1>
            {/* login form */}
            <Login />
          </Paper>
          {/* check this out container with map and other content */}
          <Card>
            <Map />
            {/* <div id="other">OTHER CONTENT</div> */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;