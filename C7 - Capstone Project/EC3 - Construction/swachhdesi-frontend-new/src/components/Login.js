import React from "react";
import { withRouter } from "react-router-dom";
import {
  isUserLoggedIn,
  getUser,
  setUserSession,
  getAppDomain,
} from "./Common";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { FormErrors } from "./FormErrors";
import axios from "axios";
import Grid from "@mui/material/Grid";
import loginImage from "./../assets/img/login.jpg";

// import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: "",
      password: "",
      UserType: "user",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      userTypeValid: true,
      formValid: false,
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  onValueChange = (e) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    fieldValidationErrors.userType = "";
    this.setState(
      {
        UserType: e.target.value,
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        userTypeValid: true,
      },
      this.validateForm
    );
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let userTypeValid = this.state.userTypeValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;

      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
        userTypeValid: userTypeValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.userTypeValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  handleClick = (e) => {
    this.props.history.push("/registration");
    e.preventDefault();
  };

  handleSubmit = (e) => {
    var apiBaseUrl = getAppDomain() + "/api/authentication/";
    var self = this;

    console.log(
      "Login: " +
        this.state.email +
        ", " +
        this.state.password +
        ", " +
        this.state.UserType
    );

    // Revert back to post method when Backend is built
    // var payload = {
    //   "email": this.state.email,
    //   "password": this.state.password,
    //   "role": this.state.UserType
    // }
    // axios.post(apiBaseUrl + 'login', payload)
    axios
      .get(
        apiBaseUrl +
          "registration?email=" +
          this.state.email +
          "&password=" +
          this.state.password +
          "&role=" +
          this.state.UserType
      )
      .then(function (response) {
        self.setState({ users: response.data });
        setUserSession(
          response.data[0].id,
          response.data[0].name,
          response.data[0].address,
          response.data[0].role
        );
        if (response.status === 200) {
          console.log(
            "In Login.successfull " +
              getUser().id +
              ", " +
              getUser().name +
              ", " +
              getUser().address
          );
          if (response.data[0].role === "user") {
            self.props.history.push("/Dashboard");
          } else if (response.data[0].role === "moderator") {
            self.props.history.push("/Dashboard");
          }
        } else if (response.status === 204) {
          console.log("emailid and pwd do not match");
          alert("emailid and pwd do not match");
        } else {
          console.log("User does not exist");
          alert("User does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Login failed, please check the credentials and try again!");
      });

    e.preventDefault();
  };

  render() {
    console.log(
      "In Login.js " +
        getUser().id +
        ", " +
        getUser().name +
        ", " +
        getUser().address
    );
    if (isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
          {this.props.history.push("/Dashboard")}
        </div>
      );
    } else {
      console.log("User is not logged in");
    }

    return (
      <Grid style={{ backgroundColor: "#F3F0CA" }} container>
        <Grid
          marginTop={"2%"}
          alignContent={"center"}
          justifyContent={"center"}
          item
          xs={5}
        >
          <Card>
            <CardContent
              style={{
                padding: "100px",
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#FAF7D8",
              }}
            >
              <h2
                align="center"
                style={{
                  color: "#3d9052",
                  fontFamily: "monospace",
                  position: "center",
                  fontSize: "40px",
                }}
              >
                LOGIN
              </h2>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    required
                    style={{ backgroundColor: "#FFF" }}
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={this.state.email}
                    margin="normal"
                    onChange={this.handleUserInput}
                  />
                </div>

                <div>
                  <TextField
                    style={{ backgroundColor: "#FFF" }}
                    label="Password"
                    fullWidth
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleUserInput}
                  />
                </div>

                <div>
                  <FormControl style={{ padding: "15px" }} component="fieldset">
                    <FormLabel
                      component="legend"
                      style={{ paddingTop: "20px" }}
                    >
                      User Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="User Type"
                      name="UserType"
                      value={this.state.UserType}
                      onChange={this.onValueChange}
                    >
                      <FormControlLabel
                        value="user"
                        control={<Radio />}
                        label="User"
                      />
                      <FormControlLabel
                        value="moderator"
                        control={<Radio />}
                        label="Moderator"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!this.state.formValid}
                  fullWidth
                >
                  Login
                </Button>

                <div className="error-message">
                  <FormErrors formErrors={this.state.formErrors} />
                </div>
              </form>
              <h3 align="center">OR</h3>
              <form className="demoForm" onSubmit={this.handleClick}>
                <label align="center" htmlFor="Registration">
                  <b>New User? Register Now </b>
                </label>
                <br />
                <Button
                  style={{ marginTop: "25px" }}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={7}>
          <img
            src={loginImage}
            style={{ width: "100%", height: "86vh" }}
            alt=""
          />
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(Login);
