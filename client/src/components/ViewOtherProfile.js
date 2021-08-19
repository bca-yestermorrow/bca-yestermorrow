import React from "react";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { Avatar, Button, FormControl, Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const ViewOtherProfile = ({ userUid }) => {
  const [profile, setProfile] = useState("");
  const [modal, setModal] = useState("");


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
      backgroundColor: "#E0E0E0",
      "&:hover": {
        backgroundColor: "#59833b",
        color: "#fff",
      },
    },
  });

  const classes = useStyles();

  const getProfile = async () => {
    let profileRef = await db
      .collection("users")
      .doc(userUid)
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
  console.log(profile.interests);
  return (
    <div>
      <img id="banner" src="../main_forum_banner.jpg" alt="alt" />
      {/* <div id="banner"></div> */}
      <div className="view-profile-page">

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
            {profile.location &&
            <p className="user-location">
              {profile.location.city}, {profile.location.state},{" "}
              {profile.location.country}
            </p>
            }
            <p className="user-links">{profile.portfolio}</p>
            <div className="user-work">
              <div>
                <h4>About Me</h4>
                <p className="user-bio">{profile.bio}</p>
              </div>
              <div>
                <h4>Projects</h4>
                <p className="user-projects">{profile.projects}</p>
              </div>
            </div>
            <div>
              <h4>Interests</h4>
              <FormControl component="fieldset">
                <FormGroup component="legend"></FormGroup>
              {profile.interests ? ( profile.interests.map((interest, index) => {
                return (
                  <FormControlLabel control={<Checkbox name={interest} />} className="user-interests" key={index} label={interest} />
                );
              }) ) : (
                <p></p>
              )}
              </FormControl>
            </div>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewOtherProfile;