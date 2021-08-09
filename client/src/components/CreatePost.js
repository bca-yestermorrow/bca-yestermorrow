import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const CreatePost = ({ handleClosePostModal }) => {
  const { currentUser } = useAuth();

  return (
    <div id="createPostModal">
      <form id="createPostForm">
        <input
          type="text"
          name="body"
          placeholder="Type your description here..."
        />
      </form>
      <button id="closePostModal" onClick={handleClosePostModal}>
        Close
      </button>
    </div>
  );
};

export default CreatePost;
