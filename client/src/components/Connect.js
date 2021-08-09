import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import CreatePost from "./CreatePost";

const Connect = () => {
  const [posts, setPosts] = useState(null);
  const [postModal, setPostModal] = useState(false);

  function handleClosePostModal() {
    setPostModal(false);
  }

  useEffect(() => {
    if (!posts) {
      db.collection("posts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setPosts({
              User: doc.data().User,
              Body: doc.data().Body,
              Category: doc.data().Category,
            });
          });
        });
    }
  });

  return (
    <div>
      {postModal && <CreatePost handleClosePostModal={handleClosePostModal} />}
      <div id="connectContainer">
        <div id="filterFeed"></div>
        <div id="mainFeed">
          {!posts && <p>Welcome Yestomorrow Alumni!</p>}
          {posts && (
            <div id="posts">
              <p>{posts.User}</p>
              <p>{posts.Body}</p>
              <p>{posts.Category}</p>
            </div>
          )}
          <button
            id="postButton"
            onClick={() => {
              setPostModal(true);
            }}
          >
            MAKE A POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
