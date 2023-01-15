import React from 'react';
import { isUserLoggedIn, getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import './Orders.css';

class DashboardC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentbooking: this.props.location.state.detail,
      tableData: [ ]
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleClick = (e) => {
    this.props.history.push('/CreateService');
    console.log("hi in cre");
    e.preventDefault();
  }

  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push('/');
    e.preventDefault();
  }

  addOrdersTable() {
    return (
    <div className="Orders">
    <h2 className='orders-heading'>Active Orders</h2>
    <OrdersTable data={this.state.tableData} />
    </div>)
  }

  render() {
    const user = getUser();
    
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name} !</h3>
        </div>
        {(this.state.tableData.length > 0) ? this.addOrdersTable() : <h2 className='orders-heading'>No Active Orders!</h2>}
        <div className="search-container">
          <fieldset>
            <legend>Order Food</legend>
            <input type='submit' value='Menu' onClick={this.handleClick} />
          </fieldset>

        </div>
        <div className='user-menu'>
          <input type="button" onClick={this.handleLogout} value="Logout" />
        </div>
      </div>
    );
  }

  fetchdata() {
    const user = getUser();
    var apiBaseUrl = "http://localhost:8000/api/core/orders?"
    if (this.props.role === "Customer") {
      var customer_id = user.id;
      apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;
    }
    else if (this.props.role === "expert") {
      var expert_id = user.id;
      apiBaseUrl = apiBaseUrl + "expert_id=" + expert_id;
    }

    fetch(apiBaseUrl)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let ordersfromapi = data
        .filter(order => order["Order Status"] === "Active")
        .map((order) => {
            return {
              "Order ID": order["Order ID"],
              "Restaurent Name": order["Restaurent Name"],
              "Station Name": order["Station Name"],
              "Ordered Date": order["Ordered Date"],
              "Time": order["Time"],
              "Order Status": order["Order Status"],
              "Payment Status": order["Payment Status"],
              "Delivered By": order["Delivered By"]
            }
        });
        this.setState({ tableData: ordersfromapi });
        console.log(this.state.tableData);

      }).catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("User is " + getUser().name);
      this.fetchdata();
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(DashboardC);