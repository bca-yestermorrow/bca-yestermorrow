import React from "react";
import { Chip, Card, Avatar, Checkbox, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FilterFeed = () => {
  const [category, setCategory] = useState(["General"]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("Category changed...");
    const unsub = db
      .collection("posts")
      .where("category", "array-contains-any", category)
      .onSnapshot((querysnap) => {
        const updatedPosts = querysnap.docs.map((doc) => ({
          id: doc.id,

          ...doc.data(),
        }));
        setPosts(updatedPosts);
      });
    setLoading(false);
    return () => unsub();
  }, [category, checked]);

  function onChangeHandler(e) {
    // console.log('onChangeHandler', e)

    let newArr = [];

    console.log(e.currentTarget.checked);
    if (e.currentTarget.checked === true) {
      setChecked(!checked);

      // add a filter tag
      newArr = [...category, e.currentTarget.value];
      setCategory(newArr);

      console.log(newArr);
    } else {
      setChecked(!checked);

      // remove a filter tag
      let tmpCategories = category;
      let index = tmpCategories.indexOf(e.currentTarget.value);
      if (index > -1) {
        tmpCategories.splice(index, 1);
      }
      setCategory(tmpCategories);
      // print out category
      console.log(category);
    }
  }

  return (
    <Card>
      <h2>Filter By Tags</h2>
      <Checkbox
        onChange={(e) => onChangeHandler(e)}
        value="Tiny Houses"
        label="Tiny Houses"
      ></Checkbox>
      Tiny House
      <Checkbox
        onChange={(e) => onChangeHandler(e)}
        value="Tree Houses"
        label="Tree Houses"
      ></Checkbox>
      Tree House
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.category}</li>
        ))}
      </ul>
      {categoryList.length > 0 && (
        <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={categoryList}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.title}
            </React.Fragment>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Checkboxes"
              placeholder="Favorites"
            />
          )}
        />
      )}
    </Card>
  );
};
