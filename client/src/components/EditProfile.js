import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";

const EditProfile = () => {
  const [user, setUser] = useState("");
  const [categories, setCategories] = useState("");
  const { currentUser } = useAuth();
  let categoryArray = [];

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
    let userCity = evt.target.city.value;
    let userState = evt.target.state.value;
    let userFirstName = evt.target.firstName.value;
    let userLastName = evt.target.lastName.value;
    let userBio = evt.target.bio.value;
    let userProjects = evt.target.projects.value;
    let userClasses = evt.target.classes.selectedOptions;
    let classArray = [];
    Array.from(userClasses).forEach((userClass) =>
      classArray.push(userClass.value)
    );

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
            location: {
              city: !userCity ? user.location.city : userCity,
              state: !userState ? user.location.state : userState,
            },
            bio: !userBio ? user.bio : userBio,
            projects: !userProjects ? user.projects : userProjects,
            classes: !classArray ? user.classes : classArray,
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
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (!categories) {
      getCategories();
    }
  }, []);

  console.log(categories);
  return (
    <div className="edit-profile-container">
      {user && (
        <div className="user-profile-info">
          <div className="user-header">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.bio}</p>
          </div>
          <div className="user-body">
          <p>
            {user.location.city}, {user.location.state}
          </p>
          
          <p>{user.projects}</p>
          {user.classes &&
            user.classes.map((userClass, index) => {
              return (
                <div>
                  <p key={index}>{userClass}</p>
                </div>
              );
            })}
            </div>
        </div>
      )}
      <div>
        <form id="profile-form" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="state" placeholder="State" />
          <select id="classes" name="classes" multiple>
            {categories &&
              categories.map((category, index) => {
                return <option key={index}>{category.name}</option>;
              })}
          </select>
          <textarea
            name="bio"
            placeholder={user.bio ? user.bio : "Tell us about yourself"}
          ></textarea>
          <textarea
            name="projects"
            placeholder={
              user.projects ? user.projects : "What are you working on"
            }
          ></textarea>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
