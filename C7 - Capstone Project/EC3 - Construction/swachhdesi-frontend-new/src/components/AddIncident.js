import React from "react";
import "./AddIncident.css";
import { getUser, getAppDomain } from "./Common";
import { FormErrors } from "./FormErrors";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import backImage from "./../assets/img/background.jpg";

class AddIncident extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: "",
      problemImageUrl: "",
      type: "",
      address: "",
      description: "",
      directions: "",
      //createdDate: '',
      //noOfPeopleVolunteered: '',
      noOfPeopleNeeded: "",
      //status: '',
      completionTime: "",
      completionDate: "",
      //completionImageUrl: '',
      formErrors: {
        name: " is too short",
        problemImageUrl: " Upload an Image to explain the probelm",
        type: " is too short",
        address: " is too short",
        description: " is too short",
        noOfPeopleNeeded: " is not a number",
        completionTime: " is not time",
        completionDate: " is not a date",
      },
      nameValid: false,
      problemImageUrlValid: false,
      typeValid: false,
      addressValid: false,
      descriptionValid: false,
      noOfPeopleNeededValid: false,
      completionTimeValid: false,
      completionDateValid: false,
      formValid: false,
    };
  }
  handleChange = (e) => {
    console.log("in handleChange");
    this.setState({
      role: e.target.value,
    });
  };

  validateField(fieldName, value) {
    console.log("key: " + fieldName + ", value: " + value);
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let problemImageUrlValid = this.state.problemImageUrlValid;
    let typeValid = this.state.typeValid;
    let addressValid = this.state.addressValid;
    let descriptionValid = this.state.descriptionValid;
    let noOfPeopleNeededValid = this.state.noOfPeopleNeededValid;
    let completionTimeValid = this.state.completionTimeValid;
    let completionDateValid = this.state.completionDateValid;

    switch (fieldName) {
      case "name":
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? "" : " is too short";
        break;

      case "problemImageUrl":
        problemImageUrlValid = value.length >= 1;
        fieldValidationErrors.problemImageUrl = problemImageUrlValid
          ? ""
          : " is too short";
        break;

      case "type":
        typeValid = value.length >= 1;
        fieldValidationErrors.type = typeValid ? "" : " is too short";
        break;

      case "address":
        addressValid = value.length >= 1;
        fieldValidationErrors.address = addressValid ? "" : " is too short";
        break;

      case "description":
        descriptionValid = value.length >= 1;
        fieldValidationErrors.description = descriptionValid
          ? ""
          : " is too short";
        break;

      case "noOfPeopleNeeded":
        noOfPeopleNeededValid = value.match(
          /^(\d*([.,](?=\d{3}))?\d+)+((?!\2))?$/
        );
        fieldValidationErrors.noOfPeopleNeeded = noOfPeopleNeededValid
          ? ""
          : " is not a number";
        break;

      case "completionTime":
        completionTimeValid = value.length >= 1;
        fieldValidationErrors.completionTime = completionTimeValid
          ? ""
          : " is not time";
        break;

      case "completionDate":
        completionDateValid = value.length >= 1;
        fieldValidationErrors.completionDate = completionDateValid
          ? ""
          : "is not a date";
        break;

      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        problemImageUrlValid: problemImageUrlValid,
        typeValid: typeValid,
        addressValid: addressValid,
        descriptionValid: descriptionValid,
        noOfPeopleNeededValid: noOfPeopleNeededValid,
        completionTimeValid: completionTimeValid,
        completionDateValid: completionDateValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    console.log("in validateForm");
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.problemImageUrlValid &&
        this.state.typeValid &&
        this.state.addressValid &&
        this.state.descriptionValid &&
        this.state.noOfPeopleNeededValid &&
        this.state.completionTimeValid &&
        this.state.completionDateValid,
    });
  }

  errorClass(error) {
    console.log("in errorClass");
    return error.length === 0 ? "" : "has-error";
  }

  handleUserInput = (e) => {
    console.log("in handleUserInput");
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = (e) => {
    console.log("handleSubmit creator id: " + getUser().id);
    var apiBaseUrl = getAppDomain() + "/api/core/incidents";
    var self = this;
    var date = new Date();
    let dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    var payload = {
      name: this.state.name,
      problemImageUrl: this.state.problemImageUrl,
      type: this.state.type,
      address: this.state.address,
      description: this.state.description,
      directions: this.state.directions,
      numberOfPeopleNeeded: this.state.noOfPeopleNeeded,
      completionTime: this.state.completionTime,
      completionDate: this.state.completionDate,
      volunteers: [],
      status: "Active",
      creationDate: dateString,
      creatorId: getUser().id,
    };

    axios
      .post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Incident successfully added");
          console.log("Adding Incident successfully");
          self.props.history.push("/Dashboard");
        } else if (response.status === 204) {
          console.log("invalid Incident data");
          alert("invalid Incident data");
        } else {
          console.log("Unknown problem encountered");
          alert("Unknown problem encountered");
        }
      })
      .catch(function (error) {
        console.log("");
        console.log(error);
      });

    e.preventDefault();
  };

  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.05)", // Add a dark semi-transparent background
          }}
        ></div>
        <Container
          maxWidth="sm"
          style={{
            marginTop: "15px",
            backgroundColor: "#FFF", // Add a slightly dark background color
          }}
        >
          {" "}
          {/* Use a Container with maxWidth */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            padding="16px" // Add some padding for spacing
          >
            <form onSubmit={this.handleSubmit}>
              <Typography
                variant="h4"
                fontFamily="monospace" // Choose an eco-friendly font
                align="center"
              >
                Add a new Incident{" "}
              </Typography>
              <FormControl fullWidth style={{ marginBottom: "10px" }}>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={this.state.type}
                  onChange={this.handleUserInput}
                >
                  <MenuItem value="Street">Street</MenuItem>
                  <MenuItem value="Open Area">Open Area</MenuItem>
                  <MenuItem value="Broken Structure">Broken Structure</MenuItem>
                  <MenuItem value="Teaching">Teaching</MenuItem>
                  <MenuItem value="Weather Related">Weather Related</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="text"
                label="Short Name for Incident *"
                name="name"
                value={this.state.name}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Incident Description *"
                name="description"
                value={this.state.description}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Area Name *"
                name="address"
                value={this.state.address}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Directions to Place"
                name="directions"
                value={this.state.directions}
                onChange={this.handleUserInput}
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="text"
                label="Image URL for Problem *"
                name="problemImageUrl"
                value={this.state.problemImageUrl}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="number"
                label="Number of People Needed to Fix *"
                name="noOfPeopleNeeded"
                value={this.state.noOfPeopleNeeded}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="date"
                // label="Gather Date *"
                name="completionDate"
                value={this.state.completionDate}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                type="time"
                // label="Gather Time *"
                name="completionTime"
                value={this.state.completionTime}
                onChange={this.handleUserInput}
                required
                style={{ marginBottom: "10px" }}
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!this.state.formValid}
              >
                Submit
              </Button>
              <div className="error-message">
                <FormErrors formErrors={this.state.formErrors} />
              </div>
            </form>
          </Box>
        </Container>
      </div>
    );
  }
}

export default withRouter(AddIncident);
