import { MenuItem, Select, Input } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import {db} from "../../firebase"

export const CategoryDropdown = ({categoryName, setCategoryName}) => {
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let updatedCatagories = [];
    db.collection("categories")
      .get()
      .then((querySnap) => {
        querySnap.forEach((doc) => {
          updatedCatagories.push(doc.data());
        });
        setCategories(updatedCatagories);
      });
  }, []);

  const changeHandler = (e) => {
    setCategoryName(e.target.value);
  };
  return (
    <Select
      name="category"
      value={categoryName}
      input={<Input />}
      multiple
      onChange={changeHandler}
    >
      { categories && categories.map((category, index) => (
        <MenuItem value={category.name} key={index}>
          {category.name}
        </MenuItem>
      ))}
    </Select>
  );
};
