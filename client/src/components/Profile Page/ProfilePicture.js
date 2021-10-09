import { storage } from "../../firebase";
import { useState } from "react";

const ProfilePicture = ({ setImageURL, setBool }) => {
  const [image, setImage] = useState("");
  const [isTrue, setIsTrue] = useState(true)
  const handleImage = (evt) => {
    if (evt.target.files[0]) {
      setImage(evt.target.files[0]);
      setIsTrue(false)
    }
  };

  const handleUpload = () => {
    setBool(true)
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
            setImageURL(url);
            setBool(false)
          });
      }
    );
  };
  console.log(image);
  return (
    <div>
      <input type="file" onChange={handleImage} />
      <button className="upload-button" type="button" disabled={isTrue} onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePicture;
