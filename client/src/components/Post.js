import React from "react";
import "../App.css";
const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="postNBC">
        <p className="postName">
          {post.user.firstName} {post.user.lastName}
        </p>
        <p className="postBody">{post.body}</p>
        <p className="postType">Type of post: {post.type}</p>
        <p className="postCategory">Category Tags: {post.category}</p>
      </div>
      <p className="postDate">{post.createdAt.slice(0, 21)}</p>
    </div>
  );
};

export default Post;
