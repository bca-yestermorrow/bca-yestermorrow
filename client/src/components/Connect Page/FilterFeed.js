import React from "react";
import { SignOut } from "./SignOut";
import IconButton from "@material-ui/core/IconButton";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import LinkedIn from "@material-ui/icons/LinkedIn";
import YouTube from "@material-ui/icons/YouTube";
import Instagram from "@material-ui/icons/Instagram";
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

export const FilterFeed = ({ setCategory, setCurrentState }) => {
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
    <Paper elevation={5} className="createPost">
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

        <div>
          <div id="footer">
            <h4 style={{ color: "#939598" }}>
              Address: 7865 Main Street, Waitsfield VT 05673
            </h4>
            <h4 style={{ color: "#939598" }}>
              Phone:{" "}
              <a href="tel:802-496-5545" className="footerLinks">
                802-496-5545
              </a>
            </h4>
            <h4 style={{ color: "#939598" }}>
              Website:{" "}
              <a href="https://yestermorrow.org" className="footerLinks">
                www.yestermorrow.org
              </a>
            </h4>
            <div id="social">
              <IconButton aria-label="facebook" className={classes.social}>
                <a href="https://www.facebook.com/YestermorrowDesignBuildSchool/?ref=ts">
                  {<Facebook />}
                </a>
              </IconButton>
              <IconButton aria-label="twitter" className={classes.social}>
                <a href="https://twitter.com/yestermorrow">{<Twitter />}</a>
              </IconButton>
              <IconButton aria-label="LinkedIn" className={classes.social}>
                <a href="https://www.linkedin.com/company/yestermorrow-design-build-school/">
                  {<LinkedIn />}
                </a>
              </IconButton>
              <IconButton aria-label="YouTube" className={classes.social}>
                <a href="https://www.youtube.com/user/yestermorrowdb">
                  {<YouTube />}
                </a>
              </IconButton>
              <IconButton aria-label="Instagram" className={classes.social}>
                <a href="https://www.instagram.com/yestermorrow/">
                  {<Instagram />}
                </a>
              </IconButton>
            </div>
          </div>
        </div>
      </Box>
    </Paper>
  );
};