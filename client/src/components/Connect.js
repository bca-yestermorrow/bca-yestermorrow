import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import CreatePost from "./CreatePost";

const Connect = () => {
  const [posts, setPosts] = useState(null);

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
    <div id="connectPage">
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
        </div>
        <CreatePost />
      </div>
    </div>
  );
};

export default Connect;
