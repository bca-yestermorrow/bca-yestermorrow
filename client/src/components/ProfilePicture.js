import { storage } from "../firebase";
import { useState } from "react";

const ProfilePicture = ({ getImageURL }) => {
  const [image, setImage] = useState("");
  // const [imageURL, setImageURL] = useState("")
  const handleImage = (evt) => {
    if (evt.target.files[0]) {
      setImage(evt.target.files[0]);
    }
  };

  const handleUpload = () => {
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            getImageURL(url);
          });
      }
    );
  };
  console.log(image);
  return (
    <div>
      <input type="file" onChange={handleImage} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePicture;
