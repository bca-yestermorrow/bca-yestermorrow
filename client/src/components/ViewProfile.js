import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"
import EditProfile from "./EditProfile";

const ViewProfile = () => {
  const [profile, setProfile] = useState("");
  const [modal, setModal] = useState("")
  const { currentUser } = useAuth()
  const useStyles = makeStyles({
    large: {
      width: "200px",
      height: "200px",
      fontSize: "100px"
    },
    small: {
      width: "50px",
      height: "50px",
      fontSize: "25px"
    },
    green: {
      backgroundColor: "#59833b"
    }
  })

  const classes = useStyles()

  const handleModalOpen = () => {
    setModal(true)
  }

  const handleModalClosed = () => {
    setModal("")
    getProfile()
  }

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
    getProfile()
  }, [])
  return (
  <div>
    <div>
      {modal && <EditProfile handleModalClosed={handleModalClosed} />}
    </div>
    {profile ? (
      <div>
       <Avatar
              src={profile.profilePic}
              alt={profile.firstName}
              className={classes.large}
              style={{
                float: "left",
              }}
            >{profile.firstName[0]}</Avatar>
      <p>{profile.firstName} {profile.lastName}</p>
      <p>{profile.bio}</p>
      <p>{profile.projects}</p>
      <p>{profile.portfolio}</p>
      <p>{profile.categories}</p>
      </div>
    ) : (
      <p></p>
    )}
    <button onClick={handleModalOpen}>Edit</button>
  </div>
  )
};

export default ViewProfile;
