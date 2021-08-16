import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db } from "../firebase";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  //KEEP COMMENTS AFTER POSTING
  function handleComment(e) {
    e.preventDefault();
    setComment(e.target.comment.value);
    e.target.comment.value = "";
  }

//   function handleCommentPull() {
//     if (!comment) {
//       db.collection("posts")
//         .where("firstName", "==", `${post.user.firstName}`)
//         .get()
//         .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//             console.log(doc.data());
//           });
//         });
//     }
//   }

  //   comment.map((comment, index) => {
  //     return (
  //       <span key={index}>
  //         {post.user.firstName} {post.user.lastName}
  //         {comment}
  //       </span>
  //     );
  //   })

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
          style={{ width: "100%", objectFit: "contain" }}
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
      <div id="commentSection">{comment && comment}</div>
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
        >
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default Post;
