import React from "react";
// import useAuth to get current user id
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
// imports for material ui
import {
  Card,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
  Avatar,
} from "@material-ui/core";
// import for material ui to customize styles
import { makeStyles } from "@material-ui/core/styles";

const EditProfile = ({ handleModalClosed }) => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const { currentUser } = useAuth();
  let categoryArray = [];
  // allows use of various customized styles on material ui components
  const useStyles = makeStyles({
    // to be used for larger profile pics/avatars
    large: {
      width: "200px",
      height: "200px",
      fontSize: "100px",
    },
    // to be used for smaller profile pics/avatars
    small: {
      width: "50px",
      height: "50px",
      fontSize: "25px",
    },
    // button color
    green: {
      backgroundColor: "#59833b",
    },
  });
  // allows use of classes.whatever on mui components
  const classes = useStyles();

  const getImageURL = (url) => {
    setImageURL(url);
  };
  // function to get the user document of the current user from the database
  const getCurrentUser = async () => {
    // from the users collection, get the doc with the id of currentuser.uid
    await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        // if there is a doc with this id
        if (doc.exists) {
          // doc.data() is never undefined for query doc snapshots
          console.log(user);
          console.log(doc.data());
          setUser(doc.data());
        } else {
          console.log("No document");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  // function to get the list of categories from the database
  const getCategories = async () => {
    await db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // push each category/doc to an array
          categoryArray.push(doc.data());
        });
      });
    // setCategories to the array of docs to be used in the form dropdown
    setCategories(categoryArray);
  };
  // function to handle form submit. updates user doc with new information
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // let userCity = evt.target.city.value;
    // let userState = evt.target.state.value;
    let userFirstName = evt.target.firstName.value;
    let userLastName = evt.target.lastName.value;
    let userBio = evt.target.bio.value;
    let userProjects = evt.target.projects.value;
    let userPortfolio = evt.target.portfolio.value;
    let userCity = evt.target.city.value;
    let userState = evt.target.state.value;
    let userCountry = evt.target.country.value;
    let userClasses = categoryName;

    let userProfile = await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //we are doing this twice, here and getCurrentUser
        // each if statement is separate so the database isnt updated with empty values
        if (doc.exists) {
          // if userFirstName, the user input value, is true, update the user doc
          if (userFirstName) {
            doc.ref.update({ firstName: userFirstName });
          }
          if (userLastName) {
            doc.ref.update({
              lastName: userLastName,
            });
          }
          if (userBio) {
            doc.ref.update({
              bio: userBio,
            });
          }
          if (userProjects) {
            doc.ref.update({ projects: userProjects });
          }
          if (userPortfolio) {
            doc.ref.update({ portfolio: userPortfolio });
          }
          // categoryName is initialized as an empty array, so only update if it isnt empty
          if (categoryName !== []) {
            doc.ref.update({ classes: categoryName });
          }
          if (imageURL) {
            doc.ref.update({ profilePic: imageURL });
          }
          if (userCity) {
            doc.ref.update({
              "location.city": userCity
            });
          }
          if (userState) {
            doc.ref.update({
              "location.state": userState
            });
          }
          if (userState) {
            doc.ref.update({
              "location.country": userCountry
            });
          }

          setUser(doc.data());
        } else {
          console.log("no document");
        }
      })

      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    // after updating, call getcurrentuser to get updated info, reset categoryname and close modal
    getCurrentUser();
    setCategoryName([]);
    handleModalClosed();
  };

  const handleChange = (evt) => {
    setCategoryName(evt.target.value);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, []);
  console.log(categoryName);
  console.log(categories);
  console.log(user.location)
  return (
    <div className="edit-profile-container">
      <div className="form-container">
        <form
          className="edit-profile-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <button onClick={handleModalClosed} className="x-button">
            X
          </button>
          <label for="profile-firstName">First Name: </label>
          <TextField
            className="input-field"
            id="profile-firstName"
            label={user.firstName}
            name="firstName"
            variant="filled"
          />

          <label for="profile-lastName">Last Name: </label>
          <TextField
            className="input-field"
            id="profile-lastName"
            label={user.lastName}
            name="lastName"
            variant="filled"
          />
          <label for="profile-city">City: </label>
          <TextField
          className="input-field"
            id="profile-city"
            label={user.location ? user.location.city : "city"}
            name="city"
            variant="filled"
          />
          <label for="profile-state">State: </label>
          <TextField
          className="input-field"
            id="profile-state"
            label={user.location ? user.location.state : "state"}
            name="state"
            variant="filled"
          />
          <label for="profile-country">Country: </label>
          <TextField
          className="input-field"
            id="profile-country"
            label={user.location ? user.location.country : "country"}
            name="country"
            variant="filled"
          />
          <label for="profile-interests">Interests: </label>
          <Select
            className="input-field"
            id="profile-interests"
            onChange={handleChange}
            value={categoryName}
            input={<Input />}
            name="classes"
            multiple
          >
            {categories &&
              categories.map((category) => {
                return (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                );
              })}
          </Select>

          <label for="profile-bio">Bio: </label>
          <TextField
            className="input-field"
            id="profile-bio"
            label={user.bio}
            name="bio"
            variant="filled"
          />

          <label for="profile-projects">Projects: </label>
          <TextField
            className="input-field"
            id="profile-projects"
            label={user.projects}
            name="projects"
            variant="filled"
          />
          <label for="profile-portfolio">Portfolio/Social links: </label>
          <TextField
            className="input-field"
            id="profile-portfolio"
            label={user.portfolio}
            name="portfolio"
            variant="filled"
          />
          <label for="profile-picture">Upload a profile picture</label>
          <ProfilePicture getImageURL={getImageURL} id="profile-picture" />

          <Button
            id="profile-submit"
            className={classes.green}
            color="green"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
