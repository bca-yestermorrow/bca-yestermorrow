import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const CreatePost = ({ handleClosePostModal }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
      db.collection("users")
        .where("email", "==", `${currentUser.email}`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setFirstName(doc.data().firstName);
            setLastName(doc.data().lastName);
          });
        });
  }, [currentUser.email]);

  return (
    <div id="createPost">
      {firstName && <h1>{firstName}</h1>}
      {lastName && <h1>{lastName}</h1>}
      <form id="createPostForm">
        <input
          type="text"
          name="body"
          placeholder="Type your description here..."
        />
      </form>
    </div>
  );
};

export default CreatePost;
