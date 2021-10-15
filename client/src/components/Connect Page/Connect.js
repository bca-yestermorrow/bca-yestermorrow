import React from "react";
import "../../App.css";
import { db } from "../../firebase";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { FilterFeed } from "./FilterFeed";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import yesterLogo from "../../assets/Banner-2000X600.png";
import fetchPosts from "../../hooks/fetchPosts";

/**
 * Name: sortPostsArray
 *
 * Helper function to sort posts, from latest to oldest.
 * @source https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
 * @param {post} arr - array of posts
 * @returns sorted by createAt property (latest first)
 */
const sortPostsArray = (arr) =>
  arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

/**
 * Name: Connect
 *
 * @returns Connect component
 */
const Connect = () => {
  const [category, setCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [profile, setProfile] = useState("");
  const { currentUser } = useAuth();
  const [currentState, setCurrentState] = useState("");
  const [sticky, setSticky] = useState("");
  const connectWrapperRef = useRef(null)
  

  const stickToTop = (evt) => {
    if (connectWrapperRef.current) {
      setSticky(connectWrapperRef.current.getBoundingClientRect().top <= 0);
    }
  };

  const mainWindow = useRef(null);

  const scrolling = (evt) => {
    console.log(evt.target + " here")
  }

  // loads & auto-updates Posts based on user filters
  useEffect(() => {
    let query = db.collection("posts");

    if (category.length > 0) {
      query = query.where("category", "array-contains-any", category);
    }

    const unSub = query.onSnapshot((querySnap) => {
      console.log(querySnap)
      console.log(querySnap.docs)
      const updatedPosts = querySnap.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));
      if (currentState !== "") {
        let filteredArr = updatedPosts.filter((post) => {
          return post.user.state === currentState;
        });

        // sort & update filtered posts
        setPosts(sortPostsArray(filteredArr));
      } else {
        // sort & update posts
        setPosts(sortPostsArray(updatedPosts));
      }
    });

    // TODO need to test this limit and re-add in
    // query = query.limitToLast(100);

    return () => unSub();
  }, [category, checked, currentState]);
  console.log(posts)
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
    console.log("This should be hit once")
    getProfile();
    window.addEventListener("scroll", stickToTop);

    return(()=>{window.removeEventListener("scroll", stickToTop)})
  }, []);

  return (
    <div className="new" ref={mainWindow} onScroll={scrolling}>
      <div  className="banner-wrapper" onScroll={scrolling}>
        <img className="connect-banner" src={yesterLogo} alt="alt" />
      </div>
      <div className="connect-wrapper" onScroll={scrolling} >
        <div elevation={5} id="connectContainer" ref={connectWrapperRef} onScroll={scrolling}>
          <FilterFeed
            setChecked={setChecked}
            checked={checked}
            setCategory={setCategory}
            category={category}
            currentState={currentState}
            setCurrentState={setCurrentState}
            sticky={sticky}
          />
          <div
            style={{ margin: "12vw" }}
          ></div>
          <div id="mainFeed" onScroll={scrolling}>
            {!posts && <p>Welcome Yestermorrow Alumni!</p>}
            {posts &&
              posts.map((post, index) => (
                <Post post={post} profile={profile} key={index} />
              ))}
          </div>
          <div onScroll={scrolling}
            style={{ margin: "12vw" }}
          ></div>
          <CreatePost profile={profile} sticky={sticky} />
        </div>
      </div>
    </div>
  );
};

export default Connect;
