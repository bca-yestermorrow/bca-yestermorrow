import React from "react";
import { Chip, Card, Avatar, Checkbox, TextField } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FilterFeed = ({ setChecked, setCategory, checked, category }) => {
  // const [category, setCategory] = useState(["General"]);
  // const [posts, setPosts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    let updatedCatagoreys = [];
    db.collection("categories")
      .get()
      .then((querySnap) => {
        querySnap.forEach((doc) => {
          updatedCatagoreys.push(doc.data());
        });
        setCategoryList(updatedCatagoreys);
      });
    console.log(categoryList);
  }, []);

  function onChangeHandler(e) {
    // console.log('onChangeHandler', e)
    if (category.length > 9) {
      e.currentTarget.checked = false;
      return console.log("cant be more than 10");
    }

    let newArr = [];
    console.log("in");

    console.log(e.currentTarget.value);
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
    <Card id="filterFeed">
      <h1 id="filterTitle">FILTER</h1>
      {categoryList.map((cat, index) => (
        <div index={index}>
          <Checkbox onChange={(e) => onChangeHandler(e)} value={cat.name} />{" "}
          {cat.name}
        </div>
      ))}
      {/* <ul>
        {categoryList.map((catagorey) => (
          <li key={catagorey.id}>{catagorey.name}</li>
        ))}
      </ul> */}
      {/* {categoryList.length > 0 && (
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
                value={option.name}
                onChange={(e) => onChangeHandler(e)}
              />
              {console.log(option.value)}
              {option.name}
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
      )} */}
    </Card>
  );
};
