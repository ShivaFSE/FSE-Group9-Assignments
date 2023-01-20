import React from 'react';
import './AddMenuItem.css'
import { FormErrors } from './FormErrors';
import { getUser, getAppDomain } from './Common';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class AddMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      logo: '',
      price: '',
      timings: '',

      formErrors: { name: '', price: '', timings: '' },
      nameValid: false,
      priceValid: false,
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
    let priceValid = this.state.priceValid;
    let timingsValid = this.state.timingsValid;
    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? '' : ' is too short';
        break;
      case 'price':
        priceValid = value.length >= 1;
        fieldValidationErrors.price = priceValid ? '' : 'is too short';
        break;
      case 'timings':
        timingsValid = value.length >= 1;
        fieldValidationErrors.timings = timingsValid ? '' : 'is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: nameValid,
      priceValid: priceValid,
      timingsValid: timingsValid
    }, this.validateForm);
  }

  validateForm() {
    console.log("in validateForm");
    this.setState({ formValid: this.state.nameValid && this.state.priceValid && this.state.timingsValid });
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
    console.log("handleSubmit restaurant_id: " + this.props.location.state?.restaurant_id);
    var apiBaseUrl = getAppDomain() + "/api/core/menu";
    var self = this;
    const user = getUser();

    var payload = {
      "Name": this.state.name,
      "Logo": "",
      "Price": this.state.price,
      "Timings": this.state.timings,
      "restaurant_owner_id": user.id,
      "restaurant_id": this.props.location.state?.restaurant_id
    }
    
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Menu Item successfull added");
          console.log("Adding Menu Item successfull");
          self.props.history.push('/Restaurants');
        }
        else if (response.data.code === 204) {
          console.log("invalid menu item data");
          alert("invalid menu item data")
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
            <legend>Add a New Menu Item</legend>
            <div>
              <input
                type="text"
                placeholder="Enter your Menu Item name *"
                name="name"
                value={this.state.name}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Enter Price of Menu item *"
                name="price"
                value={this.state.price}
                onChange={this.handleUserInput}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Enter Timings of menu availability *"
                name="timings"
                value={this.state.timings}
                onChange={this.handleUserInput}
                required
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

export default withRouter(AddMenuItem);
