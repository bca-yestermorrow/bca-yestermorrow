import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import yesterLogo from "../assets/YM_Banner.jpg";
import {
  Avatar,
  Button,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Card,
  Divider,
  Icon,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
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
        backgroundColor: "#59833b",
        color: "#fff",
      },
    },
    profileCard: {
      marginTop: "10px",
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
    <div>
      <div className="banner-wrapper">
        <img className="profile-banner" src={yesterLogo} alt="alt" />
      </div>
      <div className="profile-page-wrapper">
        <Link to="/connect">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            id="back-button"
          >
            Back
          </Button>
        </Link>
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
              <Card
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  position: "relative",
                }}
                id="profile-card"
              >
                <Button
                  color="secondary"
                  variant="contained"
                  id="edit-button"
                  startIcon={<EditIcon />}
                  onClick={handleModalOpen}
                >
                  Edit
                </Button>
                <div className="user-info">
                  <h3>
                    {profile.firstName} {profile.lastName}
                  </h3>
                  {profile.location && (
                    <p className="user-location">
                      {profile.location.city}, {profile.location.state},{" "}
                      {profile.location.country}
                    </p>
                  )}
                  <p className="user-links">{profile.portfolio}</p>
                </div>
                <Divider variant="middle" />
                <div className="bio-div">
                  <div>
                    <h4>About Me</h4>
                    <p className="user-bio">{profile.bio}</p>
                  </div>
                </div>
                <Divider variant="middle" />
                <div className="user-work">
                  <div>
                    <h4>Projects</h4>

                    <p className="user-projects">{profile.projects}</p>
                  </div>
                  <Divider orientation="vertical" />
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
                </div>
              </Card>
            </div>
          ) : (
            <p>loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
