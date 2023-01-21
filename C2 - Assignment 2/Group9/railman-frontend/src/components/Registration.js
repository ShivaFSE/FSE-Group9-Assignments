import React from 'react';
import './Registration.css'
import { getAppDomain } from './Common';
import { FormErrors } from './FormErrors';
import axios from 'axios';
class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      reenter_password: '',
      address: '',
      city: '',
      pincode: '',
      phone: '',
      role: 'customer',
      skills: [],

      formErrors: { email: '', password: '', phonevalid: '' },
      emailValid: false,
      passwordValid: false,
      phonevalid: false,
      formValid: false,
    }
  }
  handleChange = (e) => {
    this.setState({
      role: e.target.value
    })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let phonevalid = this.state.phonevalid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        console.log("password: ", value, ", reenter: ", this.state.reenter_password);
        if(value.length < 6) {
          passwordValid = false
          fieldValidationErrors.password = ' is too short';
        }
        else if(this.state.reenter_password !== value) {
          passwordValid = false
          fieldValidationErrors.password = ' passwords do not match';
        }
        else {
          fieldValidationErrors.password = '';
          passwordValid = true
        }
        break;
      case 'reenter_password':
        console.log("password: ", this.state.password, ", reenter: ", value);
        if(value.length < 6) {
          passwordValid = false
          fieldValidationErrors.password = ' is too short';
        }
        else if(this.state.password !== value) {
          passwordValid = false
          fieldValidationErrors.password = ' passwords do not match';
        }
        else {
          fieldValidationErrors.password = '';
          passwordValid = true
        }
        break;
      case 'phone':
        phonevalid = value.match(/^[0-9]{10}$/i);
        fieldValidationErrors.phone = phonevalid ? '' : 'is not valid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      phonevalid: phonevalid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.phonevalid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  handleSubmit = async (e) => {
    console.log("in handleSubmit");
    var apiBaseUrl = getAppDomain() + "/api/authentication/";
    var self = this;
    var payload = {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password,
      "phone": this.state.phone,
      "address": this.state.address,
      "city": this.state.city,
      "role": this.state.role,
      "pincode": this.state.pincode,
    }

    console.log("user role: " + this.state.role);

    let responseData = await axios.post(apiBaseUrl + 'registration', payload)
    console.log("responseData Status: ", responseData.status);
    if (responseData.status === 201) {
      alert("Registration successfull.Login Again");
      console.log("Registration successfull");
      self.props.history.push('/');
    }
    else if (responseData.status === 204) {
      console.log("invalid data");
      alert("invalid data")
    }
    else {
      console.log("User  exists");
      alert("User  exist");
    }

    e.preventDefault();
  }

  render() {

    if (this.state.role === "customer") {
      return (
        <div className="dashboard-container">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Signup Form</legend>
              <div >
                <input type="radio" value="customer"
                  checked={this.state.role === "customer"}
                  onChange={this.handleChange} />
                <label htmlFor="Customer">Customer</label>
                <input type="radio" value="restaurant_owner" checked={this.state.role === "restaurant_owner"}
                  onChange={this.handleChange} />
                <label htmlFor="RestaurantOwner">Restaurant Owner</label>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter your name *"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter email *"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Enter Password *"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Re-enter Password *"
                  name="reenter_password"
                  value={this.state.reenter_password}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleUserInput}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter City *"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter Pincode *"
                  name="pincode"
                  value={this.state.pincode}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Enter Phonenumber *"
                name="phone"
                value={this.state.phone}
                onChange={this.handleUserInput}
                required
              />

              <input type='submit' value='Submit' disabled={!this.state.formValid} />

              <div className='error-message' >
                <FormErrors formErrors={this.state.formErrors} />
              </div>
            </fieldset>
          </form>
        </div>
      );
    }
    else if (this.state.role === 'restaurant_owner') {
      return (
        <div className="dashboard-container">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Signup Form</legend>

              <div >
                <input type="radio" value="customer"
                  checked={this.state.role === "customer"}
                  onChange={this.handleChange} />
                <label htmlFor="Customer">Customer</label>
                <input type="radio" value="restaurant_owner" checked={this.state.role === "restaurant_owner"}
                  onChange={this.handleChange} />
                <label htmlFor="RestaurantOwner">Restaurant Owner</label>
              </div>


              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleUserInput}
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter email "
                  name="email"
                  value={this.state.email}
                  onChange={this.handleUserInput}
                  required
                />
              </div>
              <div>

                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleUserInput}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleUserInput}

                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleUserInput}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={this.state.pincode}
                  onChange={this.handleUserInput}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Phonenumber"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleUserInput}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleUserInput}
                />
              </div>

              <div>
                <input type='submit' value='Submit' disabled={!this.state.formValid} />
              </div>
              <div className='error-message' >
                <FormErrors formErrors={this.state.formErrors} />
              </div>
            </fieldset>
          </form>
        </div>
      );
    }
  }
}


export default Registration;
