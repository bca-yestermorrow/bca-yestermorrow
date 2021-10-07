import { useState } from "react";
import { Button } from "@material-ui/core";
import BannerPicture from "./BannerPicture";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const BannerModal = ({ handleBannerModalClosed, profile, yesterLogo }) => {
  const [bannerURL, setBannerURL] = useState(profile.bannerImg);
  const [bool, setBool] = useState(false);
  const { currentUser } = useAuth();

  const getBannerURL = (url) => {
    setBannerURL(url);
  };

  const handleClose = (evt) => {
    if (evt.target.className === "edit-profile-container") {
      handleBannerModalClosed();
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await db
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (bannerURL) {
            doc.ref.update({ bannerImg: bannerURL });
          }
        } else {
          console.log("no document");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    handleBannerModalClosed();
  };

  return (
    <div className="edit-profile-container" onClick={handleClose}>
      <div className="edit-profile-form">
        <div className="profile-pic-modal">
          <img
            src={bannerURL ? bannerURL : yesterLogo}
            alt={profile.firstName}
            style={{ maxWidth: "100%", maxHeight: "80%"}}
          />

          <form onSubmit={handleSubmit}>
            <BannerPicture
              getBannerURL={getBannerURL}
              setBool={setBool}
              id="profile-picture"
            />
            <Button
              disabled={bool}
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
export default BannerModal;
