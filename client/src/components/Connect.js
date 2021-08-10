import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import CreatePost from "./CreatePost";

const Connect = () => {
  const [posts, setPosts] = useState([]);
  const [postUpdate, setPostUpdate] = useState(0);

  // add a listener  when Connect component is mounted
  // useEffect(() => {
  //   let postsRef = db.ref("posts");
  //   postsRef.on("value", (snapshot) => {
  //     if (snapshot.exists()) {
  //       const data = snapshot.val();
  //       console.log(data);

  //       if (!data) {
  //         setPostUpdate(postUpdate + 1);
  //       }
  //     }
  //   });
  //   db.collection("posts").where("user", "==", true).onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "added") {
  //         setPostUpdate(postUpdate + 1)
  //         console.log("post updated");
  //       }
  //     });
  //   });
  // }, []);

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
