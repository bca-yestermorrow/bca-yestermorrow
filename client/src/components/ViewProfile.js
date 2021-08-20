import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";
import {
  Avatar,
  Button,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Card,
} from "@material-ui/core";
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
      backgroundColor: "#E0E0E0",
      "&:hover": {
        backgroundColor: "#59833b",
        color: "#fff",
      },
      profileCard: {
        height: "200px",
      },
    },
  });

  const classes = useStyles();

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClosed = () => {
    setModal("");
    setTimeout(getProfile, 500);
    console.log("in modal close");
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
  console.log(profile.interests);
  return (
    <div className="profile-page-wrapper">
      <img id="banner" src="../main_forum_banner.jpg" alt="alt" />
      {/* <div id="banner"></div> */}
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
            {profile.location && (
              <p className="user-location">
                {profile.location.city}, {profile.location.state},{" "}
                {profile.location.country}
              </p>
            )}
            <p className="user-links">{profile.portfolio}</p>
            <div className="user-work">
              <Card>
                <div>
                  <h4>About Me</h4>
                  <p className="user-bio">{profile.bio}</p>
                </div>
              </Card>
              <Card className={classes.profileCard}>
                <div>
                  <h4>Projects</h4>

                  <p className="user-projects">{profile.projects}</p>
                </div>
              </Card>
            </div>
            <div>
              <h4>Interests</h4>
              {profile.interests ? (
                profile.interests.map((interest, index) => {
                  return (
                    <p className="user-interests" key={index}>
                      {interest}
                    </p>
                  );
                })
              ) : (
                <p></p>
              )}
            </div>
            <Button className={classes.green} onClick={handleModalOpen}>
              Edit
            </Button>
          </div>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
