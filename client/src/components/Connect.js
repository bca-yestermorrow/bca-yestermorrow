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
  const [currentState, setCurrentState] = useState('')

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
      if(currentState !== ''){
        console.log('in if statement')
        let filterdArr =updatedPosts.filter((post) =>{
         
          return post.user.state === currentState
        })
        console.log(filterdArr)
        setPosts(filterdArr)
      } else {
        setPosts(updatedPosts)
      }
      
    });
    query = query.orderBy("createdAt").limitToLast(100);
    return () => unsub();
  }, [category, checked, currentState]);

  return (
    <div id="connectPage">
      <header id="connectHeader"></header>
      <div id="connectContainer">
        <FilterFeed
          setChecked={setChecked}
          checked={checked}
          setCategory={setCategory}
          category={category}
          currentState={currentState}
          setCurrentState={setCurrentState}
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
