import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { storage } from "../firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
// import Chip from "@material-ui/core/Chip";

const CreatePost = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [typePost, setTypePost] = useState("");
  const [catPost, setCatPost] = useState([]);

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

  //sends image to db storage
  function handleInsertImage(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
  //getting image url and setting the state of imageUrl to the image url (maybe working??)
  function handleSetImage() {
    const uploadImage = storage.ref(`images/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageUrl(url);
          });
      }
    );
  }

  async function handlePostSubmit(e) {
    e.preventDefault();

    // grab body message
    let body = e.target.body.value;

    // create tags array
    let options = catPost;

    let type = e.target.type.value;

    // reset error
    setError("");

    // add user to the posts collection
    try {
      await db.collection("posts").add({
        body: body,
        category: options,
        type: type,
        imageUrl: imageUrl,
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
    setTypePost("");
    setCatPost([]);
  }

  function handleTypeSelect(e) {
    setTypePost(e.target.value);
  }

  function handleCatSelect(e) {
    setCatPost(e.target.value);
  }

  return (
    <div id="createPost">
      <h1 id="createPostTitle">CREATE A POST</h1>
      {firstName && (
        <h3 className="createPostName">
          {firstName} {lastName}
        </h3>
      )}
      <form id="createPostForm" onSubmit={handlePostSubmit}>
        <TextField
          label="What do you want to say?"
          variant="outlined"
          multiline
          id="createPostBody"
          type="text"
          name="body"
          placeholder="Post message..."
        ></TextField>
        <h4 className="createPostSections" style={{ color: "red" }}>
          Add Then Set Image:
        </h4>
        <input type="file" onChange={handleInsertImage} />
        <Button id="setImageButton" onClick={handleSetImage}>
          Set Image
        </Button>
        <h4 className="createPostSections" style={{ color: "red" }}>
          Required:
        </h4>
        <FormControl>
          <InputLabel>Type Of Post:</InputLabel>
          <Select
            className="postSelect"
            name="type"
            input={<Input />}
            value={typePost}
            onChange={handleTypeSelect}
          >
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Seeking Advice">Seeking Advice</MenuItem>
            <MenuItem value="Work Opportunity">Work Opportunity</MenuItem>
            <MenuItem value="Project Update">Project Update</MenuItem>
          </Select>
        </FormControl>
        <h4 className="createPostSections" style={{ color: "red" }}>
          Select Category tags:
        </h4>
        <FormControl>
          <InputLabel>Category:</InputLabel>
          <Select
            className="postSelect"
            name="category"
            multiple
            value={catPost}
            onChange={handleCatSelect}
          >
            {categories &&
              categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <input
          type="submit"
          className="buttons"
          id="postButton"
          value="Create Post"
        />
      </form>
      {error && error}
    </div>
  );
};

export default CreatePost;
