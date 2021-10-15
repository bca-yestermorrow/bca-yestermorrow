import React from "react";
import { SignOut } from "./SignOut";
import {
  Checkbox,
  TextField,
  Button,
  Box,
  FormControl,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Footer from "./Footer"

const useStyles = makeStyles({
  button: {
    color: "white",
    backgroundColor: "green",

    fontSize: ".5vw",
    "&:hover": {
      backgroundColor: "black",
    },
  },
  social: {
    "&:hover": {
      color: "green",
    },
  },
  filterFlex: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "90%",
    height: "100%",
    marginLeft: "1em",
  },

  jobFlex: {},
  filterField: {},
});

export const FilterFeed = ({
  setChecked,
  setCategory,
  setCurrentState,
  currentState,
  checked,
  category,
  sticky
}) => {
  // const [category, setCategory] = useState(["General"]);
  // const [posts, setPosts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [states, setStates] = useState([]);
  useEffect(() => {
    let updatedCatagories = [];
    db.collection("categories")
      .get()
      .then((querySnap) => {
        querySnap.forEach((doc) => {
          updatedCatagories.push(doc.data());
        });
        setCategoryList(updatedCatagories);
      });
  }, []);

  useEffect(() => {
    db.collection("states")
      .doc("states")
      .get()
      .then((doc) => {
        setStates(doc.data().states);
      });
  }, []);

  function onChangeHandler(e, value) {
    let newArr = [];
    value.forEach((cat) => newArr.push(cat.name));
    setCategory(newArr);
  }

  const classes = useStyles();

  return (
    <Paper
      elevation={5}
      className={sticky ? "createPost-sticky" : "createPost"}
      style={{ overflowY: "hidden" }}
    >
      <h1 id="filterTitle">FILTER</h1>

      <Box className={classes.filterFlex}>
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
              <TextField
                {...params}
                className={classes.filterField}
                variant="outlined"
                label="Filter by tags"
                placeholder="Choose a tag"
              />
            )}
          />

          <Autocomplete
            onChange={(e) => setCurrentState(e.currentTarget.textContent)}
            options={states}
            getOptionLabel={(state) => state.name}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                className={classes.filterField}
                {...params}
                label="Filter by state"
                variant="outlined"
              />
            )}
          />
        </FormControl>

        <Link to="/profile">
          <Button
            style={{ width: "100%" }}
            color="secondary"
            variant="contained"
          >
            My Profile
          </Button>
        </Link>
        <SignOut />
        <h4 className="createPostSections" style={{ color: "#708c84" }}>
          External Resources:
        </h4>
        <Button
          className={classes.filterField}
          color="primary"
          variant="contained"
        >
          <a href="https://yestermorrow.org/connect/jobs">Find a job!</a>
        </Button>
        <Button
          className={classes.filterField}
          color="primary"
          variant="contained"
        >
          <a href="https://yestermorrow.org/learn/courses"> Current Courses</a>{" "}
        </Button>
        <Footer/>
      </Box>
    </Paper>
  );
};
