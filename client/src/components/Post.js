import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase/app";

const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [docId, setDocId] = useState(null);
  const [docUpdated, setDocUpdated] = useState(false);
  //gets current user by email and sets first and last name states to current user first and last
  useEffect(() => {
    db.collection("users")
      .where("email", "==", `${currentUser.email}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setFirstName(doc.data().firstName);
          setLastName(doc.data().lastName);
        });
      });
  }, [currentUser.email]);

  //onsubmit the callback function gets the value of the comment and sets it to state
  function handleComment(e) {
    setDocId(null);
    e.preventDefault();
    setComment(e.target.comment.value);
    //resets displayed comment field
    e.target.comment.value = "";
    //awaits the db to get the post that has been commented on
    db.collection("posts")
      .where("body", "==", `${post.body}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //sets the post doc id to state
          setDocId(doc.id);
        });
      });
  }
  //docId state wont pro actively change or update when commenting on a new post
  useEffect(() => {
    if (docId) {
      let docRef = db.collection("posts").doc(docId);
      try {
        docRef.update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment),
        });
        console.log("update successful");
      } catch (e) {
        console.log("update failed");
      }
    }
    setDocUpdated(true);
    setDocId(null);
  }, [comment, docId, docUpdated]);

  // need to gather all comments from data base
  // display comments on their appropriate post

  return (
    <div className="post">
      <div className="postNBC">
        <p className="postName">
          {post.title} by: {post.user.firstName} {post.user.lastName}
        </p>
        <p className="postBody">{post.body}</p>
        <img
          src={post.imageUrl}
          alt={post.imageUrl}
          style={{ width: "100%" }}
        />
      </div>
      <div id="postInfo">
        <p className="postType">Type of post: {post.type}</p>
        <p className="postCategory">
          Category Tags:{" "}
          {post.category &&
            post.category.map((category, index) => {
              return <span key={index}>{category} | </span>;
            })}
        </p>
        <p className="postDate">{post.createdAt.slice(0, 21)}</p>
      </div>
      <div id="commentSection">
        {post.comments.map((comment, index) => {
          return (
            <p id="comment" key={index}>
              {firstName} {lastName} : {comment}
            </p>
          );
        })}
      </div>
      <form id="commentForm" onSubmit={handleComment}>
        <TextField
          label="Leave a comment..."
          variant="standard"
          multiline
          id="commentBox"
          type="text"
          name="comment"
        />
        <Button id="commentButton" className="buttons" type="submit">
          Post Comment
        </Button>
        {/* email button needs to be linked to posters email */}
        <Button id="emailButton" className="buttons">
          Email Me
        </Button>
      </form>
    </div>
  );
};

export default Post;
