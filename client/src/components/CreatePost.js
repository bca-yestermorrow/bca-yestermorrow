import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { storage } from "../firebase";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { CircularProgress } from '@material-ui/core'
// import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";
// import Chip from "@material-ui/core/Chip";

const CreatePost = ({ profile, sticky }) => {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [typePost, setTypePost] = useState("");
  const [catPost, setCatPost] = useState([]);
  const [dis, setDis] = useState(false)
  const { currentUser } = useAuth();

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
    setDis(true)
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
            setDis(false)
          });
      }
    );
  }

  let state;
  if (!profile.location) {
    state = "Vermont"
  } else if (!profile.location.state) {
    state = "Vermont"
  } else {
    state = profile.location.state
  }

  async function handlePostSubmit(e) {
    e.preventDefault();

    let title = e.target.title.value;

    if (e.target.title.value === "") {
      return setError("Please enter a title...");
    }

    // grab body message
    let body = e.target.body.value;

    // create tags array
    let options = catPost;

    let type = e.target.type.value;

    if (e.target.type.value === "") {
      return setError("Please select the type of post...");
    }

    let profilePic = profile.profilePic;

    if (image !== "" && imageUrl === "") {
      return setError("Please click add image...");
    }

    // add user to the posts collection
    try {
      // reset error
      setError("");
      if (profilePic) {
        await db.collection("posts").add({
          userId: currentUser.uid,
          title: title,
          body: body,
          comments: [],
          category: options,
          type: type,
          imageUrl: imageUrl,
          state: state,
          user: {
            email: currentUser.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            profilePic: profilePic,
            state: state,
          },
          
          createdAt: Date(),
        });
      } else {
        await db.collection("posts").add({
          userId: currentUser.uid,
          title: title,
          body: body,
          comments: [],
          category: options,
          type: type,
          imageUrl: imageUrl,
          state: state,
          user: {
            email: currentUser.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            state: state,
          },
          
          createdAt: Date(),
        });
      }
    } catch (err) {
      setError("Sorry, please try again.");
      console.log(err);
    }
    e.target.body.value = "";
    e.target.title.value = "";
    setTypePost("");
    setCatPost([]);
    setImage("");
  }

  function handleTypeSelect(e) {
    setTypePost(e.target.value);
  }

  function handleCatSelect(e) {
    setCatPost(e.target.value);
  }

  return (
    <Paper elevation={5} className={sticky ? "createPost-sticky" : "createPost"} style={{right: "0"}}>
      <h1 id="createPostTitle">CREATE A POST</h1>
      {profile.firstName && (
        <h3 className="createPostName">
          {profile.firstName} {profile.lastName}
        </h3>
      )}
      <form className="createPostForm" onSubmit={handlePostSubmit}>
        <h4 className="createPostSections">Type Here:</h4>
        <TextField
          label="TITLE"
          style={{ marginTop: "1em" }}
          variant="outlined"
          multiline
          type="text"
          name="title"
        ></TextField>
        <TextField
          label="BODY"
          style={{ marginTop: "1em" }}
          variant="outlined"
          multiline
          maxRows={4}
          id="createPostBody"
          type="text"
          name="body"
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
        disabled={dis}
          variant="contained"
          type="submit"
          color="secondary"
          className="buttons"
          id="postButton"
          value="Create Post"
        >
          { dis ? <CircularProgress style={{zIndex: "5000"}} size="25px" thickness="5" color="secondary" /> : "POST"}
        </Button>
      </form>
      {error && error}
    </Paper>
  );
};

export default CreatePost;
