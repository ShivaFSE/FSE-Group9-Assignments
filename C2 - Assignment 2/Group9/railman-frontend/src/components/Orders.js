import React from 'react';
import { isUserLoggedIn, getUser } from './Common';
import { withRouter } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import './Orders.css';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    }
    this.handleOrderFood = this.handleOrderFood.bind(this);
    this.handleCart = this.handleCart.bind(this);
  }

  handleOrderFood = (e) => {
    this.props.history.push('/Restaurants');
    e.preventDefault();
  }

  handleCart = (e) => {
    this.props.history.push('/UnderDevelopment');
    e.preventDefault();
  }

  addOrdersTable() {
    return (<div className="Orders">
      <h2 className='orders-heading'>All Orders</h2>
      <OrdersTable data={this.state.tableData} />
    </div>)
  }

  addOrderFoodBox() {
    return (<div className="searchbox-container">
      <fieldset>
        <legend>Order Food</legend>
        <input type='submit' value='Restaurants' onClick={this.handleOrderFood} />
        <input type='submit' value='Cart' onClick={this.handleCart} />
      </fieldset>
    </div>)
  }

  render() {
    const user = getUser();
    if(!isUserLoggedIn()) {
      return (
        <div className="dashboard-container">
        <h1>Plese login to continue..</h1>
      </div>
      )
    }
        
    return (
      <div className="dashboard-container">
        <div className="Greeting">
          <h3>Welcome {user.name} !</h3>
        </div>

        {user.role === JSON.stringify("customer") ? this.addOrderFoodBox() : null}

        {(this.state.tableData.length > 0) ? this.addOrdersTable() : <h2 className='orders-heading'>No Orders!</h2>}
        
      </div>
    );
  }

  fetchOrdersData() {
    const user = getUser();

    // Revert back to correct api method when Backend is built
    //var apiBaseUrl = "http://localhost:8000/api/core/orders"
    var apiBaseUrl = "http://localhost:8000/orders?"
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
        let allOrdersData = data.map((order) => {
          return {
            "Order ID": order["Order ID"],
            "Restaurant Name": order["Restaurant Name"],
            "Station Name": order["Station Name"],
            "Ordered Date": order["Ordered Date"],
            "Time": order["Time"],
            "Order Status": order["Order Status"],
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
      this.fetchOrdersData();

      // var orders = fetchUserOrders(this.props.role).then(this.setState({ tableData: orders }));
      // this.setState({ tableData: orders });
    }
    else {
      console.log("User is not logged in");
    }
  }
}

export default withRouter(Orders);