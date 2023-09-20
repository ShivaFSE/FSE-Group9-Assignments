import React from "react";
import "./Home.css";
import mainLogo from "./../assets/img/main.jpg";
import { Button } from "@material-ui/core";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";

// import React from 'react';
// import backgroundImage from './path-to-your-image.jpg'; // Import your background image

const MyComponent = () => {
  const containerStyle = {
    fontSize: "19px",
    width: "100%",
    height: "95vh",
    backgroundImage: `url(${mainLogo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative", // Set the container to a relative position
    fontWeight: "bold",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a dark semi-transparent background
  };

  const cardStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Center the card horizontally and vertically
    padding: "50px",
    // borderColor: "#FFF",
    border: "2px solid #fff", // Add a white border

    backgroundColor: "rgba(0, 0, 0, 0.3)", // Add a slightly dark background color
    borderRadius: "20px",
    // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    color: "#fff", // Text color
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={cardStyle}>
        {/* Your card content */}
        <h2
          style={{
            fontFamily: "monospace",
            position: "center",
            fontSize: "40px",
          }}
        >
          <EnergySavingsLeafIcon />
          Swachh Desi
        </h2>
        <p>A clean country start from our house and local streets..</p>
        <a href="/" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            style={{
              color: "#399E3C",
              borderColor: "#399E3C",
              display: "flex",
              width: "100%",
              fontSize: "18px",
              backgroundColor: "",
            }}
          >
            Click to place your impact
          </Button>
        </a>
      </div>
    </div>
  );
};

export default MyComponent;
