import React from 'react';
import { isUserLoggedIn, getAppDomain, getUser } from './Common';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './IncidentDetails.css';

class IncidentDetails extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveAsVolunteer = this.handleRemoveAsVolunteer.bind(this);
    this.handleAddAsVolunteer = this.handleAddAsVolunteer.bind(this);
    this.handleCloseIncident = this.handleCloseIncident.bind(this);
    this.handleReopenIncident = this.handleReopenIncident.bind(this);

    this.state = {
      incidentData: {
        "name": '',
        "problemImageUrl": '',
        "type": '',
        "address": '',
        "description": '',
        "directions": '',
        "numberOfPeopleNeeded": '',
        "completionTime": '',
        "completionDate": '',
        "volunteers": [],
        "status": '',
        "creationDate": '',
        "creatorId": '',
        "id": ''
      },
      incidentItemDetails: []
    }
  }

  handleRemoveAsVolunteer = async (e) => {
    console.log("handleRemoveAsVolunteer id: " + this.state.incidentData["id"]);
    var apiBaseUrl = getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    const index = self.state.incidentData.volunteers.indexOf(getUser().id);
    self.state.incidentData.volunteers.splice(index, 1);
    if (!this.areVolunteersFull()) {
      self.state.incidentData.status = "Active" ;
    }
    var payload = self.state.incidentData;
    
    let incidentUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  handleAddAsVolunteer = async (e) => {
    console.log("handleAddAsVolunteer id: " + this.state.incidentData["id"]);
    var apiBaseUrl = getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    this.state.incidentData.volunteers.push(getUser().id);
    if (this.areVolunteersFull()) {
      self.state.incidentData.status = "Full" ;
    }

    var payload = self.state.incidentData;
    
    let incidentUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  handleCloseIncident = async (e) => {
    console.log("handleCloseIncident id: " + this.state.incidentData["id"]);
    var apiBaseUrl = getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    self.state.incidentData.status = "Closed" ;
    var payload = self.state.incidentData;
    
    let incidentUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  handleReopenIncident = async (e) => {
    console.log("handleReopenIncident id: " + this.state.incidentData["id"]);
    var apiBaseUrl = getAppDomain() + "/incidents/" + this.state.incidentData["id"];
    var self = this;
    if (this.areVolunteersFull()) {
      self.state.incidentData.status = "Full" ;
    }
    else {
      self.state.incidentData.status = "Active" ;
    }
    var payload = self.state.incidentData;
    
    let incidentUpdatedData = await axios.put(apiBaseUrl, payload)
    console.log("incident details: ", incidentUpdatedData.status);
    if (incidentUpdatedData.status === 200) {
      window.location.reload(false);
    }
    e.preventDefault();
  }

  areVolunteersFull() {
    const totalVolunteersNeeded = this.state.incidentData.numberOfPeopleNeeded;
    return this.state.incidentData.volunteers.length >= totalVolunteersNeeded ? true : false ;
  }

  isCurrentUserAlreadyVolunteered() {
    return this.state.incidentData.volunteers.includes(getUser().id);
  }

  isCurrentUserCreator() {
    return this.state.incidentData.creatorId === getUser().id ;
  }

  isIncidentClosed() {
    return this.state.incidentData.status === "Closed" ;
  }

  showRemoveAsVolunteer() {
    return (
      <input type="button" onClick={this.handleRemoveAsVolunteer} value="Unjoin As Volunteer" />
    )
  }

  showAddAsVolunteer() {
    return (
      <input type="button" onClick={this.handleAddAsVolunteer} value="Join As Volunteer" />
    )
  }

  showVolunteersFull() {
    return (
      <input type="button" disabled="disabled" value="Volunteers Full" />
    )
  }

  showCloseIncident() {
    return (
      <input type="button" onClick={this.handleCloseIncident} value="Close Incident" />
    )
  }

  showReopenIncident() {
    return (
      <input type="button" onClick={this.handleReopenIncident} value="Reopen Incident" />
    )
  }

  render() {
    if(!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
          <h1>Plese login to continue..</h1>
        </div>
      )
    }

    return (
      <div className="dashboard-container">
        <h2>Incident Details</h2>
        <div className='user-menu'>
          { (this.areVolunteersFull() && !this.isCurrentUserAlreadyVolunteered()) ? this.showVolunteersFull() : (this.isCurrentUserAlreadyVolunteered() ? this.showRemoveAsVolunteer() : this.showAddAsVolunteer()) }
          { this.isCurrentUserCreator() ? (this.isIncidentClosed() ? this.showReopenIncident() : this.showCloseIncident()): null }
        </div>
        <div className="incident-details-container">
          <section className="menu section bd-container" id="menu">
            <div className="menu_details">
              <h3><br/><br/><br/>{"Incident Name: " + this.state.incidentData["name"]}</h3>
              <h3 className="incident_details">{"Type: " + this.state.incidentData["type"]}<br/></h3>
              <label className="incident_details">{"Place: " + this.state.incidentData["address"]}</label>
              <label className="incident_details">{"Description: " + this.state.incidentData["description"]}</label>
              <label className="incident_details">{"Volunteers: " + this.state.incidentData.volunteers.length + "/" + this.state.incidentData["numberOfPeopleNeeded"]}</label>
              <label className="incident_details">{"Completion Date: " + this.state.incidentData["completionDate"] + ", " + this.state.incidentData["completionTime"]}</label>
              <label className="incident_details">{"Status: " + this.state.incidentData["status"]}</label>
            </div>
          </section>
        </div>
      </div>
    );
  }

  async fetcIncidentData(incident_id) {
    
    console.log("selected incident_id: " + incident_id);
    if (incident_id === "") {
      return
    }

    var apiBaseUrl = getAppDomain() + "/api/core/incidents?"
    apiBaseUrl = apiBaseUrl + "id=" + incident_id;

    let incidentDetailsData = await axios.get(apiBaseUrl)
    if (incidentDetailsData.status === 200) {
      let incidentDetails = incidentDetailsData.data.map((item) => {
        console.log("item: customer_id: " + item["name"], ", restaurant_id: ", item["problemImageUrl"], ", menu_item_id: ", item["menu_item_id"], ", id: ", item["id"]);
        return {
          "name": item["name"],
          "problemImageUrl": item["problemImageUrl"],
          "type": item["type"],
          "address": item["address"],
          "description": item["description"],
          "directions": item["directions"],
          "numberOfPeopleNeeded": item["numberOfPeopleNeeded"],
          "completionTime": item["completionTime"],
          "completionDate": item["completionDate"],
          "volunteers": item["volunteers"],
          "status": item["status"],
          "creationDate": item["creationDate"],
          "creatorId": item["creatorId"],
          "id": item["id"]
        }
      });

      console.log("incident details received: " + incidentDetails[0]);
      this.setState({ incidentData: incidentDetails[0] });
    }
    console.log("incident call done");
  }

  async componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("user selected incident details");
      const queryString = window.location.search;
      console.log("attributes: ", queryString);
      const urlParams = new URLSearchParams(queryString);
      const attributeValue = urlParams.get('id')
      console.log("attributeValue: ", attributeValue);
      await this.fetcIncidentData(attributeValue);
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(IncidentDetails);
