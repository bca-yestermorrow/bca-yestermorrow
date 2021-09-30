import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { storage } from "../firebase";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { DeleteBtn } from "./DeleteBtn";

const EditPostModal = ({ handleEditModalClose, post }) => {
  const [categories, setCategories] = useState([]);
  const [editCatPost, setEditCatPost] = useState([]);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editType, setEditType] = useState("");
  const [newImage, setNewImage] = useState("");
  const [disabled, setDisabled] = useState(false);
  console.log(post.category);
  useEffect(() => {
    post.category.forEach((cat) => {
      editCatPost.push(cat);
    });
  }, []);

  //retrieves full list of categories
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
  //sets categories selected from list on edit form
  function handleCatSelect(e) {
    setEditCatPost(e.target.value);
  }
  //edited type of post set to state
  function handleEditType(e) {
    setEditType(e.target.value);
  }
  //sets image to state
  function handleInsertImage(e) {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  }
  //sends image to database and sets it's URL to state
  function handleEditImage(e) {
    setDisabled(true);
    e.preventDefault();
    const uploadImage = storage.ref(`images/${newImage.name}`).put(newImage);
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(newImage.name)
          .getDownloadURL()
          .then((url) => {
            setEditImageUrl(url);
            setDisabled(false);
          });
      }
    );
  }

  //edit post function
  async function handleEditSave(e) {
    e.preventDefault();
    let title = e.target.title.value;
    let body = e.target.body.value;
    let imageUrl = editImageUrl;
    let type = editType;
    let category = editCatPost;
    let editPost = await db
      .collection("posts")
      .doc(post.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (title) {
            doc.ref.update({
              title: title,
            });
          }
          if (body) {
            doc.ref.update({
              body: body,
            });
          }
          if (imageUrl) {
            doc.ref.update({
              imageUrl: imageUrl,
            });
          }
          if (type) {
            doc.ref.update({
              type: type,
            });
          }
          if (category !== []) {
            doc.ref.update({
              category: category,
            });
          }
        }
      });
    setEditCatPost([]);
    handleEditModalClose();
  }

  return (
    <div id="editModal">
      <div id="postModal">
        <CancelIcon onClick={handleEditModalClose} style={{ margin: ".5em" }} />
        <DeleteBtn post={post} handleEditModalClose={handleEditModalClose} />
        <form id="editForm" onSubmit={handleEditSave}>
          Current Title:
          <TextField
            label={post.title}
            variant="outlined"
            multiline
            type="text"
            name="title"
          />
          Current Body:
          <TextField
            label={post.body}
            variant="outlined"
            multiline
            type="text"
            name="body"
          />
          Current Image:
          {post.imageUrl ? (
            <h3>{post.imageUrl}</h3>
          ) : (
            " No Current Image On Post"
          )}
          <input type="file" onChange={handleInsertImage} />
          <button onClick={handleEditImage}>Set Image</button>
          <FormControl>
            Current Type Of Post: {post.type}
            <Select
              className="postSelect"
              name="type"
              input={<Input />}
              onChange={handleEditType}
            >
              <MenuItem value="Event">Event</MenuItem>
              <MenuItem value="Seeking Advice">Seeking Advice</MenuItem>
              <MenuItem value="Work Opportunity">Work Opportunity</MenuItem>
              <MenuItem value="Project Update">Project Update</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            Current Category/Categories: {post.category}
            <Select
              className="postSelect"
              name="category"
              value={editCatPost}
              onChange={handleCatSelect}
              multiple
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
            disabled={disabled}
            variant="contained"
            type="submit"
            color="secondary"
            value="saveEdit"
            id="saveButton"
          >
            SAVE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
