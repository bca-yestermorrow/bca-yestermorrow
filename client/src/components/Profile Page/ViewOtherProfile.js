import React from "react";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import firebase from "firebase";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon
} from "@material-ui/core";
import yesterLogo from "../../assets/YM_Banner.jpg";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
      <div className="banner-wrapper">
        <img className="profile-banner" src={yesterLogo} alt="alt" />
      </div>
      <div className="profile-page-wrapper">
      <Link to="/connect"><Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          id="back-button2"
        >
          Back
        </Button></Link>
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
              <Card style={{ marginTop: "20px", marginBottom: "20px"}} id="profile-card2">
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

export default ViewOtherProfile;
