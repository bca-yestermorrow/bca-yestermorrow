import React from "react";
import { Chip, Card, Avatar, Checkbox, TextField, Button, Box, FormControlLabel, FormControl, InputLabel } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";
import {Autocomplete} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';



import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles({
  button: {
    color: "white",
    backgroundColor: "green",
    height: "10vw",
    width: "15vw",
    fontSize: "3rem",
    '&:hover' : {
      backgroundColor:"black"
    }
  },
  filterFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    flexDirection: "column",
    height: "50%"
  },
  jobFlex: {
    display: "flex",
    height: "50%",
    alignItems: "center",
    justifyContent: "center"
  },
  filterField : {
   
    
    width: "15vw"
  }
  
})

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
 
    

    
    let newArr = [];
    value.forEach((cat) => newArr.push(cat.name))
    setCategory(newArr) 
    console.log("in");
   
    console.log(value)
    
    
  }

  //it will automatically update the value array

  const classes = useStyles() 

  return (
    <Card>
    
    <Box className={classes.filterFlex} >
    
 <FormControl>
   <h2>Filter</h2>
 <Autocomplete
     
      multiple
      options={categoryList}
      onChange={(e, value) => onChangeHandler(e, value)}
      disableCloseOnSelect
      width={100}
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
      style={{ width: "100%" }}
      renderInput={(params) => (
        <TextField   {...params}  className={classes.filterField}  variant="outlined" label="Filter by tags" placeholder="Choose a tag" />
      )}
    />

   

    <Autocomplete
      
      onChange={(e) => setCurrentState(e.currentTarget.textContent)}
      options={states}
      getOptionLabel={(state) => state.name}
      style={{ width: "100%" }}
      renderInput={(params) => <TextField   className={classes.filterField} {...params} label="Filter by state" variant="outlined" />}
    />
    </FormControl>

 </Box>

 <Card className={classes.jobFlex}>
   <Button className={classes.button}>Find a job!</Button>
 </Card>
 </Card>
   
  );
};
