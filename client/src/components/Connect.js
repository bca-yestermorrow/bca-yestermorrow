import React from "react";
import "../App.css";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { FilterFeed } from "./FilterFeed";
import { useState, useEffect } from "react";

const Connect = () => {
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let query = db.collection("posts");

    console.log("Category changed...");
    if (category.length > 0) {
      query = query.where("category", "array-contains-any", category);
    }

    const unsub = query.onSnapshot((querysnap) => {
      const updatedPosts = querysnap.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));
      setPosts(updatedPosts);
    });
    query = query.orderBy("createdAt").limitToLast(100);
    return () => unsub();
  }, [category, checked]);

  return (
    <div id="connectPage">
      <header id="connectHeader"></header>
      <div id="connectContainer">
        <FilterFeed
          setChecked={setChecked}
          checked={checked}
          setCategory={setCategory}
          category={category}
        />
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
