import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import ProfilePicture from "./ProfilePicture";

const EditProfile = () => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const { currentUser } = useAuth();
  let categoryArray = [];
  let classArray;

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
    let userClasses = categoryName;
    classArray = [];
    Array.from(userClasses).forEach((userClass) =>
      classArray.push(userClass.value)
    );
    console.log(classArray);
    let userProfile = await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //we are doing this twice, here and getCurrentUser
        if (doc.exists) {
          doc.ref.update({
            firstName: !userFirstName ? user.firstName : userFirstName,
            lastName: !userLastName ? user.lastName : userLastName,
            // location: {
            //   city: !userCity ? user.location.city : userCity,
            //   state: !userState ? user.location.state : userState,
            // },
            bio: !userBio ? user.bio : userBio,
            projects: !userProjects ? user.projects : userProjects,
            classes: !categoryName ? user.classes : categoryName,
            profilePic: !imageURL ? user.profilePic : imageURL,
          });
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
    evt.target.bio.value = "";
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
      {user && (
        <div className="user-profile-info">
          <div className="user-header">
            <img
              src={user.profilePic}
              alt={user.profilePic}
              style={{ width: "150px", height: "150px", borderRadius: "50%", float: "left" }}
            />
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.bio}</p>
          </div>
          <div className="user-body">
            {/* <p>
              {user.location.city}, {user.location.state}
            </p> */}

            <p>{user.projects}</p>
            {user.classes &&
              user.classes.map((userClass, index) => {
                return (
                  <div>
                    <p key={userClass}>{userClass}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="form-container">
        <form
          className="edit-profile-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >

            <label for="profile-firstName">First Name: </label>
            <TextField
            className="input-field"
              id="profile-firstName"
              label={user.firstName}
              name="firstName"
              variant="outlined"
            />

            <label for="profile-lastName">Last Name: </label>
            <TextField
            className="input-field"
              id="profile-lastName"
              label={user.lastName}
              name="lastName"
              variant="outlined"
            />
          {/* <TextField
            id="profile=city"
            label={user.location.city}
            name="city"
            variant="outlined"
          />
          <TextField
            id="profile-state"
            label={user.location.state}
            name="state"
            variant="outlined"
          /> */}
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
              variant="outlined"
            />

            <label for="profile-projects">Projects: </label>
            <TextField
              className="input-field"
              id="profile-projects"
              label={user.projects}
              name="projects"
              variant="outlined"
            />
            <label for="profile-picture">Upload a profile picture</label>
          <ProfilePicture getImageURL={getImageURL} id="profile-picture" />

          <Button
            id="profile-submit"
            className="buttons"
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
