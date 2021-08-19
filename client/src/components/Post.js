import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_9X8kPJFZA4CtJoKGtOw8Y");

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

  // Send email notification
  function sendEmail(e) {
    
  
   let comment = e.target.comment.value
    emailjs
      .send(
        "service_ao3ljro",
        "template_1g42coj",
        {
          posterName: post.user.firstName,
          commenterName:  `${firstName} ${lastName}`,
          comment: comment,
          posterEmail: post.user.email,
        },
        "user_9X8kPJFZA4CtJoKGtOw8Y"
      )
      .then(
        (result) => {
          console.log("this is result " + result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  //KEEP COMMENTS AFTER POSTING
  function handleComment(e) {
    setDocId(null);
    e.preventDefault();

    setComment(e.target.comment.value);
    sendEmail(e);
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
  //Updates post doc and adds the new comment to the comments field
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

  return (
    <div className="post">
      <div className="postNBC">
        <Link to={"/other-profile/" + post.userId} className="postName">
        {post.title} by: {post.user.firstName} {post.user.lastName}
        </Link>
        <p className="postBody">{post.body}</p>
        <img
          style={{ width: "45vw" }}
          src={post.imageUrl}
          alt="404 Not Found"
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
         <a href={`mailto:${post.user.email}`}> Email Me </a>
        </Button>
      </form>
    </div>
  );
};

export default Post;
