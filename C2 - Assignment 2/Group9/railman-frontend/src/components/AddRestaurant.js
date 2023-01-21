import React from 'react';
import './AddRestaurant.css'
import { getAppDomain } from './Common';
import { FormErrors } from './FormErrors';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      logo: '',
      address: '',
      timings: '',
      description: '',

      formErrors: { name: ' is too short', address: ' is too short', timings: ' are too short' },
      nameValid: false,
      addressValid: false,
      timingsValid: false,
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
    let addressValid = this.state.addressValid;
    let timingsValid = this.state.timingsValid;
    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? '' : ' is too short';
        break;
      case 'address':
        addressValid = value.length >= 1;
        fieldValidationErrors.address = addressValid ? '' : ' is too short';
        break;
      case 'timings':
        timingsValid = value.length >= 1;
        fieldValidationErrors.timings = timingsValid ? '' : 'are too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      addressValid: addressValid,
      timingsValid: timingsValid
    }, this.validateForm);
  }

  validateForm() {
    console.log("in validateForm");
    this.setState({ formValid: this.state.nameValid && this.state.addressValid && this.state.timingsValid });
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
    console.log("handleSubmit restaurant_owner_id: " + this.props.location.state?.restaurant_owner_id);
    var apiBaseUrl = getAppDomain() + "/api/core/restaurants";
    var self = this;
    var payload = {
      "Name": this.state.name,
      "Logo": "",
      "Address": this.state.address,
      "Timings": this.state.timings,
      "Description": this.state.description,
      "restaurant_owner_id": this.props.location.state?.restaurant_owner_id,
    }
    
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Restaurant successfull added");
          console.log("Adding Restaurant successfull");
          self.props.history.push('/Restaurants');
        }
        else if (response.status === 204) {
          console.log("invalid restaurant data");
          alert("invalid restaurant data")
        }
        else {
          console.log("User exists");
          alert("User exist");
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
            <legend>Add a New Restaurant</legend>
            <div>
              <input
                type="text"
                placeholder="Enter your restaurant name *"
                name="name"
                value={this.state.name}
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
                placeholder="Enter Timings of restaurant *"
                name="timings"
                value={this.state.timings}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter description in one line"
                name="description"
                value={this.state.description}
                onChange={this.handleUserInput}
              />
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

export default withRouter(AddRestaurant);
