import React from "react";
// import useAuth to get current user id
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import { Autocomplete } from "@material-ui/lab";
// imports for material ui
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
  Checkbox,
} from "@material-ui/core";
// import for material ui to customize styles
import { makeStyles } from "@material-ui/core/styles";

const EditProfile = ({
  handleModalClosed,
  locationDisplay,
  setLocationDisplay,
  profile,
}) => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [bool, setBool] = useState(false);

  const [states, setStates] = useState([]);
  const [locationPrivate, setLocationPrivate] = useState(false);
  const { currentUser } = useAuth();

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
      "&:hover": {
        backgroundColor: "#59833b",
        color: "#fff",
      },
    },
    selectedGreen: {
      "&:select": {
        backgroundColor: "#59833b",
        color: "#fff",
      },
    },
  });
  // allows use of classes.whatever on mui components
  const classes = useStyles();

  const getCurrentUser = async () => {
    setUser(profile);
    profile.interests.forEach((interest) => {
      categoryName.push(interest);
    });

    profile.roles.forEach((role) => {
        userRoles.push(role);
    });
    
   
  };

  // function to get the list of categories from the database
  const getCategories = async () => {
    let categoryArray = [];
    await db
      .collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // push each category/doc to an array
          categoryArray.push(doc.data());
        });
      });

    // setCategories to the array of docs to be used in the form dropdown
    setCategories(categoryArray);
    setRoles(["Student", "Intern", "Staff/Instructor"]);
  };
  // function to handle form submit. updates user doc with new information
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let rolesLength = userRoles.length;

    let formVals = {
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      bio: evt.target.bio.value,
      projects: evt.target.projects.value,
      portfolio: evt.target.portfolio.value,
      "location.city": evt.target.city.value,
      "location.state": evt.target.state.value,
      "location.country": evt.target.country.value,
      "location.private": locationPrivate,
    };

    let removeInterestArray = [];
    let removeRoleArray = [];

    categories.forEach((category) => {
      if (!categoryName.includes(category.name)) {
        removeInterestArray.push(category.name);
      }
    });

    roles.forEach((role) => {
      if (!userRoles.includes(role)) {
        removeRoleArray.push(role);
      }
    });

    function removeEmptyVal(obj) {
      for (let property in obj) {
        if (obj[property] === "" || obj[property] === false) {
          delete obj[property];
        }
      }
      return obj;
    }

    await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //we are doing this twice, here and getCurrentUser
        // each if statement is separate so the database isnt updated with empty values
        if (doc.exists) {
          doc.ref.update(removeEmptyVal(formVals));

          if (rolesLength > 0) {
            rolesLength = rolesLength - 1;
            while (rolesLength >= 0) {
              doc.ref.update({
                roles: firebase.firestore.FieldValue.arrayUnion(
                  userRoles[rolesLength]
                ),
              });
              rolesLength -= 1;
            }
            removeRoleArray.forEach((role) => {
              doc.ref.update({
                roles: firebase.firestore.FieldValue.arrayRemove(role),
              });
            });
          }

          categoryName.forEach((category) => {
            doc.ref.update({
              interests: firebase.firestore.FieldValue.arrayUnion(category),
            });
          });

          //if catagorey was already in catagories it would add cat again
          removeInterestArray.forEach((category) => {
            doc.ref.update({
              interests: firebase.firestore.FieldValue.arrayRemove(category),
            });
          });
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

  const handleClose = (evt) => {
    if (evt.target.className === "edit-profile-container") {
      handleModalClosed();
    }
  };

  const handleChange = (evt) => {
    setCategoryName(evt.target.value);
  };

  const handleRoleChange = (evt) => {
    setUserRoles(evt.target.value);
  };

  useEffect(() => {
    db.collection("states")
      .doc("states")
      .get()
      .then((doc) => {
        setStates(doc.data().states);
      });
  }, []);

  useEffect(() => {
    getCurrentUser();

    if (!categories) {
      getCategories();
    }
  }, []);

  return (
    <div className="edit-profile-container" onClick={handleClose}>
      <div className="form-container">
        <form
          className="edit-profile-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* <button onClick={handleModalClosed} className="x-button">
            X
          </button> */}
          <div className="fullname">
            <div className="name-label-field-pair">
              <label className="label" for="profile-firstName">
                First Name:
              </label>
              <TextField
                className="input-field"
                style={{ width: "96%" }}
                id="profile-firstName"
                label={user.firstName}
                name="firstName"
                variant="filled"
              />
            </div>
            <div className="name-label-field-pair">
              <label className="label" for="profile-lastName">
                Last Name:
              </label>
              <TextField
                className="input-field"
                style={{ width: "96%" }}
                id="profile-lastName"
                label={user.lastName}
                name="lastName"
                variant="filled"
              />
            </div>
          </div>
          <div className="full-location">
            <div className="location-label-field-pair">
              <label for="profile-city">City:</label>
              <TextField
                className="input-field"
                style={{ width: "96%" }}
                id="profile-city"
                label={user.location ? user.location.city : "city"}
                name="city"
                variant="filled"
              />
            </div>

            <div className="location-label-field-pair">
              <label className="label" for="profile-state">
                State:
              </label>
              <Autocomplete
                options={states}
                getOptionLabel={(state) => state.name}
                style={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    className={classes.filterField}
                    style={{ width: "96%" }}
                    {...params}
                    label={user.location ? user.location.state : "State"}
                    name="state"
                    variant="filled"
                  />
                )}
              />
            </div>
            <div className="location-label-field-pair">
              <label className="label" for="profile-country">
                Country:
              </label>
              <TextField
                className="input-field"
                style={{ width: "96%" }}
                id="profile-country"
                label={user.location ? user.location.country : "country"}
                name="country"
                variant="filled"
              />
            </div>
          </div>
          <label className="label" for="profile-interests">
            Interests:
          </label>
          <Select
            className="input-field"
            id="profile-interests"
            onChange={handleChange}
            value={categoryName}
            name="classes"
            multiple
          >
            {categories &&
              categories.map((category) => {
                return (
                  <MenuItem
                    className={classes.selectedGreen}
                    key={category.name}
                    value={category.name}
                  >
                    {category.name}
                  </MenuItem>
                );
              })}
          </Select>
          <label className="label" for="profile-bio">
            Bio:
          </label>
          <TextField
            className="input-field"
            id="profile-bio"
            label={user.bio}
            name="bio"
            inputProps={{ maxLength: 500 }}
            variant="filled"
          />
          <label className="label" for="profile-projects">
            Projects:
          </label>
          <TextField
            className="input-field"
            id="profile-projects"
            label={user.projects}
            name="projects"
            variant="filled"
          />
          <label className="label" for="profile-portfolio">
            Portfolio/Social links:
          </label>
          <TextField
            className="input-field"
            id="profile-portfolio"
            label={user.portfolio}
            name="portfolio"
            variant="filled"
          />
          <label className="label" for="select-role">
            Role:
          </label>
          <Select
            id="select-role"
            className="input-field"
            onChange={handleRoleChange}
            input={<Input />}
            value={userRoles}
            multiple
          >
            <MenuItem className={classes.selectedGreen} value="Student">
              Student
            </MenuItem>
            <MenuItem className={classes.selectedGreen} value="Intern">
              Intern
            </MenuItem>
            <MenuItem
              className={classes.selectedGreen}
              value="Staff/Instructor"
            >
              Staff/Instructor
            </MenuItem>
          </Select>

          <Button
            disabled={bool}
            id="profile-submit"
            color="secondary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          <div>
            <h3>
              Allow other users to see my location {profile.location.private}
            </h3>
            <Select
              value={locationPrivate}
              onChange={(e) => setLocationPrivate(e.target.value)}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
