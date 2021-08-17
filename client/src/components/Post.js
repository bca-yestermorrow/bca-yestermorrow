import React from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import firebase from "firebase/app"

const Post = ({ post }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState("");
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [docId, setDocId] = useState(null);
  // const [docUpdated, setDocUpdated] = useState(false);
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
  async function handleComment(e) {
    e.preventDefault();
    setComment(e.target.comment.value);
    //resets displayed comment field
    e.target.comment.value = "";
    //awaits the db to get the post that has been commented on
    await db
      .collection("posts")
      .where("userId", "==", `${currentUser.uid}`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //sets the post doc id to state
          setDocId(doc.id);
        });
      });
    console.log("before update");
    if (docId) {
      console.log("inside update")
      let docRef = await db.collection("posts").doc(docId);
      return docRef
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment) //should update comment field array and keep what is in there
        })
        .then(() => {
          console.log("update successful");
        })
        .catch(() => {
          console.log("update failed");
        });
    }
    console.log("after update");
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
        {/* {comment &&
          comment.map((comment, index) => {
            return (
              <span key={index}>
                {firstName} {lastName} : {comment}
              </span>
            );
          })} */}
        {comment && (
          <span>
            {firstName} {lastName} : {comment}
          </span>
        )}
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
      </form>
    </div>
  );
};

export default Post;

// let commentArr = [];
//sets the comment to an array of comments
// async function handleComment(e) {
//   e.preventDefault();
//   commentArr.push(e.target.comment.value);
//   e.target.comment.value = "";
//   console.log("after comment is pushed to an array");
//   await db.collection("posts")
//       .where("userId", "==", `${currentUser.uid}`)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           setDocId(doc.id);
//         });
//       });
//     console.log(
//       "after docId  has been received and set to state through user Id"
//     );
//     console.log(docId);
// }

// useEffect(() => {
//   if (docId.length > 0) {
//     let docRef = db.collection("posts").doc(docId);
//     return docRef
//       .update({
//         comments: commentArr,
//       })
//       .then(() => {
//         console.log("update successful");
//         setDocUpdated(true);
//         console.log(docUpdated);
//       })
//       .catch(() => {
//         console.log("update failed");
//       });
//   }
//   console.log("after specified post comment field has been updated");
// });

// useEffect(() => {
//   if (docUpdated === true) {
//     db.collection("posts")
//       .where("id", "==", docId)
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           console.log(doc.data());
//         });
//       });
//   }
//   console.log("after comments have been retrieved from DB");
// });
