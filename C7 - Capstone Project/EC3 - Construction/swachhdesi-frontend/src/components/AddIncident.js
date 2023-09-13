import React from 'react';
import './AddIncident.css'
import { getUser, getAppDomain } from './Common';
import { FormErrors } from './FormErrors';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class AddIncident extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      problemImageUrl: '',
      type: '',
      address: '',
      description: '',
      directions: '',
      //createdDate: '',
      //noOfPeopleVolunteered: '',
      noOfPeopleNeeded: '',
      //status: '',
      completionTime: '',
      completionDate: '',
      //completionImageUrl: '',
      formErrors: { name: ' is too short', problemImageUrl: ' Upload an Image to explain the probelm', type: ' is too short', address: ' is too short', description: ' is too short', noOfPeopleNeeded: ' is not a number', completionTime: ' is not time', completionDate: ' is not a date' },
      nameValid: false,
      problemImageUrlValid: false,
      typeValid: false,
      addressValid: false,
      descriptionValid: false,
      noOfPeopleNeededValid: false,
      completionTimeValid: false,
      completionDateValid: false,
      formValid: false,
    }
  }
  handleChange = (e) => {
    console.log("in handleChange");
    this.setState({
      role: e.target.value
    })
  }

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
      case 'name':
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? '' : ' is too short';
        break;

      case 'problemImageUrl':
        problemImageUrlValid = value.length >= 1;
        fieldValidationErrors.problemImageUrl = problemImageUrlValid ? '' : ' is too short';
        break;

      case 'type':
        typeValid = value.length >= 1;
        fieldValidationErrors.type = typeValid ? '' : ' is too short';
        break;

      case 'address':
        addressValid = value.length >= 1;
        fieldValidationErrors.address = addressValid ? '' : ' is too short';
        break;

      case 'description':
        descriptionValid = value.length >= 1;
        fieldValidationErrors.description = descriptionValid ? '' : ' is too short';
        break;

      case 'noOfPeopleNeeded':
        noOfPeopleNeededValid = value.match(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2))?$/);
        fieldValidationErrors.noOfPeopleNeeded = noOfPeopleNeededValid ? '' : ' is not a number';
        break;

      case 'completionTime':
        completionTimeValid = value.length >= 1;
        fieldValidationErrors.completionTime = completionTimeValid ? '' : ' is not time';
        break;

      case 'completionDate':
        completionDateValid = value.length >= 1;
        fieldValidationErrors.completionDate = completionDateValid ? '' : 'is not a date';
        break;
        
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      problemImageUrlValid: problemImageUrlValid,
      typeValid: typeValid,
      addressValid: addressValid,
      descriptionValid: descriptionValid,
      noOfPeopleNeededValid: noOfPeopleNeededValid,
      completionTimeValid: completionTimeValid,
      completionDateValid: completionDateValid
    }, this.validateForm);
  }

  validateForm() {
    console.log("in validateForm");
    this.setState({ formValid: this.state.nameValid && this.state.problemImageUrlValid && this.state.typeValid && this.state.addressValid && this.state.descriptionValid && this.state.noOfPeopleNeededValid && this.state.completionTimeValid && this.state.completionDateValid });
  }

  errorClass(error) {
    console.log("in errorClass");
    return (error.length === 0 ? '' : 'has-error');
  }

  handleUserInput = (e) => {
    console.log("in handleUserInput");
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  handleSubmit = (e) => {
    console.log("handleSubmit creator id: " + getUser().id);
    var apiBaseUrl = getAppDomain() + "/api/core/incidents";
    var self = this;
    var date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
    var payload = {
      "name": this.state.name,
      "problemImageUrl": this.state.problemImageUrl,
      "type": this.state.type,
      "address": this.state.address,
      "description": this.state.description,
      "directions": this.state.directions,
      "numberOfPeopleNeeded": this.state.noOfPeopleNeeded,
      "completionTime": this.state.completionTime,
      "completionDate": this.state.completionDate,
      "volunteers": [],
      "status": "Active",
      "creationDate": dateString,
      "creatorId": getUser().id
    }
    
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Incident successfully added");
          console.log("Adding Incident successfully");
          self.props.history.push('/Dashboard');
        }
        else if (response.status === 204) {
          console.log("invalid Incident data");
          alert("invalid Incident data")
        }
        else {
          console.log("Unknown problem encountered");
          alert("Unknown problem encountered");
        }
      })
      .catch(function (error) {
        console.log("")
        console.log(error);
      });

    e.preventDefault();
  }

  render() {

    return (
      <div className="dashboard-container">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Add a New Incident</legend>
            <div>
            <select name="type"
                value={this.state.type}
                onChange={this.handleUserInput}>
              <option value="Street">Street</option>
              <option value="Open Area">Open Area</option>
              <option value="Broken Structure">Broken Structure</option>
              <option value="Teaching">Teaching</option>
              <option value="Weather Related">Weather Related</option>
              <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <input 
                type="text"
                placeholder="Provide a short name for your Incident *"
                name="name"
                value={this.state.name}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter your Incident description *"
                name="description"
                value={this.state.description}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Area name *"
                name="address"
                value={this.state.address}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter directions to this place"
                name="directions"
                value={this.state.directions}
                onChange={this.handleUserInput}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Upload an image of the problem"
                name="problemImageUrl"
                value={this.state.problemImageUrl}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter number of people needed to fix *"
                name="noOfPeopleNeeded"
                value={this.state.noOfPeopleNeeded}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <label>
                Gather Date:
                <input
                  type="date"
                  placeholder="Enter the time for the above date *"
                  name="completionDate"
                  value={this.state.completionDate}
                  onChange={this.handleUserInput}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Gather Time:
                <input
                  type="time"
                  placeholder="Enter target date to fix the problem *"
                  name="completionTime"
                  value={this.state.completionTime}
                  onChange={this.handleUserInput}
                  required
                />
              </label>
            </div>
            <input type='submit' value='Submit' disabled={!this.state.formValid} />

            <div className='error-message' >
              <FormErrors formErrors={this.state.formErrors} />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(AddIncident);
