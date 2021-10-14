import React from "react"
import IconButton from "@material-ui/core/IconButton";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import LinkedIn from "@material-ui/icons/LinkedIn";
import YouTube from "@material-ui/icons/YouTube";
import Instagram from "@material-ui/icons/Instagram";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    button: {
      color: "white",
      backgroundColor: "green",
  
      fontSize: ".5vw",
      "&:hover": {
        backgroundColor: "black",
      },
    },
    social: {
      "&:hover": {
        color: "green",
      },
    },
    filterFlex: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      width: "90%",
      height: "100%",
      marginLeft: "1em",
    },
  
    jobFlex: {},
    filterField: {},
  });

const Footer = () => {
    const classes = useStyles();
    return (
        <div>
        <div id="footer">
          <h4 style={{ color: "#939598" }}>
            Address: 7865 Main Street, Waitsfield VT 05673
          </h4>
          <h4 style={{ color: "#939598" }}>
            Phone:{" "}
            <a href="tel:802-496-5545" className="footerLinks">
              802-496-5545
            </a>
          </h4>
          <h4 style={{ color: "#939598" }}>
            Website:{" "}
            <a href="https://yestermorrow.org" className="footerLinks">
              www.yestermorrow.org
            </a>
          </h4>
          <div id="social">
            <IconButton aria-label="facebook" className={classes.social}>
              <a href="https://www.facebook.com/YestermorrowDesignBuildSchool/?ref=ts">
                {<Facebook />}
              </a>
            </IconButton>
            <IconButton aria-label="twitter" className={classes.social}>
              <a href="https://twitter.com/yestermorrow">{<Twitter />}</a>
            </IconButton>
            <IconButton aria-label="LinkedIn" className={classes.social}>
              <a href="https://www.linkedin.com/company/yestermorrow-design-build-school/">
                {<LinkedIn />}
              </a>
            </IconButton>
            <IconButton aria-label="YouTube" className={classes.social}>
              <a href="https://www.youtube.com/user/yestermorrowdb">
                {<YouTube />}
              </a>
            </IconButton>
            <IconButton aria-label="Instagram" className={classes.social}>
              <a href="https://www.instagram.com/yestermorrow/">
                {<Instagram />}
              </a>
            </IconButton>
          </div>
        </div>
      </div>
    )
}

export default Footer