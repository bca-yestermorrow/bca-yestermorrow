import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import {
  Card,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
  Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const EditProfile = ({ handleModalClosed }) => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const { currentUser } = useAuth();
  let categoryArray = [];
  const useStyles = makeStyles({
    large: {
      width: "200px",
      height: "200px",
      fontSize: "100px"
    },
    small: {
      width: "50px",
      height: "50px",
      fontSize: "25px"
    },
    green: {
      backgroundColor: "#59833b"
    }
  })

  const classes = useStyles()

  const getImageURL = (url) => {
    setImageURL(url);
  };
  console.log(imageURL);
  const getCurrentUser = async () => {
    await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
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

  const getCategories = async () => {
    await db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          categoryArray.push(doc.data());
        });
      });
    setCategories(categoryArray);
  };

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
    let userCountry = evt.target.country.value
    let userClasses = categoryName;

    let userProfile = await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //we are doing this twice, here and getCurrentUser
        if (doc.exists) {
          if (userFirstName){
            doc.ref.update({firstName: userFirstName})
          }
          if (userLastName) {
            doc.ref.update({
              lastName: userLastName
            })
          }
          if (userBio) {
            doc.ref.update({
              bio: userBio
            })
          }
          if (userProjects) {
            doc.ref.update({projects: userProjects})
          }
          if (userPortfolio) {
            doc.ref.update({portfolio: userPortfolio})
          }
          if (categoryName !== []) {
            doc.ref.update({classes: categoryName})
          }
          if (imageURL) {
            doc.ref.update({profilePic: imageURL})
          }
          if (userCity) {
            doc.ref.update({
              location: {
                city: userCity
              }
            })
          }
          if (userState) {
            doc.ref.update({
              location: {
                state: userState
              }
            })
          }
          if (userState) {
            doc.ref.update({
              location: {
                country: userCountry
              }
            })
          }
            // doc.ref.update({
            // firstName: !userFirstName ? user.firstName : userFirstName,
            // lastName: !userLastName ? user.lastName : userLastName,
            // location: {
            // city: !userCity ? user.location.city : userCity,
            // state: !userState ? user.location.state : userState,
            // },
            // bio: !userBio ? user.bio : userBio,
            // projects: !userProjects ? user.projects : userProjects,
            // classes: !categoryName ? user.classes : categoryName,
            // profilePic: !imageURL ? user.profilePic : imageURL,
          // });
          setUser(doc.data());
        } else {
          console.log("no document");
        }
      })

      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    getCurrentUser();
    setCategoryName([]);
    evt.target.bio.value = ""

    handleModalClosed()
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
  return (
    <div className="edit-profile-container">
      
      <div className="form-container">
          <form
            className="edit-profile-form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <button onClick={handleModalClosed} className="x-button">X</button>
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
            <TextField
            id="profile=city"
            // label={user.location.city}
            name="city"
            variant="filled"
          />
          <TextField
            id="profile-state"
            // label={user.location.state}
            name="state"
            variant="filled"
          />
          <TextField
            id="profile-country"
            // label={user.location.state}
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
