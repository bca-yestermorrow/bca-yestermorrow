import React from "react";
import "../App.css";
const Post = ({ post }) => {
  return (
    <div className="post">
      <p className="postName">
        {post.user.firstName} {post.user.lastName}
      </p>
      <p className="postBody">{post.body}</p>
      <p className="postCategory">{post.category}</p>
      <p className="postDate">{post.createdAt.slice(0, 21)}</p>
    </div>
  );
};

export default Post;
