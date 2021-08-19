import React from "react";
import { Chip, Card, Avatar, Checkbox, TextField } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";
import {Autocomplete} from '@material-ui/lab'

import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

<<<<<<< HEAD
export const FilterFeed = ({setChecked, setCategory, setCurrentState, currentState, checked, category}) => {
=======
export const FilterFeed = ({ setChecked, setCategory, checked, category }) => {
>>>>>>> 8941476a84f29b0125c604d4fb9f60896532c435
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

  const [states, setStates] = useState([])
  useEffect(() =>{
  let statesArr = []
    db
    .collection("states")
    .doc("states")
    .get()
    .then((doc) => {
      setStates(doc.data().states)
    })
  }, [])

 
  function onChangeHandler(e) {
    // console.log('onChangeHandler', e)
    if (category.length > 9) {
      e.currentTarget.checked = false;
      return console.log("cant be more than 10");
    }

    console.log(e.currentTarget.textContent)
    let newArr = [];
    console.log("in");

    
    if (!category.contains(e.currentTarget.textContent)) {
      setChecked(!checked);

      // add a filter tag
      newArr = [...category, e.currentTarget.textContent];
      setCategory(newArr);
      console.log("in if")
      console.log(newArr);
    } else {
      setChecked(!checked);
      console.log("in else")
      console.log(e.currentTarget.textContent)
      // remove a filter tag
      let tmpCategories = category;
      let index = tmpCategories.indexOf(e.currentTarget.textContent);
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
{/* <Card >
  <h2>Filter By Tags</h2>


  {categoryList.map((cat, index) => (
    <div index={index}>
    <Checkbox 
    onChange={(e) => onChangeHandler(e)}
    value={cat.name}
      /> {cat.name}
      </div>
  ))}
</Card> */}

 <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={categoryList}
      onChange={(e) => onChangeHandler(e)}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={selected}
            value={option.name}
            
          />
          {option.name}
        </React.Fragment>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Checkboxes" placeholder="Favorites" />
      )}
    />

 <Card>
   

    <Autocomplete
      
      onChange={(e) => setCurrentState(e.currentTarget.textContent)}
      options={states}
      getOptionLabel={(state) => state.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search posts by state" variant="outlined" />}
    />

 </Card>
 </Card>
   
  );
};
