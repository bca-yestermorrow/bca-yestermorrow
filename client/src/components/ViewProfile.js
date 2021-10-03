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
  Card,
  Divider,
  Icon,
  IconButton,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import EditProfile from "./EditProfile";
import ProfilePicModal from "./ProfilePicModal"

const ViewProfile = () => {
  const [profile, setProfile] = useState("");
  const [modal, setModal] = useState("");
  const [isHovered, setIsHovered] = useState("");
  const [imageModal, setImageModal] = useState("")

  const { currentUser } = useAuth();

  const useStyles = makeStyles({
    large: {
      width: "200px",
      height: "200px",
      fontSize: "100px",
    },
    huge: {
      width: "300px",
      height: "300px",
      fontSize: "150px",
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
    imageIcon: {
      position: "absolute",
      margin: "0",
      zIndex: "100",
      color: "white"
    }
  });

  const classes = useStyles();

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClosed = () => {
    setModal("");
    setTimeout(getProfile, 500);
  };

  const handleImageModalClosed = () => {
    console.log("in imageclose")
    setImageModal("");
    setTimeout(getProfile, 500)
  }

  const getProfile = async () => {
    let profileRef = await db
      .collection("users")
      .doc(currentUser.uid)
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
        <img
          className="profile-banner"
          src={profile.bannerImg ? profile.bannerImg : yesterLogo}
          alt="alt"
        />
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
            {imageModal && <ProfilePicModal handleImageModalClosed={handleImageModalClosed} profile={profile} classes={classes} />}
          </div>

          {profile ? (
            <div className="view-profile-container">
              <div className="profile-pic-wrapper">
                <div
                  className={isHovered ? "profile-pic" : "profile-pic-unhovered"}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setImageModal(true)}
                >
                  {isHovered ? (<AddPhotoAlternateIcon className={classes.imageIcon} fontSize="large"></AddPhotoAlternateIcon>) : (<p></p>)}
                  <Avatar
                    src={profile.profilePic}
                    alt={profile.firstName}
                    className={classes.large}
                    style={{ zIndex: "-1" }}
                  >
                    {profile.firstName[0]}
                  </Avatar>
                </div>
              </div>
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
