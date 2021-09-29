import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import CancelIcon from "@material-ui/icons/Cancel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const EditModal = ({ handleEditModalClose, post }) => {
  const [categories, setCategories] = useState([]);
  const [catPost, setCatPost] = useState([]);

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

  function handleCatSelect(e) {
    setCatPost(e.target.value);
  }

  return (
    <div id="editModal">
      <div id="postModal">
        <CancelIcon onClick={handleEditModalClose} style={{ margin: ".5em" }} />
        Title:
        <TextField
          label={post.title}
          style={{ marginTop: "1em" }}
          variant="outlined"
          multiline
          type="text"
          name="title"
        />
        Body:
        <TextField
          label={post.body}
          style={{ marginTop: "1em" }}
          variant="outlined"
          multiline
          type="text"
          name="body"
        />
        Current Image:
        <FormControl>
          Type Of Post:
          <Select className="postSelect" name="type" input={<Input />}>
            <MenuItem value="Event">Event</MenuItem>
            <MenuItem value="Seeking Advice">Seeking Advice</MenuItem>
            <MenuItem value="Work Opportunity">Work Opportunity</MenuItem>
            <MenuItem value="Project Update">Project Update</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          Category:
          <Select className="postSelect" name="category" value={catPost}
            onChange={handleCatSelect} multiple>
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
          value="saveEdit"
        >
          SAVE
        </Button>
      </div>
    </div>
  );
};

export default EditModal;
