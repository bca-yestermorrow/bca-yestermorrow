import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [usersPost, setUsersPost] = useState(null);
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

  //gets the info of the user who posted the post
  function handleCommentPull() {
    if (!comment) {
      db.collection("users")
        .where("firstName", "==", `${post.user.firstName}`)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUsersPost(doc.data());
          });
        });
    }
  }

  //KEEP COMMENTS AFTER POSTING
  function handleComment(e) {
    e.preventDefault();
    setComment(e.target.comment.value);
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
