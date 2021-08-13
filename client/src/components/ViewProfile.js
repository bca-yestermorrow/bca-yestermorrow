import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";

const ViewProfile = () => {
  const [profile, setProfile] = useState("");

  const getProfile = async () => {
    let profileRef = await db
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(profile);
          setProfile(doc.data());
        } else {
          console.log("No doc found");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return <div></div>;
};

export default ViewProfile;
