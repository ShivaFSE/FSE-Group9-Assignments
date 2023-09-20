import React from "react";
import { isUserLoggedIn, getAppDomain, getUser } from "./Common";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./IncidentDetails.css";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Divider,
  CardContent,
  CardActions,
  Card,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableContainer,
} from "@mui/material"; // Import Material-UI components
import backImage from "./../assets/img/incidents.jpg";

class IncidentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveAsVolunteer = this.handleRemoveAsVolunteer.bind(this);
    this.handleAddAsVolunteer = this.handleAddAsVolunteer.bind(this);
    this.handleCloseIncident = this.handleCloseIncident.bind(this);
    this.handleReopenIncident = this.handleReopenIncident.bind(this);

    this.state = {
      incidentData: {
        name: "",
        problemImageUrl: "",
        type: "",
        address: "",
        description: "",
        directions: "",
        numberOfPeopleNeeded: "",
        completionTime: "",
        completionDate: "",
        volunteers: [],
        status: "",
        creationDate: "",
        creatorId: "",
        id: "",
      },
      incidentItemDetails: [],
    };
  }

  handleRemoveAsVolunteer = async (e) => {
    console.log("handleRemoveAsVolunteer id: " + this.state.incidentData["id"]);
    var apiBaseUrl =
      getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    const index = self.state.incidentData.volunteers.indexOf(getUser().id);
    self.state.incidentData.volunteers.splice(index, 1);
    if (!this.areVolunteersFull()) {
      self.state.incidentData.status = "Active";
    }
    var payload = self.state.incidentData;

    let incidentUpdatedData = await axios.put(apiBaseUrl, payload);
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  };

  handleAddAsVolunteer = async (e) => {
    console.log("handleAddAsVolunteer id: " + this.state.incidentData["id"]);
    var apiBaseUrl =
      getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    this.state.incidentData.volunteers.push(getUser().id);
    if (this.areVolunteersFull()) {
      self.state.incidentData.status = "Full";
    }

    var payload = self.state.incidentData;

    let incidentUpdatedData = await axios.put(apiBaseUrl, payload);
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  };

  handleCloseIncident = async (e) => {
    console.log("handleCloseIncident id: " + this.state.incidentData["id"]);
    var apiBaseUrl =
      getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    self.state.incidentData.status = "Closed";
    var payload = self.state.incidentData;

    let incidentUpdatedData = await axios.put(apiBaseUrl, payload);
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  };

  handleReopenIncident = async (e) => {
    console.log("handleReopenIncident id: " + this.state.incidentData["id"]);
    var apiBaseUrl =
      getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    if (this.areVolunteersFull()) {
      self.state.incidentData.status = "Full";
    } else {
      self.state.incidentData.status = "Active";
    }
    var payload = self.state.incidentData;

    let incidentUpdatedData = await axios.put(apiBaseUrl, payload);
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  };

  areVolunteersFull() {
    const totalVolunteersNeeded = this.state.incidentData.numberOfPeopleNeeded;
    return this.state.incidentData.volunteers.length >= totalVolunteersNeeded
      ? true
      : false;
  }

  isCurrentUserAlreadyVolunteered() {
    return this.state.incidentData.volunteers.includes(getUser().id);
  }

  isCurrentUserCreator() {
    return this.state.incidentData.creatorId === getUser().id;
  }

  isIncidentClosed() {
    return this.state.incidentData.status === "Closed";
  }

  showRemoveAsVolunteer() {
    return (
      // <input
      //   type="button"
      //   onClick={this.handleRemoveAsVolunteer}
      //   value="Unjoin As Volunteer"
      // />
      <Button
        // style={{ marginRight: "30px" }}
        variant="contained"
        color="primary"
        onClick={this.handleRemoveAsVolunteer}
      >
        Unjoin As Volunteer
      </Button>
    );
  }

  showAddAsVolunteer() {
    return (
      // <input
      //   type="button"
      //   onClick={this.handleAddAsVolunteer}
      //   value="Join As Volunteer"
      // />
      <Button
        // style={{ marginRight: "30px" }}
        variant="contained"
        color="primary"
        onClick={this.handleAddAsVolunteer}
      >
        Join As Volunteer
      </Button>
    );
  }

  showVolunteersFull() {
    return <input type="button" disabled="disabled" value="Volunteers Full" />;
  }

  showCloseIncident() {
    return (
      // <input
      //   type="button"
      //   onClick={this.handleCloseIncident}
      //   value="Close Incident"
      // />
      <Button
        style={{ marginLeft: "30px" }}
        variant="contained"
        color="secondary"
        onClick={this.handleCloseIncident}
      >
        Close Incident
      </Button>
    );
  }

  showReopenIncident() {
    return (
      // <input
      //   type="button"
      //   onClick={this.handleReopenIncident}
      //   value="Reopen Incident"
      // />
      <Button
        // style={{ marginRight: "30px" }}
        variant="contained"
        color="primary"
        onClick={this.handleReopenIncident}
      >
        Reopen Incident
      </Button>
    );
  }

  render() {
    const { incidentData, loading } = this.state;

    if (!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
          <Typography variant="h4">Please log in to continue.</Typography>
        </div>
      );
    }

    return (
      <div
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "90vh",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Add a dark semi-transparent background
          }}
        >
          <Grid
            marginTop="95px"
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              className="incident-details-container"
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Field</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Incident Name</TableCell>
                      <TableCell>{incidentData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Type</TableCell>
                      <TableCell>{incidentData.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Place</TableCell>
                      <TableCell>{incidentData.address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell>{incidentData.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Volunteers</TableCell>
                      <TableCell>
                        {incidentData.volunteers.length}/
                        {incidentData.numberOfPeopleNeeded}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Completion Date</TableCell>
                      <TableCell>
                        {incidentData.completionDate},{" "}
                        {incidentData.completionTime}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>{incidentData.status}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              {loading ? null : (
                <>
                  {this.areVolunteersFull(incidentData.volunteers) &&
                  !this.isCurrentUserAlreadyVolunteered()
                    ? this.showVolunteersFull()
                    : this.isCurrentUserAlreadyVolunteered()
                    ? this.showRemoveAsVolunteer()
                    : this.showAddAsVolunteer()}
                  {this.isCurrentUserCreator()
                    ? this.isIncidentClosed()
                      ? this.showReopenIncident()
                      : this.showCloseIncident()
                    : null}
                </>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  async fetcIncidentData(incident_id) {
    console.log("selected incident_id: " + incident_id);
    if (incident_id === "") {
      return;
    }

    var apiBaseUrl = getAppDomain() + "/api/core/incidents?";
    apiBaseUrl = apiBaseUrl + "id=" + incident_id;

    let incidentDetailsData = await axios.get(apiBaseUrl);
    if (incidentDetailsData.status === 200) {
      let incidentDetails = incidentDetailsData.data.map((item) => {
        console.log(
          "item: customer_id: " + item["name"],
          ", restaurant_id: ",
          item["problemImageUrl"],
          ", menu_item_id: ",
          item["menu_item_id"],
          ", id: ",
          item["id"]
        );
        return {
          name: item["name"],
          problemImageUrl: item["problemImageUrl"],
          type: item["type"],
          address: item["address"],
          description: item["description"],
          directions: item["directions"],
          numberOfPeopleNeeded: item["numberOfPeopleNeeded"],
          completionTime: item["completionTime"],
          completionDate: item["completionDate"],
          volunteers: item["volunteers"],
          status: item["status"],
          creationDate: item["creationDate"],
          creatorId: item["creatorId"],
          id: item["id"],
        };
      });

      console.log("incident details received: " + incidentDetails[0]);
      this.setState({ incidentData: incidentDetails[0] });
    }
    console.log("incident call done");
  }

  async componentDidMount() {
    if (isUserLoggedIn()) {
      console.log("user selected incident details");
      const queryString = window.location.search;
      console.log("attributes: ", queryString);
      const urlParams = new URLSearchParams(queryString);
      const attributeValue = urlParams.get("id");
      console.log("attributeValue: ", attributeValue);
      await this.fetcIncidentData(attributeValue);
    } else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(IncidentDetails);
