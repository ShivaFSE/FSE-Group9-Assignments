import React from 'react';
import { isUserLoggedIn, getUser, removeUserSession, getAppDomain } from './Common';
import { withRouter } from "react-router-dom";
import IncidentTable from "./IncidentTable";
import './Incidents.css';
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentbooking: this.props.location.state.detail,
      tableData: [ ]
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push('/');
    e.preventDefault();
  }

  handleCreateIncident = (e) => {
    this.props.history.push('/AddIncident');
    e.preventDefault();
  }

  addIncidentsTable() {
    return (
    <div className="Incidents">
    <h2 className='incidents-heading'>Available Incidents</h2>
    <IncidentTable data={this.state.tableData} />
    </div>)
  }

  render() {
    if(!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
        <h1>Plese login to continue..</h1>
      </div>
      )
    }

    const user = getUser();
    
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name} !</h3>
        </div>

        {(this.state.tableData.length > 0) ? this.addIncidentsTable() : <h2 className='incidents-heading'>No Active Incidents!</h2>}
        
        <div className='user-menu'>
          <input type="button" onClick={this.handleCreateIncident} value="Create a new Incident" />
          <input type="button" onClick={this.handleLogout} value="Logout" />
        </div>
      </div>
    );
  }

  async fetchActiveIncidentsData() {
    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/incidents?"
    var apiBaseUrl = getAppDomain() + "/api/core/incidents"

    let allIncidentsData = await axios.get(apiBaseUrl);
    console.log("allIncidentsData status: ", allIncidentsData.status);
    if (allIncidentsData.status === 200) {
      let allIncidents = allIncidentsData.data
      .filter(incident => incident["status"] !== "Closed")
        .map((incident) => {
            return {
              "id": incident["id"],
              "Type": incident["type"],
              "Place": incident["address"],
              "Reported Date": incident["creationDate"],
              "Volunteers Needed": incident["volunteers"].length + "/" + incident["numberOfPeopleNeeded"],
              "Status": incident["status"],
              "Completion Date": incident["completionDate"] + " " + incident["completionTime"]
            }
        });
        this.setState({ tableData: allIncidents });
        console.log(this.state.tableData);
    }
  }

  async componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("User is " + getUser().name);
      await this.fetchActiveIncidentsData();
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Dashboard);