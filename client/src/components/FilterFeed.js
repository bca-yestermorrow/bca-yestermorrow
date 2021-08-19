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

export const FilterFeed = ({setChecked, setCategory, setCurrentState, currentState, checked, category}) => {
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

 
  function onChangeHandler(e, value) {
    // console.log('onChangeHandler', e)
    if (category.length > 9) {
      e.currentTarget.checked = false;
      return console.log("cant be more than 10");
    }

    
    let newArr = [];
    value.forEach((cat) => newArr.push(cat.name))
    setCategory(newArr) 
    console.log("in");
    //But it will not work when array.length === 0
    console.log(value)
    
    
    // if (!category.includes(e.currentTarget.textContent) && e.currentTarget.textContent !== '') {
    //   setChecked(!checked);
    //   value.forEach((cat) => newArr.push(cat.name))
      
    //   // add a filter tag
    //   // newArr = [...category, e.currentTarget.textContent];
    //   // setCategory(newArr);
    //   // console.log("in if")
    //   setCategory(newArr)
    //   console.log(newArr);
    // } else {
    //   setChecked(!checked);
    //   console.log("in else")
      
    //   // remove a filter tag
    //   let tmpCategories = category;
    //   value.forEach((cat) => category.push(cat.name) )
    //   let index = tmpCategories.indexOf(value[0].name);
    //   if (index > -1) {
    //     tmpCategories.splice(index, 1);
    //   }
    //   setCategory(tmpCategories);
    //   // print out category
    //   console.log(category);
    // }
  }

  //it will automatically update the value array

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
      
      onChange={(e, value) => onChangeHandler(e, value)}
      disableCloseOnSelect
      getOptionSelected={(option, value) => option.name === value.name}
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
