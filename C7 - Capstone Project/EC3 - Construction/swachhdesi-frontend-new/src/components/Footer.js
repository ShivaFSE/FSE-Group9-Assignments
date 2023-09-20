import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    fontFamily: "monospace",
    backgroundColor: "#333",
    color: "#fff",
    padding: "5px 0",
    fontSize: "18px",
    textAlign: "center",
    position: "fixed", // Set the position to fixed
    bottom: 0, // Place it at the bottom
    left: 0,
    right: 0,
  },
  content: {
    paddingBottom: "0px", // Adjust this value to leave space for the footer
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.content}>{/* Your main content */}</div>
      <footer className={classes.footer}>
        <p>&copy; {new Date().getFullYear()} Swachh Desi - Bengaluru, India</p>
        <p></p>
      </footer>
    </div>
  );
}

export default Footer;
