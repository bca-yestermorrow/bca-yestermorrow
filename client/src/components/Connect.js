import React from "react";
import "../App.css";
import { db } from "../firebase";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { FilterFeed } from "./FilterFeed";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Paper from "@material-ui/core/Paper";
import yesterLogo from "../assets/Banner-2000X600.png";

// helper function to sort our posts array
// source: https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
const sortPostsArray = (arr) => {
  console.log("Entering sortPostsArray....");
  console.log("===========================");
  return arr.sort((a, b) => {
    console.log("new Date(a.createdAt): ", new Date(a.createdAt));
    console.log("b.createdAt: ", b.createdAt);

    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  // return arr; // no-op test case - works
};

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

    const unSub = query.onSnapshot((querySnap) => {
      const updatedPosts = querySnap.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));
      if (currentState !== "") {
        // console.log("in if statement");
        let filterdArr = updatedPosts.filter((post) => {
          return post.user.state === currentState;
        });

        // sort & update filtered posts
        setPosts(sortPostsArray(filterdArr));
      } else {
        // sort & update posts
        setPosts(sortPostsArray(updatedPosts));
      }
    });
    // this line isn't sorting, and the limit hasn't been tested.
    // a different solutions will be used for sorting (Just before display)
    // query = query.orderBy("createdAt").limitToLast(100);
    return () => unSub();
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
    <div>
      <div className="banner-wrapper">
        <img className="connect-banner" src={yesterLogo} alt="alt" />
      </div>
      <div className="connect-wrapper">
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
            {!posts && <p>Welcome Yestermorrow Alumni!</p>}
            {posts &&
              posts.map((post, index) => (
                <Post post={post} profile={profile} key={index} />
              ))}
          </div>
          <CreatePost profile={profile} />
        </Paper>
      </div>
    </div>
  );
};

export default Connect;
