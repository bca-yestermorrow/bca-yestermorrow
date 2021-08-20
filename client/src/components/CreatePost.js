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

const CreatePost = ({ profile }) => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [typePost, setTypePost] = useState("");
  const [catPost, setCatPost] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setFirstName(doc.data().firstName);
          setLastName(doc.data().lastName);
        } else {
          console.log("Doc not found...");
        }
      });
  });

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

    let title = e.target.title.value;

    // grab body message
    let body = e.target.body.value;

    // create tags array
    let options = catPost;

    let type = e.target.type.value;

    let profilePic = profile.profilePic;

    // reset error
    setError("");

    // add user to the posts collection
    try {
      await db.collection("posts").add({
        userId: currentUser.uid,
        title: title,
        body: body,
        comments: [],
        category: options,
        type: type,
        imageUrl: imageUrl,
        user: {
          email: currentUser.email,
          firstName: firstName,
          lastName: lastName,
          profilePic: profilePic,
        },
        createdAt: Date(),
      });
    } catch (err) {
      setError("Sorry, please try again.");
      console.log(err);
    }
    e.target.body.value = "";
    e.target.title.value = "";
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
        <h4 className="createPostSections">Type Here:</h4>
        <TextField
          label="TITLE"
          variant="outlined"
          multiline
          type="text"
          name="title"
        ></TextField>
        <TextField
          label="BODY"
          variant="outlined"
          multiline
          id="createPostBody"
          type="text"
          name="body"
          placeholder="Post message..."
        ></TextField>
        <h4 className="createPostSections">Upload Image:</h4>
        <input type="file" onChange={handleInsertImage} />
        <Button
          variant="contained"
          id="setImageButton"
          color="secondary"
          className="buttons"
          onClick={handleSetImage}
        >
          Add Image
        </Button>
        <h4 className="createPostSections">Type Of Post:</h4>
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
        <h4 className="createPostSections">Add Tags:</h4>
        <h5 id="typeSelectTitle">Select All That Apply</h5>
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
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          className="buttons"
          id="postButton"
          value="Create Post"
        >
          POST
        </Button>
      </form>
      {error && error}
    </div>
  );
};

export default CreatePost;
