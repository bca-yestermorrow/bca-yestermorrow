import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
init("user_9X8kPJFZA4CtJoKGtOw8Y");

const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [poster, setPoster] = useState(null);
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

  //gets the info of the user who created the post
  function handleCommentPull() {
    if (!comment) {
      db.collection("users")
        .where("firstName", "==", `${post.user.firstName}`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
          });
        });
    }
  }

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
    e.preventDefault();

    setComment(e.target.comment.value);
    sendEmail(e);
    e.target.comment.value = "";
  }

  return (
    <div className="post">
      <div className="postNBC">
        <p className="postName">
          {post.user.firstName} {post.user.lastName}
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
        {comment && firstName + lastName + ": " + comment}
      </div>
      <form id="commentForm" onSubmit={handleComment}>
        <TextField
          label="Want to leave a comment?"
          variant="standard"
          multiline
          id="commentBox"
          type="text"
          name="comment"
          placeholder="Leave a comment..."
        />
        <Button
          id="commentButton"
          className="buttons"
          type="submit"
          onClick={handleCommentPull}
        >
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default Post;
