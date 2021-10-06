import { storage } from "../../firebase";
import { useState } from "react";

const BannerPicture = ({ getBannerURL, setBool }) => {
  const [banner, setBanner] = useState("");
  const [isTrue, setIsTrue] = useState(true)
  const handleBanner = (evt) => {
    if (evt.target.files[0]) {
      setBanner(evt.target.files[0]);
      setIsTrue(false)
    }
  };

  const handleUpload = () => {
    setBool(true)
    const upload = storage.ref(`banners/${banner.name}`).put(banner);
    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("banners")
          .child(banner.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            getBannerURL(url);
            setBool(false)
          });
      }
    );
  };
  console.log(banner);
  return (
    <div>
      <input type="file" onChange={handleBanner} />
      <button className="upload-button" type="button" disabled={isTrue} onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default BannerPicture;