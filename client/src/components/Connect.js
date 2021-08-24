import React from "react";
import "../App.css";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { FilterFeed } from "./FilterFeed";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Paper from "@material-ui/core/Paper";

const Connect = () => {
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [profile, setProfile] = useState("");
  const { currentUser } = useAuth();
  const [currentState, setCurrentState] = useState("");

  useEffect(() => {
    let query = db.collection("posts");

    if (category.length > 0) {
      query = query.where("category", "array-contains-any", category);
    }

    const unsub = query.onSnapshot((querysnap) => {
      const updatedPosts = querysnap.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));
      if (currentState !== "") {
        console.log("in if statement");
        let filterdArr = updatedPosts.filter((post) => {
          return post.user.state === currentState;
        });
        console.log(filterdArr);
        setPosts(filterdArr);
      } else {
        setPosts(updatedPosts);
      }
    });
    query = query.orderBy("createdAt").limitToLast(100);
    return () => unsub();
  }, [category, checked, currentState]);

  const getProfile = async () => {
    let profileRef = await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setProfile(doc.data());
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
      <Paper elevation={5} id="connectContainer">
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
            posts.map((post, index) => (
              <Post post={post} profile={profile} key={index} />
            ))}
        </div>
        <CreatePost profile={profile} />
      </Paper>
    </div>
  );
};

export default Connect;
