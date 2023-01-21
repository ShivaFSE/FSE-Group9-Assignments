import React from 'react';
import { withRouter } from 'react-router-dom';
import { isUserLoggedIn, getUser, setUserSession, getAppDomain } from './Common';
import './Login.css';
import { FormErrors } from './FormErrors';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      email: '',
      password: '',
      UserType: '',
      formErrors: { email: '', password: '', userType: ' choose user type' },
      emailValid: false,
      passwordValid: false,
      userTypeValid: false,
      formValid: false,
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  onValueChange = (e) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    fieldValidationErrors.userType = '';
    this.setState({
      UserType: e.target.value,
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      userTypeValid: true
    }, this.validateForm);
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let userTypeValid = this.state.userTypeValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid,
      userTypeValid: userTypeValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.userTypeValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  handleClick = (e) => {
    this.props.history.push('/registration');
    e.preventDefault();
  }
  handleSubmit = async (e) => {
    var apiBaseUrl = getAppDomain() + "/api/authentication/";
    var self = this;

    console.log("Login: " + this.state.email + ", " + this.state.password + ", " + this.state.UserType);

    // Revert back to post method when Backend is built
    // var payload = {
    //   "email": this.state.email,
    //   "password": this.state.password,
    //   "role": this.state.UserType
    // }
    // axios.post(apiBaseUrl + 'login', payload)
    let responseData = await axios.get(apiBaseUrl + 'registration?email=' + this.state.email + "&password=" + this.state.password + "&role=" + this.state.UserType)
    console.log("responseData Status : " + responseData.status);
    self.setState({ users: responseData.data });
    setUserSession(responseData.data[0].id, responseData.data[0].name, responseData.data[0].address, responseData.data[0].role);

    if (responseData.status === 200) {
      console.log("Login.successfull " + getUser().id + ", " + getUser().name + ", " + getUser().address);

      if (responseData.data[0].role === "customer") {
        self.props.history.push('/Dashboard');
      }
      else if (responseData.data[0].role === "restaurant_owner") {
        self.props.history.push('/Dashboard');
      }
    }
    else if (responseData.status === 204) {
      console.log("emailid and pwd  do not match");
      alert("emailid and pwd  do not match")
    }
    else {
      console.log("User does not exists");
      alert("User does not exist");
    }

    e.preventDefault();
  }

  render() {
    console.log("In Login.js " + getUser().id + ", " + getUser().name + ", " + getUser().address);
    if(isUserLoggedIn()) {
      return (<div className="dashboard-container">
        {this.props.history.push('/Dashboard')}
      </div>)
    }
    else {
      console.log("User is not logged in");
    }

    return (
      <div className="dashboard-container">
        <div className="login-menu">
          <form className="demoForm" onSubmit={this.handleSubmit}>
         
            <div >
              <input type="email" required name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput} />
            </div>

            <div >
              <input type="password" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput} />
            </div>

            <div >
              <input type="radio" value="customer" checked={this.state.UserType === "customer"}
                onChange={this.onValueChange} />
              <label htmlFor="Customer">Customer</label>
              <input type="radio" value="restaurant_owner" checked={this.state.UserType === "restaurant_owner"}
                onChange={this.onValueChange} />
              <label htmlFor="RestaurantOwner">Restaurant Owner</label>
            </div>

            <input type='submit' name='Login' value='Login' disabled={!this.state.formValid} />

            <div className='error-message' >
              <FormErrors formErrors={this.state.formErrors} />
            </div>

          </form>
          </div>

          <div className="register-menu">
            <form className="demoForm" onSubmit={this.handleClick}>
              <label htmlFor="Registration">New User? Register Now</label>
              <br/>
              <input type='submit' value='Register' />
            </form>
          </div>

      </div>
    )
  }

}

export default withRouter(Login);
