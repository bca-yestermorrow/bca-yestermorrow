import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import CreatePost from "./CreatePost";

const Connect = () => {
  const [posts, setPosts] = useState([]);
  const [postUpdate, setPostUpdate] = useState(0);

  // useEffect(() => {
  //   db.collection("posts").onSnapshot(() => {
  //     console.log("new post");
  //     setPostUpdate(postUpdate + 1);
  //   });
  // });

  useEffect(() => {
    if (posts.length === 0) {
      db.collection("posts")
        .get()
        .then((querySnapshot) => {
          let postArr = [];
          querySnapshot.forEach((doc) => {
            postArr.push({
              user: doc.data().user,
              body: doc.data().body,
              category: doc.data().category,
            });
          });
          setPosts(postArr);
        });
    }
  }, [posts.length, postUpdate]);

  return (
    <div id="connectPage">
      <div id="connectContainer">
        <div id="filterFeed"></div>
        <div id="mainFeed">
          {posts.length === 0 && <p>Welcome Yestomorrow Alumni!</p>}
          {posts.length > 0 &&
            posts.map((post, index) => (
              <div className="post" key={index}>
                <p>
                  {post.user.firstName} {post.user.lastName}
                </p>
                <p>{post.body}</p>
                <p>{post.category}</p>
              </div>
            ))}
        </div>
        <CreatePost />
      </div>
    </div>
  );
};

export default Connect;
