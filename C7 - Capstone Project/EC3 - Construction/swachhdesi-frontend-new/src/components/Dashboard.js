import React from "react";
import {
  isUserLoggedIn,
  getUser,
  removeUserSession,
  getAppDomain,
} from "./Common";
import { withRouter } from "react-router-dom";
import IncidentTable from "./IncidentTable";
import { Button, Typography, Grid, Card, CardContent } from "@mui/material";
import "./Incidents.css";
import axios from "axios";
import backImage from "./../assets/img/common_background.jpg";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push("/");
    e.preventDefault();
  };

  handleCreateIncident = (e) => {
    this.props.history.push("/AddIncident");
    e.preventDefault();
  };

  addIncidentsTable() {
    return (
      <div className="Incidents">
        <Typography
          variant="h5"
          align="center"
          fontFamily={"monospace"}
          fontWeight="bold"
          className="incidents-heading"
        >
          Available Incidents
        </Typography>
        <IncidentTable data={this.state.tableData} />
      </div>
    );
  }

  async fetchActiveIncidentsData() {
    var apiBaseUrl = getAppDomain() + "/api/core/incidents";

    let allIncidentsData = await axios.get(apiBaseUrl);
    if (allIncidentsData.status === 200) {
      let allIncidents = allIncidentsData.data
        .filter((incident) => incident["status"] !== "Closed")
        .map((incident) => {
          return {
            id: incident["id"],
            Type: incident["type"],
            Place: incident["address"],
            "Reported Date": incident["creationDate"],
            "Volunteers Needed":
              incident["volunteers"].length +
              "/" +
              incident["numberOfPeopleNeeded"],
            Status: incident["status"],
            "Completion Date":
              incident["completionDate"] + " " + incident["completionTime"],
          };
        });
      this.setState({ tableData: allIncidents });
    }
  }

  async componentDidMount() {
    if (isUserLoggedIn()) {
      await this.fetchActiveIncidentsData();
    }
  }

  render() {
    if (!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
          <Typography variant="h4">Please login to continue..</Typography>
        </div>
      );
    }

    const user = getUser();

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
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Add a dark semi-transparent background
          }}
        >
          <Grid container className="dashboard-container" spacing={3}>
            <Grid item xs={12} className="Greeting">
              <Typography variant="h5">Welcome {user.name}!</Typography>
            </Grid>

            {this.state.tableData.length > 0 ? (
              <Grid item xs={12}>
                {this.addIncidentsTable()}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h5" className="incidents-heading">
                  No Created Incidents!
                </Typography>
              </Grid>
            )}

            <Grid item xs={12} display={"flex"} justifyContent="flex-end">
              <Button
                style={{ marginRight: "30px" }}
                variant="contained"
                color="primary"
                onClick={this.handleCreateIncident}
              >
                Create a new Incident
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);