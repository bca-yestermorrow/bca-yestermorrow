import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { Avatar, useRadioGroup } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditProfile from "./EditProfile";

const ViewProfile = () => {
  const [profile, setProfile] = useState("");
  const [modal, setModal] = useState("");
  const { currentUser } = useAuth();
  const useStyles = makeStyles({
    large: {
      width: "200px",
      height: "200px",
      fontSize: "100px",
    },
    small: {
      width: "50px",
      height: "50px",
      fontSize: "25px",
    },
    green: {
      backgroundColor: "#59833b",
      "&:hover": {
        backgroundColor: '#3c52b2',
        color: '#fff',
    },
  }});

  const classes = useStyles();

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClosed = () => {
    setModal("");
    getProfile();
  };

  const getProfile = async () => {
    let profileRef = await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProfile(doc.data());
          console.log(profile);
        } else {
          console.log("No doc found");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
  {/* <img id="banner" src="../main_forum_banner.jpg" alt="alt" /> */}
    <div id="banner"></div>
    <div className="view-profile-page">
      <div>
        {modal && <EditProfile handleModalClosed={handleModalClosed} />}
      </div>
      
      {profile ? (
        <div className="view-profile-container">
          <Avatar
            src={profile.profilePic}
            alt={profile.firstName}
            className={classes.large}
            
          >
            {profile.firstName[0]}
          </Avatar>
          <p className="user-full-name">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="user-location">
            {profile.location.city} {profile.location.state}
            {profile.location.country}
          </p>
          <p className="user-links">{profile.portfolio}</p>
          <div className="user-work">
          <p className="user-bio">{profile.bio}</p>
          <p className="user-projects">{profile.projects}</p>
          </div>
          <p className="user-interests">{profile.categories}</p>
        </div>
      ) : (
        <div className="view-profile-container">
          <Avatar
            className={classes.large}
            
          ></Avatar>
          <p className="user-full-name">Firstname Lastname</p>
          <p className="user-location">City, State, Country</p>
          <p className="user-links">www.myportfolio.com</p>
          <br />
          <div className="user-work">
          <p className="user-bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            maximus ipsum et velit rutrum sollicitudin ac fringilla est. Aenean
            porttitor lectus sit amet metus fringilla, a iaculis turpis
            venenatis. Vivamus eget enim eu erat sagittis ullamcorper ac nec
            velit. Nunc vitae diam finibus, cursus ligula ac, scelerisque ex.
            Phasellus et.
          </p>
          <p className="user-projects">
            These are some projects I'm working on: Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Phasellus maximus ipsum et velit rutrum
            sollicitudin ac fringilla est. Aenean porttitor lectus sit amet
            metus fringilla, a iaculis turpis venenatis.
          </p>
            </div>
          <ul className="user-interests">
            <li>interest1</li>
            <li>interest2</li>
          </ul>
        </div>
      )}
      <button onClick={handleModalOpen}>Edit</button>
    </div>
    </div>
  );
};

export default ViewProfile;
