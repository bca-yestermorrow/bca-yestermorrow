import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

const CreatePost = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    if (categories.length === 0) {
      db.collection("categories")
        .get()
        .then((querySnapshot) => {
          let catArr = [];
          querySnapshot.forEach((cat) => {
            catArr.push(cat.data().name);
          });
          setCategories(catArr);
        });
    }
  }, [categories]);

  async function handlePostSubmit(e) {
    e.preventDefault();

    // grab body message
    let body = e.target.body.value;

    // create tags array
    let options = e.target.category.selectedOptions;
    let tags = [];
    Array.from(options).forEach((option) => tags.push(option.value));

    let type = e.target.type.value;

    // reset error
    setError("");

    // add user to the posts collection
    try {
      await db.collection("posts").add({
        body: body,
        category: tags,
        type: type,
        Image: false,
        user: {
          email: currentUser.email,
          firstName: firstName,
          lastName: lastName,
        },
        createdAt: Date(),
      });
    } catch (err) {
      setError("Sorry, please try again.");
      console.log(err);
    }
    e.target.body.value = "";
    e.target.type.value = "Type Of Post:";
    e.target.category.value = "Category:";
  }

  return (
    <div id="createPost">
      {firstName && <h3 className="createPostName">{firstName}</h3>}
      {lastName && <h3 className="createPostName">{lastName}</h3>}
      <form id="createPostForm" onSubmit={handlePostSubmit}>
        <textarea
          id="createPostBody"
          type="text"
          name="body"
          placeholder="Post message..."
        ></textarea>
        <h4 style={{ color: "red" }}>Required:</h4>
        <select className="postSelect" name="type">
          <option>Type Of Post:</option>
          <option value="Event">Event</option>
          <option value="Seeking Advice">Seeking Advice</option>
          <option value="Work Opportunity">Work Opportunity</option>
          <option value="Project Update">Project Update</option>
        </select>
        <select className="postSelect" name="category" multiple>
          <option>Category:</option>
          {categories &&
            categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
        </select>
        <input type="submit" id="postButton" value="Create Post" />
      </form>
      {error && error}
    </div>
  );
};

export default CreatePost;
