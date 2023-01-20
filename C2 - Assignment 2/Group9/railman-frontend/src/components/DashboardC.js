import React from 'react';
import { isUserLoggedIn, getUser, removeUserSession, getAppDomain } from './Common';
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
    this.handleOrderFood = this.handleOrderFood.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleOrderFood = (e) => {
    this.props.history.push('/Restaurants');
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

  addOrderMenuBox() {
    return (<div className="searchbox-container">
      <fieldset>
        <legend>Order Food</legend>
        <input type='submit' value='Restaurants' onClick={this.handleOrderFood} />
      </fieldset>
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

        {user.role === JSON.stringify("customer") ? this.addOrderMenuBox() : null}
        
        <div className='user-menu'>
          <input type="button" onClick={this.handleLogout} value="Logout" />
        </div>
      </div>
    );
  }

  fetchActiveOrdersData() {
    const user = getUser();

    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/orders?"
    var apiBaseUrl = getAppDomain() + "/orders?"
    if (user.role === JSON.stringify("customer")) {
      console.log("customer user");
      var customer_id = user.id;
      apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;
    }
    else if (user.role === JSON.stringify("restaurant_owner")) {
      console.log("restaurant_owner user");
      var restaurant_owner_id = user.id;
      apiBaseUrl = apiBaseUrl + "restaurant_owner_id=" + restaurant_owner_id;
    }
    else {
      console.log("incorrect user: " + user.role);
    }

    fetch(apiBaseUrl)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let allOrdersData = data
        .filter(order => order["Order Status"] === "Active")
        .map((order) => {
            return {
              "id": order["id"],
              "Restaurant Name": order["Restaurant Name"],
              "Station Name": order["Station Name"],
              "Ordered Date": order["Ordered Date"],
              "Time": order["Time"],
              "Order Status": order["Order Status"],
              "Order Total": order["Order Total"],
              "Payment Status": order["Payment Status"],
              "Delivered By": order["Delivered By"]
            }
        });
        this.setState({ tableData: allOrdersData });
        console.log(this.state.tableData);

      }).catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if(isUserLoggedIn()) {
      console.log("User is " + getUser().name);
      this.fetchActiveOrdersData();
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(DashboardC);