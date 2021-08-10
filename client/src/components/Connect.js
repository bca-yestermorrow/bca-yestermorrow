import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import { FilterFeed } from "./FilterFeed";

const Connect = () => {
  const [posts, setPosts] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (posts.length ===0) {
      
 
      db.collection("posts")
        .get()
        .then((querySnapshot) => {
          
          let postArr = [];
          querySnapshot.forEach((doc) => {
            postArr.push({
              user: doc.data().user,
              body: doc.data().body,
              category: doc.data().category,
            })
            ;
            console.log(posts)
          });
          setPosts(postArr)
        });
    }
    setLoading(false)
  });


  return (
    <div id="connectPage">
    <div id="connectContainer">
      <FilterFeed ></FilterFeed>
   <div id="mainfeed">
      {posts.map((post)=> (
        <div>
        <p>{post.category}</p>
        <p>{post.body}</p>
        </div>
      ))}
   </div>
      
    </div>
  </div>
  );
};

export default Connect;
