import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Divider,
} from "@material-ui/core";

import "@fontsource/roboto/700.css";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import { useHistory } from "react-router-dom";

import {
  isUserLoggedIn,
  getUser,
  removeUserSession,
  setUserSession,
  getAppDomain,
} from "./Common";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "linear-gradient(45deg, #4CAF50, #388E3C)", // Green color for an eco-friendly look
  },
  toolbar: {
    maxHeight: 70, // Decrease the minHeight to adjust the height
    justifyContent: "center",
    display: "flex",
    // justifyContent: "space-between",
  },
  title: {
    marginRight: theme.spacing(4),
    flexGrow: 0,
    textAlign: "left",
    fontFamily: "monospace", // Choose an eco-friendly font
    fontWeight: "bold",
  },
  button: {
    // marginLeft: theme.spacing(2),
    fontSize: "15px",
    color: "#FFF", // White text color for buttons
    fontWeight: "bold", // Make the text bold
    "&:hover": {
      backgroundColor: "#399E3C", // Darker green on hover
    },
    flexBasis: "auto",
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent white divider
    width: "2px", // Adjust the divider width as needed
    height: "18px",
  },
  buttonContainerRight: {
    display: "flex",
  },
  spacer: {
    flex: 1, // Flexible space to push the buttons to the right
  },
}));

function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(sessionStorage.getItem("user"));

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser);

    // Listen for route changes
    const unlisten = history.listen(() => {
      const updatedUser = sessionStorage.getItem("user");
      if (updatedUser !== user) {
        setUser(updatedUser);
      }
    });

    return () => {
      unlisten(); // Clean up the listener when the component unmounts
    };
  }, [history, user]);

  return (
    <AppBar
      position="static"
      className={`${classes.appBar} ${classes.toolbar}`}
    >
      <Toolbar>
        <EnergySavingsLeafIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        />
        <Button
          onClick={(e) => {
            history.push("/Home");
            e.preventDefault();
          }}
        >
          <Typography color="#FFF" variant="h6" className={classes.title}>
            Swachh Desi
          </Typography>
        </Button>
        {user && (
          <>
            <Button
              className={classes.button}
              onClick={(e) => {
                history.push("/Dashboard");
                e.preventDefault();
              }}
            >
              MY DASHBOARD
            </Button>
            <Divider className={classes.divider} orientation="vertical" />

            <Button
              className={classes.button}
              onClick={(e) => {
                history.push("/CreatedIncidents");
                e.preventDefault();
              }}
            >
              Created Incidents
            </Button>
            <Divider className={classes.divider} orientation="vertical" />
            <Button
              className={classes.button}
              onClick={(e) => {
                history.push("/ParticipatedIncidents");
                e.preventDefault();
              }}
            >
              Participated Incidents
            </Button>
            <Divider className={classes.divider} orientation="vertical" />
          </>
        )}
        <Button
          className={classes.button}
          onClick={(e) => {
            history.push("/UnderDevelopment");
            e.preventDefault();
          }}
        >
          About
        </Button>
        <Divider className={classes.divider} orientation="vertical" />
        <Button
          className={classes.button}
          onClick={(e) => {
            history.push("/Contact");
            e.preventDefault();
          }}
        >
          Contact
        </Button>

        <div className={classes.spacer}></div>
        <div className={classes.buttonContainerRight}>
          {!user && (
            <>
              <Button
                className={classes.button}
                onClick={(e) => {
                  history.push("/");
                  e.preventDefault();
                }}
              >
                Sign In
              </Button>

              <Button
                className={classes.button}
                onClick={(e) => {
                  history.push("/registration");
                  e.preventDefault();
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {user && (
            <Button
              className={classes.button}
              onClick={(e) => {
                removeUserSession();
                history.push("/home");
                e.preventDefault();
              }}
            >
              LOG OUT
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
