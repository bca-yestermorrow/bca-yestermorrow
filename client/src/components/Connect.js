import React from "react";
import "../App.css";
// import { useState, useEffect } from "react";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Post from "./Post";

const Connect = () => {
  const postsRef = db.collection("posts");
  const query = postsRef.orderBy("createdAt").limitToLast(100);
  const [posts] = useCollectionData(query, { idField: "id" });

  return (
    <div id="connectPage">
      <header id="connectHeader">
        <h1 id="connectTitle">WELCOME YESTEMORROW ALUMNI</h1>
      </header>
      <div id="connectContainer">
        <div id="filterFeed"></div>
        <div id="mainFeed">
          {!posts && <p>Welcome Yestomorrow Alumni!</p>}
          {posts &&
            posts.map((post, index) => <Post post={post} key={index} />)}
        </div>
        <CreatePost />
      </div>
    </div>
  );
};

export default Connect;
