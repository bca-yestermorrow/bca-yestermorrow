import React from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import firebase from "firebase";

const Profile = () => {
  const [user, setUser] = useState("");

  const { currentUser } = useAuth();

  const getCurrentUser = async () => {
    let currentUserRef = await db
      .collection("users")
      .where("email", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(user)
          console.log(doc.data())
        if (!user) {
          setUser(doc.data());
        }
        });
      })

      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  console.log(user);
  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    let userCity = evt.target.city.value;
    let userState = evt.target.state.value
    let userFirstName = evt.target.firstName.value;
    let userLastName = evt.target.lastName.value;
    let userBio = evt.target.bio.value;
    let userProjects = evt.target.projects.value;
    let userClasses = evt.target.classes.selectedOptions;
    let classArray = []
    Array.from(userClasses).forEach((userClass) =>
      classArray.push(userClass.value)
    );
    
    let userProfile = await db
      .collection("users")
      .where("email", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //we are doing this twice, here and getCurrentUser
          setUser(doc.data());
          doc.ref.update({
            firstName: !userFirstName ? user.firstName : userFirstName,
            lastName: !userLastName ? user.lastName : userLastName,
            location: {
              city: !userCity ? user.location.city : userCity,
              state: !userState ? user.location.state : userState
            },
            bio: !userBio ? user.bio : userBio,
            projects: !userProjects ? user.projects : userProjects,
            classes: !classArray ? user.classes : classArray,
          });
          
        });
        
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      getCurrentUser()
  };

  return (
    <div>
      {user && (
        <div>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
          <p>{user.location.city}, {user.location.state}</p>
          <p>{user.bio}</p>
          <p>{user.projects}</p>
          {user.classes && user.classes.map((userClass, index) => {
            return (
            <div>
              <p key={index}>{userClass}</p>
            </div>
            )
          })}
          
        </div>
      )}
      <div>
        <form id="profile-form" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="state" placeholder="State" />
          <select id="classes" name="classes" multiple>
            <option value="class1">class1</option>
            <option value="class2">class2</option>
            <option value="class3">class3</option>
          </select>
          <textarea name="bio" placeholder={user.bio ? user.bio : "Tell us about yourself"}></textarea>
          <textarea name="projects" placeholder={user.projects ? user.projects : "What are you working on"}></textarea>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Profile;
