import React from "react";
import "../App.css";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { FilterFeed } from "./FilterFeed";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Connect = () => {
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [profile, setProfile] = useState("");
  const { currentUser } = useAuth();

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

  const getProfile = async () => {
    let profileRef = await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProfile(doc.data());
          console.log(profile);
        } else {
          console.log("No doc found");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

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
            posts.map((post, index) => <Post post={post} profile={profile} key={index} />)}
        </div>
        <CreatePost profile={profile}/>
      </div>
    </div>
  );
};

export default Connect;
