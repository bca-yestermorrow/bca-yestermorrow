import React from "react";
import { Chip, Card, Avatar, Checkbox, TextField, Button, Box, FormControlLabel, FormControl, InputLabel, Typography } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebaseApp from "../firebase";
import {Autocomplete} from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";



import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles({
  button: {
    color: "white",
    backgroundColor: "green",
    
    
    fontSize: ".5vw",
    '&:hover' : {
      backgroundColor:"black"
    }
  },
  filterFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "90%",
    height: "100%",
    marginLeft: "1em"
  },

  jobFlex: {
    
  },
  filterField : {
   
  },
 

  
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
    <Paper elevation={5} className="createPost">
    
    <h1  id="filterTitle">FILTER</h1>
    
   <Box  className={classes.filterFlex}> 
 <FormControl>
  
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

 

    <Link to="/profile"><Button style={{width: "100%"}}   color="secondary" variant="contained">My Profile</Button></Link>
   <Typography color="secondary">External Resources:</Typography>
   <Button  className={classes.filterField} color="secondary" variant="contained"><a href="https://yestermorrow.org/connect/jobs">Find a job!</a></Button>
   <Button className={classes.filterField} color="secondary" variant="contained"><a href="https://yestermorrow.org/learn/courses"> Current Courses</a> </Button>


   <div id="footer">FOOTER</div>
 
   </Box>
 </Paper>
   
  );
};
