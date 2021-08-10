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

  function handlePostSubmit(e) {
    e.preventDefault();
    console.log(e.target.body.value);
    console.log(e.target.category.selectedOptions[0].value)
  }

  return (
    <div id="createPost">
      {firstName && <h3>{firstName}</h3>}
      {lastName && <h3>{lastName}</h3>}
      <form id="createPostForm" onSubmit={handlePostSubmit}>
        <textarea
          id="postBody"
          type="text"
          name="body"
          placeholder="Type your description here..."
        ></textarea>
        <select id="categoryMenu" name="category">
          <option>Categories:</option>
          <option value="Tiny Houses">Tiny Houses</option>
          <option value="Tree Houses">Tree Houses</option>
        </select>
        <input type="submit" id="postButton" value="Create Post"/>
      </form>
    </div>
  );
};

export default CreatePost;
