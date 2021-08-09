import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const Profile = () => {
  const { currentUser } = useAuth();
  const getCurrentUser = async () => {
    let currentUserRef = await db
      .collection("users")
      .where("email", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    console.log(currentUserRef);
  };
  getCurrentUser()
  return <div></div>;
};

export default Profile;
