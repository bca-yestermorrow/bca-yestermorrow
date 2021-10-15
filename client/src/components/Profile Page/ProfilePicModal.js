import { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import ProfilePicture from "./ProfilePicture";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const ProfilePicModal = ({ handleModalClosed, profile, classes }) => {
  const [imageURL, setImageURL] = useState(profile.profilePic);
  const [disabled, setDisabled] = useState(false);
  const { currentUser } = useAuth()
  let target = "image"
  const handleClose = (evt) => {
    if (evt.target.className === "edit-profile-container") {
      handleModalClosed(target);
    }
  };

  const getImageURL = (url) => {
    setImageURL(url);
    console.log(imageURL, "line 17");
  };

  function removeEmptyVal(obj) {
    for (let property in obj) {
      if (obj[property] === "" || obj[property] === false) {
        delete obj[property];
      }
    }
    return obj;
  }

  function handleFormSubmit(evt) {
    handleSubmit(evt)
    handleUpdateUserPic(evt)
  }

  async function handleUpdateUserPic(evt) {
    evt.preventDefault();

    let changedImage = ({
      "user.profilePic": imageURL
    })

    const userInfo = await db
      .collection("posts")
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          if (doc.exists) {
            doc.ref.update(removeEmptyVal(changedImage));
          } else {
            console.log("no picture to be updated");
          }
        });
      });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log("submit")
    await db
    .collection("users")
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (imageURL) {
          doc.ref.update({ profilePic: imageURL });
        }
      } else {
        console.log("no document");
      }
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    handleModalClosed(target)
  }

  return (
    <div className="edit-profile-container" onClick={handleClose}>
      
        <div className="edit-profile-form">
          <div className="profile-pic-modal">
            <Avatar
              src={imageURL}
              alt={profile.firstName}
              className={classes.huge}
            >
              {profile.firstName[0]}
            </Avatar>

            <form onSubmit={handleFormSubmit}>

            <ProfilePicture
              getImageURL={getImageURL}
              setDisabled={setDisabled}
              id="profile-picture"
            />
            <Button
            disabled={disabled}
            id="profile-submit"
            color="secondary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default ProfilePicModal;
