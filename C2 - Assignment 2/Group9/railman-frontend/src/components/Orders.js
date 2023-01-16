import React from 'react';
import { isUserLoggedIn, getUser, removeUserSession } from './Common';
import { withRouter } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import './Orders.css';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentbooking: this.props.location.state.detail,
      tableData: []
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
    return (<div className="Orders">
      <h2 className='orders-heading'>All Orders</h2>
    <OrdersTable data={this.state.tableData} />
    </div>)
  }

  addOrderMenuBox() {
    return (<div className="search-container">
      <fieldset>
        <legend>Order Food</legend>
        <input type='submit' value='Menu' onClick={this.handleClick} />
      </fieldset>
    </div>)
  }

  render() {
    const user = getUser();
    if(!isUserLoggedIn()) {
      return (
        <div>
        <h1>Plese login to continue..</h1>
      </div>
      )
    }
        
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name} !</h3>
        </div>

        {(this.state.tableData.length > 0) ? this.addOrdersTable() : <h2 className='orders-heading'>No Orders!</h2>}
        
        {user.role === JSON.stringify("customer") ? this.addOrderMenuBox() : null}
        
        <div className='user-menu'>
          <input type="button" onClick={this.handleLogout} value="Logout" />
        </div>
      </div>
    );
  }

  fetchdata() {
    const user = getUser();

    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/orders?"
    var apiBaseUrl = "http://localhost:8000/orders?"
    if (user.role === JSON.stringify("customer")) {
      console.log("customer user");
      var customer_id = user.id;
      apiBaseUrl = apiBaseUrl + "customer_id=" + customer_id;
    }
    else if (user.role === JSON.stringify("restaurent_owner")) {
      console.log("restaurent_owner user");
      var restaurent_owner_id = user.id;
      apiBaseUrl = apiBaseUrl + "restaurent_owner_id=" + restaurent_owner_id;
    }
    else {
      console.log("incorrect user: " + user.role);
    }

    fetch(apiBaseUrl)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let ordersfromapi = data.map((order) => {
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

      // var orders = fetchUserOrders(this.props.role).then(this.setState({ tableData: orders }));
      // this.setState({ tableData: orders });
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Orders);